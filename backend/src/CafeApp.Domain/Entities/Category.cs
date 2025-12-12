using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Entities
{
    public sealed class Category
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public string Name { get; set; } = default!;
        public ICollection<Product> Products { get; set; }

    }
}