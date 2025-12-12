using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using MediatR;
using TS.Result;

namespace CafeApp.Application.Queries.AuthQueries
{
    public sealed record MeQuery(ClaimsPrincipal User) : IRequest<Result<MeQueryResponse>>;

    public sealed record MeQueryResponse
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = default!;
        public string Role { get; set; } = default!;
    }

    internal sealed class MeQueryHandler(IUserRepository userRepository)
      : IRequestHandler<MeQuery, Result<MeQueryResponse>>
    {
        public async Task<Result<MeQueryResponse>> Handle(MeQuery request, CancellationToken cancellationToken)
        {
            var userId = request.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userId, out var guidUserId))
                return Result<MeQueryResponse>.Failure("Token geçersiz!");


            var user = await userRepository.FirstOrDefaultAsync(u => u.Id == guidUserId, cancellationToken);

            if (user is null)
                return Result<MeQueryResponse>.Failure("Kullanıcı bulunamadı!");

            var response = new MeQueryResponse()
            {
                Id = user.Id,
                UserName = user.UserName,
                Role = user.Role
            };

            return Result<MeQueryResponse>.Succeed(response);
        }
    }
}