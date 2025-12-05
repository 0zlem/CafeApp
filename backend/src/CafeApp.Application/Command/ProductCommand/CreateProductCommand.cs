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
    public sealed record CreateProductCommand(string Name, string? Description, decimal Price, int Stock, Guid CategoryId, string? ImageUrl, bool IsAvailable) : IRequest<Result<string>>;

    internal sealed class CreateProductCommandHandler(IProductRepository productRepository, IHttpContextAccessor httpContextAccessor, ICategoryRepository categoryRepository, IUnitOfWork unitOfWork) : IRequestHandler<CreateProductCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var isProductExist = await productRepository.AnyAsync(p => p.Name == request.Name, cancellationToken);

            if (isProductExist)
            {
                return Result<string>.Failure("Bu ürün zaten mevcut!!");
            }

            var isCategoryExist = await categoryRepository.AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

            if (!isCategoryExist)
            {
                return Result<string>.Failure("Kategori bulunamadı!!");
            }

            Product product = request.Adapt<Product>();
            await productRepository.AddAsync(product);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Ürün başarıyla eklendi.");
        }
    }


}