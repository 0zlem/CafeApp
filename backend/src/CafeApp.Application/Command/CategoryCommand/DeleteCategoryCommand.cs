using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using CafeApp.Domain.Entities;
using CafeApp.Domain.Enum;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Http;
using TS.Result;

namespace CafeApp.Application.Command.CategoryCommand
{
    public sealed record DeleteCategoryCommand(Guid Id) : IRequest<Result<string>>;

    internal sealed class DeleteCategoryCommandHandler(ICategoryRepository categoryRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<DeleteCategoryCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var categoryId = await categoryRepository.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (categoryId is null)
            {
                return Result<string>.Failure("Kategori bulunamadı!!");
            }
            categoryRepository.Delete(categoryId);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Kategori başarıyla silindi.");
        }
    }
}