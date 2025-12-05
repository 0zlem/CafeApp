using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using CafeApp.Application.Services;
using CafeApp.Domain.Entities;
using CafeApp.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CafeApp.Infrastructure.Repositories;

internal sealed class JwtProvider(IOptions<JwtOptions> options) : IJwtProvider
{
    public Task<string> CreateTokenAsync(AppUser user, string password, CancellationToken cancellationToken = default)
    {
        List<Claim> claims = new()
        {
           new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
           new Claim(ClaimTypes.Name, user.UserName),
           new Claim(ClaimTypes.Role, user.Role.ToString())
        };


        var expires = DateTime.Now.AddDays(1);

        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(options.Value.SecretKey));
        SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken securityToken = new(
              issuer: options.Value.Issuer,
              audience: options.Value.Audience,
              claims: claims,
              expires: expires,
              signingCredentials: signingCredentials
        );

        JwtSecurityTokenHandler handler = new();

        string token = handler.WriteToken(securityToken);

        return Task.FromResult(token);
    }
}
