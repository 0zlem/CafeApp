using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using FluentValidation;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using TS.Result;

namespace CafeApp.Application.Auth;

public sealed record RegisterCommand(
    string UserName,
    string FullName,
    string Password
) : IRequest<Result<string>>;

internal sealed class RegisterCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork) : IRequestHandler<RegisterCommand, Result<string>>
{
    public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        bool userExists = await userRepository.AnyAsync(u => u.UserName == request.UserName, cancellationToken);

        if (userExists)
        {
            return Result<string>.Failure("Kullanıcı zaten mevcut!!");
        }

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        AppUser newUser = new()
        {
            UserName = request.UserName,
            FullName = request.FullName,
            PasswordHash = passwordHash,
            Role = UserRole.Garson.ToString()
        };


        await userRepository.AddAsync(newUser);
        await unitOfWork.SaveChangesAsync(cancellationToken);


        return Result<string>.Succeed("Kayıt başarılı!");

    }
}


