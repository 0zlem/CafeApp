using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Application.Services;
using GenericRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace CafeApp.Application.Auth;

public sealed record LoginCommand(string UserName, string Password) : IRequest<Result<LoginCommandResponse>>;

public sealed record LoginCommandResponse
{
    public string AccessToken { get; set; } = default!;
}

internal sealed class LoginCommandHandler(IUserRepository userRepository, IJwtProvider jwtProvider) : IRequestHandler<LoginCommand, Result<LoginCommandResponse>>
{
    public async Task<Result<LoginCommandResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.FirstOrDefaultAsync(u => u.UserName == request.UserName, cancellationToken);

        if (user is null)
        {
            return Result<LoginCommandResponse>.Failure("Kullanıcı bulunamadı!");
        }

        bool validPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

        if (!validPassword)
        {
            return Result<LoginCommandResponse>.Failure("Kullanıcı adı veya şifre hatalı!!");
        }

        string token = await jwtProvider.CreateTokenAsync(user, request.Password, cancellationToken);

        var response = new LoginCommandResponse()
        {
            AccessToken = token
        };

        return Result<LoginCommandResponse>.Succeed(response);

    }
}