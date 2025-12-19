using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.AdminCommand;
using CafeApp.Application.Queries.AuthQueries;
using CafeApp.Application.Queries.DashboardQueries;
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
                var response = await sender.Send(new GetAllUsersQuery(), ct);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<List<GetAllUsersResponse>>>();

            groupBuilder.MapGet("/dashboard/sales", async (ISender sender) =>
            {
                var response = await sender.Send(new GetSalesOverviewQuery(DateTimeOffset.UtcNow.AddDays(-30), DateTimeOffset.UtcNow));
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            });

            groupBuilder.MapGet("/dashboard/topProducts", async (ISender sender) =>
            {
                var response = await sender.Send(new GetTopProductsQuery());
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            });

            groupBuilder.MapGet("/dashboard/stock", async (ISender sender) =>
            {
                var response = await sender.Send(new GetStockOverviewQuery());
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            });

        }
    }
}