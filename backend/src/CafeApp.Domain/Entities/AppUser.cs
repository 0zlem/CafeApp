using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Enum;

namespace CafeApp.Domain.Entities
{
    public sealed class AppUser
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string FullName { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public string Role { get; set; } = UserRole.Garson.ToString();
    }
}