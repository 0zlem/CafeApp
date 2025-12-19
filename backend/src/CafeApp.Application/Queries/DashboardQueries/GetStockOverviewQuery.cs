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
    public sealed record GetStockOverviewQuery(int LowStockThreshold = 5) : IRequest<Result<List<StockOverviewDto>>>;

    public sealed record StockOverviewDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = default!;
        public int Stock { get; set; }
        public bool IsLowStock { get; set; }
    }

    internal sealed class GetStockOverviewQueryHandler(IProductRepository productRepository)
        : IRequestHandler<GetStockOverviewQuery, Result<List<StockOverviewDto>>>
    {
        public async Task<Result<List<StockOverviewDto>>> Handle(GetStockOverviewQuery request, CancellationToken cancellationToken)
        {
            var products = await productRepository.GetAll().ToListAsync(cancellationToken);

            var response = products.Select(p => new StockOverviewDto
            {
                ProductId = p.Id,
                ProductName = p.Name,
                Stock = p.Stock,
                IsLowStock = p.Stock <= request.LowStockThreshold
            }).OrderBy(p => p.Stock).ToList();

            return Result<List<StockOverviewDto>>.Succeed(response);
        }
    }
}
