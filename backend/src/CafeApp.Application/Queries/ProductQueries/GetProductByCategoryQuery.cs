using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using GenericRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.ProductQueries
{
    public sealed record ProductDto(
        Guid Id,
        string Name,
        string? Description,
        decimal Price,
        int Stock,
        Guid CategoryId,
        string? CategoryName,
        string? ImageUrl,
        bool IsAvailable
    );

    public sealed record GetProductByCategoryQuery(Guid CategoryId)
        : IRequest<Result<List<ProductDto>>>;

    internal sealed class GetProductByCategoryQueryHandler
        (IProductRepository productRepository)
        : IRequestHandler<GetProductByCategoryQuery, Result<List<ProductDto>>>
    {
        public async Task<Result<List<ProductDto>>> Handle(
            GetProductByCategoryQuery request,
            CancellationToken cancellationToken)
        {
            var products = await productRepository
                .Where(p => p.CategoryId == request.CategoryId)
                .Select(p => new ProductDto(
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.Stock,
                    p.CategoryId,
                    p.Category!.Name,
                    p.ImageUrl,
                    p.IsAvailable
                ))
                .ToListAsync(cancellationToken);

            return Result<List<ProductDto>>.Succeed(products);
        }
    }
}
