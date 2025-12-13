using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace CafeApp.Infrastructure.Repositories
{
    internal sealed class FileRepository : IFileRepository
    {
        public async Task<string> UploadAsync(IFormFile file, CancellationToken cancellationToken)
        {

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";

            var folderPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "images"
            );

            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream, cancellationToken);

            return $"/images/{fileName}";

        }
    }
}