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
    public sealed record DeleteTableCommand(Guid Id) : IRequest<Result<string>>;

    internal sealed class DeleteTableCommandHandler(ITableRepository tableRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<DeleteTableCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(DeleteTableCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var table = await tableRepository.FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

            if (table is null)
            {
                return Result<string>.Failure("Masa bulunamadı!!");
            }

            tableRepository.Delete(table);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Masa başarıyla silindi.");
        }
    }
}