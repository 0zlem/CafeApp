using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Entities;
using GenericRepository;
using Microsoft.AspNetCore.DataProtection.Repositories;

namespace CafeApp.Application.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {

    }
}