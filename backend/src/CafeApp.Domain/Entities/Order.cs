using System;
using System.Collections.Generic;
using CafeApp.Domain.Enum;

namespace CafeApp.Domain.Entities
{
    public sealed class Order
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();

        public Guid? TableId { get; set; }
        public Table? Table { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Created;
        public PaymentType? PaymentType { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
