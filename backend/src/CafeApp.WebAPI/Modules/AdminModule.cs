using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.AdminCommand;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class AdminModule
    {
        public static void RegisterAdminRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/admin").WithTags("Admin");

            groupBuilder.MapPut("/user/role", async (ISender sender, UpdateUserRoleCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<string>>();
        }
    }
}