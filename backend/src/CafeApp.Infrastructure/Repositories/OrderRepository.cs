using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Infrastructure.Context;
using GenericRepository;

namespace CafeApp.Infrastructure.Repositories
{
    internal sealed class OrderRepository : Repository<Order, AppDbContext>, IOrderRepository
    {
        public OrderRepository(AppDbContext context) : base(context)
        {
        }
    }
}