using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Entities;

namespace CafeApp.Application.Services;

public interface IJwtProvider
{
    public Task<string> CreateTokenAsync(AppUser user, string password, CancellationToken cancellationToken = default!);
}
