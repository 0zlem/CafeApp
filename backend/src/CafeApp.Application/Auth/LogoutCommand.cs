using MediatR;
using TS.Result;

namespace CafeApp.Application.Auth;

public sealed record LogoutCommand() : IRequest<Result<string>>;

public class LogoutCommandHandler : IRequestHandler<LogoutCommand, Result<string>>
{
    public async Task<Result<string>> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        return Result<string>.Succeed("Çıkış yapıldı.");
    }
}
