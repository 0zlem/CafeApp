using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CafeApp.Application.Command.TableCommand;
using CafeApp.Application.Queries.TableQueries;
using CafeApp.Domain.Entities;
using MediatR;
using TS.Result;

namespace CafeApp.WebAPI.Modules
{
    public static class TableModule
    {
        public static void RegisterTableRoutes(this IEndpointRouteBuilder app)
        {
            var groupBuilder = app.MapGroup("/tables").WithTags("Tables");

            groupBuilder.MapPost("/create", async (ISender sender, CreateTableCommand request, CancellationToken cancellationToken) =>
                   {
                       var response = await sender.Send(request, cancellationToken);

                       return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

                   }).Produces<Result<string>>();

            groupBuilder.MapPut("/update", async (ISender sender, UpdateTableCommand request, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(request, cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<string>>();

            groupBuilder.MapDelete("/delete/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new DeleteTableCommand(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            });

            groupBuilder.MapPut("/activate/{tableId:guid}", async (ISender sender, Guid tableId, CancellationToken cancellationToken) =>
           {
               var response = await sender.Send(new SetTableActiveCommand(tableId), cancellationToken);

               return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

           }).Produces<Result<string>>();

            groupBuilder.MapGet("", async (ISender sender, CancellationToken cancellationToken) =>
             {
                 var response = await sender.Send(new GetAllTableQuery(), cancellationToken);

                 return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

             }).Produces<Result<List<Table>>>();

            groupBuilder.MapGet("/{id:guid}", async (ISender sender, Guid id, CancellationToken cancellationToken) =>
            {
                var response = await sender.Send(new GetTableByIdQuery(id), cancellationToken);

                return response.IsSuccessful ? Results.Ok(response) : Results.BadRequest(response);

            }).Produces<Result<Table>>();

        }
    }
}