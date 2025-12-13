using Microsoft.AspNetCore.Http;

namespace CafeApp.Application.Interfaces;

public interface IFileRepository
{
    Task<string> UploadAsync(IFormFile file, CancellationToken cancellationToken);
}
