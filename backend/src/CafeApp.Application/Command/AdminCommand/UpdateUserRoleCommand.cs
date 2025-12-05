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

namespace CafeApp.Application.Command.AdminCommand
{
    public sealed record UpdateUserRoleCommand(Guid UserId, UserRole NewRole) : IRequest<Result<string>>;

    internal sealed class UpdateUserRoleCommandHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<UpdateUserRoleCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var user = await userRepository.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);
            if (user is null)
                return Result<string>.Failure("Kullanıcı bulunamadı!");

            user.Role = request.NewRole.ToString();
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Kullanıcı rolü başarıyla güncellendi.");
        }
    }
}