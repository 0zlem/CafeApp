using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeApp.Domain.Dtos
{
    public class ActiveOrderDetailsDto
    {
        public Guid Id { get; set; }
        public int Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string TableName { get; set; } = string.Empty;
        public List<ActiveOrderItemDetailsDto> Items { get; set; } = new();
    }
}