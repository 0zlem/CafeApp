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
    public sealed record GetActiveOrdersByTableQuery(Guid TableId) : IRequest<Result<List<Order>>>;

    internal sealed class GetActiveOrdersByTableQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetActiveOrdersByTableQuery, Result<List<Order>>>
    {
        public async Task<Result<List<Order>>> Handle(GetActiveOrdersByTableQuery request, CancellationToken cancellationToken)
        {
            var orders = await orderRepository
                .Where(o => o.TableId == request.TableId && o.Status != OrderStatus.Paid && o.Status != OrderStatus.Cancelled)
                .Include(o => o.OrderItems)
                .ToListAsync(cancellationToken);

            if (orders == null || !orders.Any())
                return Result<List<Order>>.Failure("Aktif sipariş bulunamadı.");

            return Result<List<Order>>.Succeed(orders);
        }
    }
}