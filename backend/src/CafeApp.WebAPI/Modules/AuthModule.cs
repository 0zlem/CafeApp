using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CafeApp.Application.Auth;
using CafeApp.Application.Queries.AuthQueries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class AuthModule
    {
        public static void RegisterAuthRoutes(this IEndpointRouteBuilder app)
        {
            RouteGroupBuilder groupBuilder = app.MapGroup("/auth").WithTags("Auth");

            groupBuilder.MapGet("/me", [Authorize] async (ISender sender, ClaimsPrincipal user, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new MeQuery(user), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<MeQueryResponse>>();

            groupBuilder.MapPost("/register", async (ISender sender, RegisterCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<string>>();

            groupBuilder.MapPost("/login", async (ISender sender, LoginCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<LoginCommandResponse>>();

        }
    }
}