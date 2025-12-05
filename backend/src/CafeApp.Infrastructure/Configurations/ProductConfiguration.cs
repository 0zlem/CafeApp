using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CafeApp.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(x => x.Price)
                  .HasColumnType("decimal(10,2)");

            builder.Property(x => x.Stock)
                   .IsRequired();

            builder.Property(x => x.ImageUrl)
                   .HasMaxLength(300);

            builder.Property(x => x.IsAvailable)
                   .HasDefaultValue(true);
        }
    }
}