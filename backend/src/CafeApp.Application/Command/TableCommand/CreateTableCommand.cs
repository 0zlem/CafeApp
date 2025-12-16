using System.Security.Claims;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

public sealed record CreateTableCommand(string Name) : IRequest<Result<string>>;

internal sealed class CreateTableCommandHandler(
    ITableRepository tableRepository,
    IHttpContextAccessor httpContextAccessor,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateTableCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateTableCommand request, CancellationToken cancellationToken)
    {
        var httpContext = httpContextAccessor.HttpContext;
        var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);

        if (userRole != UserRole.Admin.ToString())
            return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

        bool tableNameExists = await tableRepository.AnyAsync(
            t => t.Name == request.Name,
            cancellationToken
        );

        if (tableNameExists)
            return Result<string>.Failure("Bu isimde masa mevcuttur!!");

        var table = new Table
        {
            Name = request.Name,
            IsActive = false,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        await tableRepository.AddAsync(table);

        table.CodeQR = $"http://localhost:3000/scan?tableId={table.Id}";

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<string>.Succeed("Masa başarıyla oluşturuldu.");
    }
}