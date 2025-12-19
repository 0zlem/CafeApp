using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.DashboardQueries
{
    public sealed record GetSalesOverviewQuery(DateTimeOffset From, DateTimeOffset To) : IRequest<Result<List<SalesOverviewDto>>>;

    public sealed record SalesOverviewDto
    {
        public DateTimeOffset Date { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    internal sealed class GetSalesOverviewQueryHandler(IOrderRepository orderRepository)
        : IRequestHandler<GetSalesOverviewQuery, Result<List<SalesOverviewDto>>>
    {
        public async Task<Result<List<SalesOverviewDto>>> Handle(GetSalesOverviewQuery request, CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetAll()
                .Where(o => o.CreatedAt >= request.From && o.CreatedAt <= request.To)
                .Include(o => o.OrderItems)
                .ToListAsync(cancellationToken);

            var grouped = orders
                .GroupBy(o => o.CreatedAt.Date)
                .Select(g => new SalesOverviewDto
                {
                    Date = g.Key,
                    TotalOrders = g.Count(),
                    TotalRevenue = g.Sum(o => o.TotalAmount)
                })
                .OrderBy(d => d.Date)
                .ToList();

            return Result<List<SalesOverviewDto>>.Succeed(grouped);
        }
    }
}
