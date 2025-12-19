using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.OrderQueries
{


    public sealed record GetActiveOrdersByTableQuery(Guid TableId) : IRequest<Result<ActiveOrderDto>>;
    public sealed class ActiveOrderItemDto
    {
        public string? ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public sealed class ActiveOrderDto
    {
        public Guid Id { get; set; }
        public int Status { get; set; }
        public decimal TotalAmount { get; set; }
        public List<ActiveOrderItemDto> Items { get; set; } = new();
    }

    internal sealed class GetActiveOrdersByTableQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetActiveOrdersByTableQuery, Result<ActiveOrderDto>>
    {
        public async Task<Result<ActiveOrderDto>> Handle(GetActiveOrdersByTableQuery request, CancellationToken cancellationToken)
        {
            var order = await orderRepository
            .Where(o =>
            o.TableId == request.TableId &&
            o.Status != OrderStatus.Cancelled)
            .Select(o => new ActiveOrderDto
            {
                Id = o.Id,
                Status = (int)o.Status,
                TotalAmount = o.TotalAmount,
                Items = o.OrderItems.Select(i => new ActiveOrderItemDto
                {
                    ProductName = i.Product!.Name,
                    Quantity = i.Quantity,
                    Price = i.PriceAtOrder
                }).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);


            if (order is null)
                return Result<ActiveOrderDto>.Failure("Aktif sipariş bulunamadı.");

            return Result<ActiveOrderDto>.Succeed(order);
        }
    }
}