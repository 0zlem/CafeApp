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
    public sealed record SetOrderPreparingCommand(Guid Id) : IRequest<Result<string>>;

    internal sealed class SetOrderPreparingCommandHandler(IOrderRepository orderRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<SetOrderPreparingCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(SetOrderPreparingCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Mutfak.ToString())
                return Result<string>.Failure("Bu işlem için yetkiye sahip olmalısınız!");
            var order = await orderRepository.FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);

            if (order is null)
            {
                return Result<string>.Failure("Sipariş bulunamadı!!");
            }

            if (order.Status != OrderStatus.Created)
            {
                return Result<string>.Failure("Sipariş oluşturulmamış!!");
            }

            order.Status = OrderStatus.Preparing;
            order.UpdatedAt = DateTimeOffset.UtcNow;

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Sipariş hazırlanıyor...");
        }
    }

}