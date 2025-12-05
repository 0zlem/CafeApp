using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.CategoryQueries
{
    public sealed class GetAllCategoryQuery() : IRequest<Result<List<Category>>>;

    internal sealed class GetAllCategoryQueryHandler(ICategoryRepository categoryRepository) : IRequestHandler<GetAllCategoryQuery, Result<List<Category>>>
    {
        public async Task<Result<List<Category>>> Handle(GetAllCategoryQuery request, CancellationToken cancellationToken)
        {
            var categories = await categoryRepository.GetAll().ToListAsync(cancellationToken);

            return Result<List<Category>>.Succeed(categories);
        }
    }
}