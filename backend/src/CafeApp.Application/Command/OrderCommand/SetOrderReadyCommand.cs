using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Dtos;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Command.OrderCommand
{
    public sealed record SetOrderReadyCommand(Guid Id) : IRequest<Result<ActiveOrderDetailsDto>>;

    internal sealed class SetOrderReadyCommandHandler(IOrderRepository orderRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<SetOrderReadyCommand, Result<ActiveOrderDetailsDto>>
    {
        public async Task<Result<ActiveOrderDetailsDto>> Handle(SetOrderReadyCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Mutfak.ToString())
                return Result<ActiveOrderDetailsDto>.Failure("Bu işlem için yetkiye sahip olmalısınız!");

            var order = await orderRepository
            .AsQueryable()
            .Include(o => o.Table)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);


            if (order is null)
            {
                return Result<ActiveOrderDetailsDto>.Failure("Sipariş bulunamadı!!");
            }

            if (order.Status != OrderStatus.Preparing)
            {
                return Result<ActiveOrderDetailsDto>.Failure("Sipariş hazırlanmadı!!");
            }

            order.Status = OrderStatus.Ready;
            order.UpdatedAt = DateTimeOffset.UtcNow;

            orderRepository.Update(order);


            await unitOfWork.SaveChangesAsync(cancellationToken);

            var orderUpdate = new ActiveOrderDetailsDto
            {
                Id = order.Id,
                Status = (int)order.Status,
                TableName = order.Table!.Name,
                TotalAmount = order.TotalAmount,
                Items = order.OrderItems.Select(i => new ActiveOrderItemDetailsDto
                {
                    ProductName = i.Product!.Name,
                    Quantity = i.Quantity,
                    Price = i.PriceAtOrder
                }).ToList()
            };

            return Result<ActiveOrderDetailsDto>.Succeed(orderUpdate);
        }
    }

}