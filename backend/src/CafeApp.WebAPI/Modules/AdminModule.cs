using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.AdminCommand;
using CafeApp.Application.Queries.AuthQueries;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class AdminModule
    {
        public static void RegisterAdminRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/admin").WithTags("Admin");

            groupBuilder.MapPut("/users/role", async (ISender sender, UpdateUserRoleCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<string>>();

            groupBuilder.MapGet("/users", async (ISender sender, CancellationToken ct) =>
           {
               var result = await sender.Send(new GetAllUsersQuery(), ct);
               return result.IsSuccessful ? Results.Ok(result) : Results.BadRequest(result);
           }).Produces<Result<List<GetAllUsersResponse>>>();
        }
    }
}