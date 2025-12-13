using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.ProductCommand;
using CafeApp.Application.Queries.ProductQueries;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class ProductModule
    {
        public static void RegisterProductRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/products").WithTags("Products");

            groupBuilder.MapPost("/create", async (ISender sender, CreateProductCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/update", async (ISender sender, UpdateProductCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapDelete("/delete/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new DeleteProductCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.InternalServerError(response);

            });

            groupBuilder.MapGet("", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetAllProductsQuery(), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<List<Product>>>();

            groupBuilder.MapGet("/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetProductByIdQuery(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<Category>>();

            groupBuilder.MapGet("/category/{categoryId:guid}", async (ISender sender, Guid categoryId, CancellationToken cancellationToken) =>
           {
               var response = await sender.Send(new GetProductByCategoryQuery(categoryId), cancellationToken);

               return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

           }).Produces<Result<List<ProductDto>>>();
        }
    }
}