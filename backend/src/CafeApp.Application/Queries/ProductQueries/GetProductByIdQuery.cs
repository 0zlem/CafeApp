using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.Application.Queries.ProductQueries
{
    public sealed record GetProductByIdQuery(Guid Id) : IRequest<Result<Product>>;

    internal sealed class GetProductByIdQueryHandler(IProductRepository productRepository) : IRequestHandler<GetProductByIdQuery, Result<Product>>
    {
        public async Task<Result<Product>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await productRepository.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (product is null)
            {
                return Result<Product>.Failure("Ürün bulunamadı!!");
            }

            return Result<Product>.Succeed(product);
        }
    }
}
