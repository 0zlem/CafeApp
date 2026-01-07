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
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Command.OrderCommand
{
    public sealed record SetOrderPaidCommand(
    Guid Id,
    PaymentType PaymentType
) : IRequest<Result<string>>;


    internal sealed class SetOrderPaidCommandHandler(IHttpContextAccessor httpContextAccessor, IOrderRepository orderRepository, ITableRepository tableRepository, IUnitOfWork unitOfWork) : IRequestHandler<SetOrderPaidCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(SetOrderPaidCommand request, CancellationToken cancellationToken)
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

            if (order.Status != OrderStatus.Served)
            {
                return Result<string>.Failure("Sipariş servis edilmemiş!!");
            }

            order.Status = OrderStatus.Paid;
            order.PaymentType = request.PaymentType;
            order.UpdatedAt = DateTimeOffset.UtcNow;

            var table = await tableRepository
            .FirstOrDefaultAsync(t => t.Id == order.TableId, cancellationToken);

            if (table is null)
                return Result<string>.Failure("Masa bulunamadı!");

            var orders = await orderRepository
                               .Where(o => o.TableId == table.Id && o.Status == OrderStatus.Served).Include(o => o.OrderItems)
                               .ToListAsync(cancellationToken);

            if (!orders.Any())
                return Result<string>.Failure("Bu masada ödenecek sipariş yok!");

            foreach (var o in orders)
            {
                o.Status = OrderStatus.Paid;
                order.PaymentType = request.PaymentType;
                o.UpdatedAt = DateTimeOffset.UtcNow;
            }

            table.IsActive = false;
            table.UpdatedAt = DateTimeOffset.UtcNow;

            orderRepository.Update(order);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Sipariş ödendi ve masa kapatıldı.");
        }
    }
}