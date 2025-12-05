using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

namespace CafeApp.Application.Command.TableCommand
{
    public sealed record SetTableActiveCommand(Guid TableId)
        : IRequest<Result<string>>;

    internal sealed class SetTableActiveCommandHandler(ITableRepository tableRepository, IUnitOfWork unitOfWork)
        : IRequestHandler<SetTableActiveCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(SetTableActiveCommand request, CancellationToken cancellationToken)
        {
            var table = await tableRepository.FirstOrDefaultAsync(t => t.Id == request.TableId, cancellationToken);

            if (table is null)
            {
                return Result<string>.Failure("Masa bulunamadı!!");
            }

            if (table.IsActive)
                return Result<string>.Failure("Bu masa şu anda kullanımda. Lütfen birazdan tekrar deneyin.");

            table.IsActive = true;
            table.UpdatedAt = DateTimeOffset.UtcNow;

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Masa aktifleştirildi.");
        }
    }
}