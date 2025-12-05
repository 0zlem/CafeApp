using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.Application.Queries.OrderQueries
{
    public sealed record GetOrderByIdQuery(Guid Id) : IRequest<Result<Order>>;

    internal sealed class GetOrderByIdQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetOrderByIdQuery, Result<Order>>
    {
        public async Task<Result<Order>> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var order = await orderRepository.FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);

            if (order is null)
                return Result<Order>.Failure("Sipariş bulunamadı.");

            return Result<Order>.Succeed(order);
        }
    }
}