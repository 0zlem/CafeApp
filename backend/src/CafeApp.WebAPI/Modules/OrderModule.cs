using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.OrderCommand;
using CafeApp.Application.Queries.OrderQueries;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class OrderModule
    {
        public static void RegisterOrderRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/orders").WithTags("Orders");

            groupBuilder.MapPost("/create", async (ISender sender, CreateOrderCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/cancel/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new SetOrderCancelledCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/paid/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new SetOrderPaidCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/preparing/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new SetOrderPreparingCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/ready/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new SetOrderReadyCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapPut("/served/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new SetOrderServedCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapGet("/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetOrderByIdQuery(id), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<Order>>();

            groupBuilder.MapGet("/active/{tableId:guid}", async (ISender sender, Guid tableId, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetActiveOrdersByTableQuery(tableId), cancellationToken);
                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);
            }).Produces<Result<List<Order>>>();
        }
    }
}