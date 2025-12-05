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
    public sealed record UpdateTableCommand(Guid Id, string Name) : IRequest<Result<string>>;

    internal sealed class UpdateTableCommandHandler(ITableRepository tableRepository, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : IRequestHandler<UpdateTableCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(UpdateTableCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var table = await tableRepository
                .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

            if (table is null)
                return Result<string>.Failure("Masa bulunamadı!");

            bool nameExists = await tableRepository
                .AnyAsync(t => t.Name == request.Name && t.Id != request.Id, cancellationToken);

            if (nameExists)
                return Result<string>.Failure("Bu isimde başka bir masa zaten var!");

            table.Name = request.Name;
            table.UpdatedAt = DateTimeOffset.UtcNow;

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Masa adı güncellendi.");
        }
    }

}