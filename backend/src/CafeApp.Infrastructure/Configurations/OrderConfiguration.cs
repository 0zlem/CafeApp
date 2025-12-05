using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CafeApp.Infrastructure.Configurations
{
       public class OrderConfiguration : IEntityTypeConfiguration<Order>
       {
              public void Configure(EntityTypeBuilder<Order> builder)
              {
                     builder.Property(x => x.TotalAmount)
                           .HasColumnType("decimal(10,2)");

                     builder.Property(x => x.CreatedAt)
                            .IsRequired();

                     builder.Property(x => x.Status)
                            .IsRequired();

                     builder.HasOne(x => x.Table)
                            .WithMany()
                            .HasForeignKey(x => x.TableId)
                            .OnDelete(DeleteBehavior.SetNull);

                     builder.HasMany(x => x.OrderItems)
                            .WithOne(x => x.Order!)
                            .HasForeignKey(x => x.OrderId)
                            .OnDelete(DeleteBehavior.Cascade);
              }
       }
}