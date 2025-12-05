using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Entities
{
    public sealed class OrderItem
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();

        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtOrder { get; set; }
    }

}