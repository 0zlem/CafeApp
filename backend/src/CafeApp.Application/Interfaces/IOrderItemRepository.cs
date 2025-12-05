using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Dtos;
using CafeApp.Domain.Entities;
using GenericRepository;

namespace CafeApp.Application.Interfaces
{
    public interface IOrderItemRepository : IRepository<OrderItem>
    {

    }
}