using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

namespace CafeApp.Application.Command.ProductCommand
{
    public sealed record DeleteProductCommand(Guid Id) : IRequest<Result<string>>;

    internal sealed class DeleteProductCommandHandler(IProductRepository productRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<DeleteProductCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
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

            productRepository.Delete(product);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Ürün başarıyla silindi.");
        }
    }
}