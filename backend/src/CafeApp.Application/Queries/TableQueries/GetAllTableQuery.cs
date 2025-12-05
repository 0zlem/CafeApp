using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.TableQueries
{
    public sealed record GetAllTableQuery() : IRequest<Result<List<Table>>>;

    internal sealed class GetAllTableQueryHandler(ITableRepository tableRepository) : IRequestHandler<GetAllTableQuery, Result<List<Table>>>
    {
        public async Task<Result<List<Table>>> Handle(GetAllTableQuery request, CancellationToken cancellationToken)
        {
            var tables = await tableRepository.GetAll().ToListAsync(cancellationToken);

            return Result<List<Table>>.Succeed(tables);
        }
    }
}