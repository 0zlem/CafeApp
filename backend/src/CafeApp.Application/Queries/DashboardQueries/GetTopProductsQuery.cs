using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.DashboardQueries
{
    public sealed record GetTopProductsQuery(int Top = 5) : IRequest<Result<List<TopProductDto>>>;

    public sealed record TopProductDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = default!;
        public int QuantitySold { get; set; }
    }

    internal sealed class GetTopProductsQueryHandler(IOrderRepository orderRepository, IProductRepository productRepository)
        : IRequestHandler<GetTopProductsQuery, Result<List<TopProductDto>>>
    {
        public async Task<Result<List<TopProductDto>>> Handle(GetTopProductsQuery request, CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetAll()
                .Include(o => o.OrderItems)
                .ToListAsync(cancellationToken);

            var topProductsGroup = orders
                .SelectMany(o => o.OrderItems)
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    QuantitySold = g.Sum(oi => oi.Quantity)
                })
                .OrderByDescending(p => p.QuantitySold)
                .Take(request.Top)
                .ToList();

            var productIds = topProductsGroup.Select(p => p.ProductId).ToList();
            var products = await productRepository.GetAll()
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync(cancellationToken);

            var result = topProductsGroup.Select(p => new TopProductDto
            {
                ProductId = p.ProductId,
                ProductName = products.FirstOrDefault(prod => prod.Id == p.ProductId)?.Name ?? "Unknown",
                QuantitySold = p.QuantitySold
            }).ToList();

            return Result<List<TopProductDto>>.Succeed(result);
        }
    }
}
