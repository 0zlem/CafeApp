using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Entities
{
    public sealed class Product
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }
        public Category? Category { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}