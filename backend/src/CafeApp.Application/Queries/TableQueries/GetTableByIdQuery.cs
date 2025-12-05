using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.Application.Queries.TableQueries
{
    public sealed record GetTableByIdQuery(Guid Id) : IRequest<Result<Table>>;

    internal sealed class GetTableByIdQueryHandler(ITableRepository tableRepository) : IRequestHandler<GetTableByIdQuery, Result<Table>>
    {
        public async Task<Result<Table>> Handle(GetTableByIdQuery request, CancellationToken cancellationToken)
        {
            var table = await tableRepository.FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

            if (table is null)
            {
                return Result<Table>.Failure("Masa bulunamadı!!");
            }

            return Result<Table>.Succeed(table);
        }
    }
}