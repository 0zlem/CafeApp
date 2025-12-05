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
    public sealed record CreateOrderCommand(string TableCode, List<OrderItemDto> Items) : IRequest<Result<string>>;

    internal sealed class CreateOrderCommandHandler(IOrderRepository orderRepository, IProductRepository productRepository, ITableRepository tableRepository, IUnitOfWork unitOfWork) : IRequestHandler<CreateOrderCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var table = await tableRepository.FirstOrDefaultAsync(t => t.CodeQR == request.TableCode, cancellationToken);

            if (table is null)
            {
                return Result<string>.Failure("Masa bulunamadı!!");
            }

            if (!table.IsActive)
            {
                return Result<string>.Failure("Bu masa kullanıma kapalı!!");
            }

            var productId = request.Items.Select(p => p.ProductId).ToList();

            var products = await productRepository
               .Where(p => productId.Contains(p.Id))
               .ToListAsync(cancellationToken);

            if (products.Count != productId.Count)
            {
                return Result<string>.Failure("Bazı ürünler bulunamadı!");
            }

            Order order = new()
            {
                TableId = table.Id,
                Status = OrderStatus.Created,
                CreatedAt = DateTimeOffset.UtcNow,
                OrderItems = new List<OrderItem>()
            };

            decimal totalAmount = 0;

            foreach (var item in request.Items)
            {
                var product = products.First(p => p.Id == item.ProductId);

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    PriceAtOrder = product.Price
                };

                totalAmount += product.Price * item.Quantity;

                order.OrderItems.Add(orderItem);
            }

            order.TotalAmount = totalAmount;

            await orderRepository.AddAsync(order);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Sipariş başarıyla oluşturuldu.");
        }
    }
}