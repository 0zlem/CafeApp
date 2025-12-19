using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Dtos
{
    public sealed class OrderDto
    {
        public Guid TableId { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }

}