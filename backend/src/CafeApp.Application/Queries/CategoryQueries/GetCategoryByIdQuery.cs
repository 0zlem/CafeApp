using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.Application.Queries.CategoryQueries
{
    public sealed record GetCategoryByIdQuery(Guid Id) : IRequest<Result<Category>>;

    internal sealed class GetCategoryByIdQueryHandler(ICategoryRepository categoryRepository) : IRequestHandler<GetCategoryByIdQuery, Result<Category>>
    {
        public async Task<Result<Category>> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await categoryRepository.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (category is null)
            {
                return Result<Category>.Failure("Kategori bulunamadı!!");
            }

            return Result<Category>.Succeed(category);
        }
    }


}