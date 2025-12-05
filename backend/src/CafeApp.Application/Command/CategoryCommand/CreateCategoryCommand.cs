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
    public sealed record CreateCategoryCommand(string Name) : IRequest<Result<string>>;

    internal sealed class CreateCategoryCommandHandler(ICategoryRepository categoryRepository, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IRequestHandler<CreateCategoryCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var userRole = httpContext?.User.FindFirstValue(ClaimTypes.Role);
            if (userRole != UserRole.Admin.ToString())
                return Result<string>.Failure("Bu işlem için admin yetkisine sahip olmalısınız!");

            var isCategory = await categoryRepository.AnyAsync(c => c.Name == request.Name, cancellationToken);
            if (isCategory)
            {
                return Result<string>.Failure("Bu isimde kategori mevcuttur!!");
            }

            Category category = request.Adapt<Category>();

            await categoryRepository.AddAsync(category);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Kategori başarıyla eklendi.");

        }
    }
}