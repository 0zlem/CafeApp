using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using GenericRepository;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

namespace CafeApp.Application.Command.ProductCommand
{
    public sealed record UpdateProductCommand(Guid Id, string Name, string? Description, decimal Price, int Stock, Guid CategoryId, string? ImageUrl, bool IsAvailable) : IRequest<Result<string>>;

    internal sealed class UpdateProductCommandHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository, IHttpContextAccessor httpContextAccessor,
        IUnitOfWork unitOfWork
    ) : IRequestHandler<UpdateProductCommand, Result<string>>
    {

        public async Task<Result<string>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var product = await productRepository.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (product is null)
            {
                return Result<string>.Failure("Ürün bulunamadı!!");
            }

            var productName = await productRepository.AnyAsync(p => p.Id != request.Id && p.Name == request.Name, cancellationToken);

            if (productName)
            {
                return Result<string>.Failure("Bu isimde başka bir ürün zaten mevcut!!");
            }

            var isCategoryExist = await categoryRepository.AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

            if (!isCategoryExist)
            {
                return Result<string>.Failure("Kategori bulunamadı!!");
            }

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Stock = request.Stock;
            product.CategoryId = request.CategoryId;
            product.ImageUrl = request.ImageUrl;
            product.IsAvailable = request.IsAvailable;

            productRepository.Update(product);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Ürün başarıyla güncellendi.");
        }
    }
}