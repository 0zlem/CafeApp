using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.CategoryCommand;
using CafeApp.Application.Queries.CategoryQueries;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class CategoryModule
    {
        public static void RegisterCategoryRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/categories").WithTags("Categories");

            groupBuilder.MapPost("/create", async (ISender sender, CreateCategoryCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<string>>();

            groupBuilder.MapPut("/update", async (ISender sender, UpdateCategoryCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<string>>();

            groupBuilder.MapDelete("/delete/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new DeleteCategoryCommand(id), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);
            });

            groupBuilder.MapGet("", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetAllCategoryQuery(), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<List<Category>>>();

            groupBuilder.MapGet("/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetCategoryByIdQuery(id), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<Category>>();
        }
    }
}