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
    internal sealed class ProductRepository : Repository<Product, AppDbContext>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}