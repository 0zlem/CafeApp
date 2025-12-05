using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Entities
{
    public sealed class Table
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public string Name { get; set; } = default!;
        public string CodeQR { get; set; } = default!;
        public bool IsActive { get; set; } = false;
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

}