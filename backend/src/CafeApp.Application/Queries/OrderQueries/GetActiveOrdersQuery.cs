using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Dtos;
using CafeApp.Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.OrderQueries
{

    public sealed record GetActiveOrdersQuery() : IRequest<Result<List<ActiveOrderDetailsDto>>>;


    internal sealed class GetActiveOrdersQueryHandler(IOrderRepository orderRepository)
      : IRequestHandler<GetActiveOrdersQuery, Result<List<ActiveOrderDetailsDto>>>
    {
        public async Task<Result<List<ActiveOrderDetailsDto>>> Handle(GetActiveOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await orderRepository
                .GetAll()
                .AsNoTracking()
                .Include(o => o.Table)
                .Where(o => o.Status < OrderStatus.Paid)
                .Select(o => new ActiveOrderDetailsDto
                {
                    Id = o.Id,
                    Status = (int)o.Status,
                    TotalAmount = o.TotalAmount,
                    TableName = o.Table!.Name,
                    Items = o.OrderItems.Select(i => new ActiveOrderItemDetailsDto
                    {
                        ProductName = i.Product!.Name,
                        Quantity = i.Quantity,
                        Price = i.PriceAtOrder
                    }).ToList()
                })
                .ToListAsync(cancellationToken);


            return Result<List<ActiveOrderDetailsDto>>.Succeed(orders);
        }
    }
}