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

namespace CafeApp.Application.Command.CategoryCommand
{
    public sealed record UpdateCategoryCommand(Guid Id, string Name) : IRequest<Result<string>>;

    internal sealed class UpdateCategoryCommandHandler(ICategoryRepository categoryRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<UpdateCategoryCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var category = await categoryRepository.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (category is null)
            {
                return Result<string>.Failure("Kategori bulunamadı!!");
            }

            category.Name = request.Name;

            categoryRepository.Update(category);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Kategori başarıyla güncellendi.");
        }
    }
}