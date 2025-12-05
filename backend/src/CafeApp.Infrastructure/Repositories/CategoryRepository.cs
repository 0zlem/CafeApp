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
    internal sealed class CategoryRepository : Repository<Category, AppDbContext>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }
    }
}