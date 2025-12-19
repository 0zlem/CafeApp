using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Dtos;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using GenericRepository;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Command.OrderCommand
{
    public sealed record CreateOrderCommand(string TableId, List<OrderItemDto> Items) : IRequest<Result<string>>;

    internal sealed class CreateOrderCommandHandler(IOrderRepository orderRepository, IProductRepository productRepository, ITableRepository tableRepository, IUnitOfWork unitOfWork) : IRequestHandler<CreateOrderCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(request.TableId, out var tableIdGuid))
            {
                return Result<string>.Failure("Geçersiz masa kimliği!!");
            }

            var table = await tableRepository.FirstOrDefaultAsync(t => t.Id == tableIdGuid, cancellationToken);


            if (table is null)
            {
                return Result<string>.Failure("Masa bulunamadı!!");
            }

            if (!table.IsActive)
            {
                table.IsActive = true;
                table.UpdatedAt = DateTimeOffset.UtcNow;
            }

            var order = await orderRepository
            .Where(o =>
            o.TableId == table.Id &&
            o.Status != OrderStatus.Paid &&
            o.Status != OrderStatus.Cancelled)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(cancellationToken);

            if (order is null)
            {
                order = new Order
                {
                    TableId = table.Id,
                    Status = OrderStatus.Created,
                    CreatedAt = DateTimeOffset.UtcNow,
                    OrderItems = new List<OrderItem>()
                };

                await orderRepository.AddAsync(order);
            }

            var productId = request.Items.Select(p => p.ProductId).ToList();

            var products = await productRepository
               .Where(p => productId.Contains(p.Id))
               .ToListAsync(cancellationToken);

            if (products.Count != productId.Count)
            {
                return Result<string>.Failure("Bazı ürünler bulunamadı!");
            }

            foreach (var item in request.Items)
            {
                var existingItem = order.OrderItems
             .FirstOrDefault(i => i.ProductId == item.ProductId);

                if (existingItem is not null)
                {
                    existingItem.Quantity += item.Quantity;
                }
                else
                {
                    var product = products.First(p => p.Id == item.ProductId);

                    order.OrderItems.Add(new OrderItem
                    {
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        PriceAtOrder = product.Price
                    });
                }
            }

            order.TotalAmount = order.OrderItems
           .Sum(i => i.PriceAtOrder * i.Quantity);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Sipariş başarıyla oluşturuldu.");
        }
    }
}