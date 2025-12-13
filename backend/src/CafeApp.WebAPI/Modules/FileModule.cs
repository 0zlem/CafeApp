using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;

namespace CafeApp.WebAPI.Modules
{
    public static class FileModule
    {
        public static void RegisterFileRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/files").WithTags("Files");

            groupBuilder.MapPost("/upload", async (IFormFile file, IFileRepository fileRepository, CancellationToken ct) =>
            {
                if (file is null || file.Length == 0)
                    return Results.BadRequest("Dosya seçilmedi");

                var imageUrl = await fileRepository.UploadAsync(file, ct);

                return Results.Ok(imageUrl);
            }).DisableAntiforgery();

        }
    }
}