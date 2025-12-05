using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

namespace CafeApp.Application.Command.TableCommand
{
    public sealed record CreateTableCommand(string Name) : IRequest<Result<string>>;

    internal sealed class CreateTableCommandHandler(ITableRepository tableRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<CreateTableCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(CreateTableCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            string qrCode = $"QR-{Guid.NewGuid():N}";

            var tableName = await tableRepository.AnyAsync(t => t.Name == request.Name, cancellationToken);

            if (tableName)
            {
                return Result<string>.Failure("Bu isimde masa mevcuttur!!");
            }

            Table table = new()
            {
                Name = request.Name,
                CodeQR = qrCode,
                IsActive = false,
                CreatedAt = DateTimeOffset.UtcNow,
                UpdatedAt = DateTimeOffset.UtcNow,
            };

            await tableRepository.AddAsync(table);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Masa başarıyla oluşturuldu.");

        }
    }
}