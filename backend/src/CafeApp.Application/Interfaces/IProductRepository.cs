using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Entities;
using GenericRepository;

namespace CafeApp.Application.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {

    }
}