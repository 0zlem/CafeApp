using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Dtos
{
    public sealed class OrderDto
    {
        public string TableCode { get; set; } = null!;
        public List<OrderItemDto> Items { get; set; } = new();
    }

}