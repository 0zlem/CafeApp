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

namespace CafeApp.Application.Command.OrderCommand
{
    public sealed record SetOrderServedCommand(Guid Id) : IRequest<Result<string>>;

    internal sealed class SetOrderServedCommandHandler(IOrderRepository orderRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<SetOrderServedCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(SetOrderServedCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Garson.ToString())
                return Result<string>.Failure("Bu işlem için yetkiye sahip olmalısınız!");

            var order = await orderRepository.FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);

            if (order is null)
            {
                return Result<string>.Failure("Sipariş bulunamadı!!");
            }

            if (order.Status != OrderStatus.Ready)
            {
                return Result<string>.Failure("Sipariş hazır değil!!");
            }

            order.Status = OrderStatus.Served;
            order.UpdatedAt = DateTimeOffset.UtcNow;

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Sipariş servis edildi...");
        }
    }
}