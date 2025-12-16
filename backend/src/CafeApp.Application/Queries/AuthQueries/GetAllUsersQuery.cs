using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Queries.AuthQueries
{
    public sealed record GetAllUsersQuery() : IRequest<Result<List<GetAllUsersResponse>>>;

    public sealed record GetAllUsersResponse
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = default!;
        public string FullName { get; set; } = default!;
        public string Role { get; set; } = default!;
    }

    internal sealed class GetAllUsersQueryHandler(IUserRepository userRepository)
        : IRequestHandler<GetAllUsersQuery, Result<List<GetAllUsersResponse>>>
    {
        public async Task<Result<List<GetAllUsersResponse>>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await userRepository.GetAll().ToListAsync(cancellationToken);

            var response = users.Select(u => new GetAllUsersResponse
            {
                Id = u.Id,
                UserName = u.UserName,
                FullName = u.FullName,
                Role = u.Role
            }).ToList();

            return Result<List<GetAllUsersResponse>>.Succeed(response);
        }
    }
}
