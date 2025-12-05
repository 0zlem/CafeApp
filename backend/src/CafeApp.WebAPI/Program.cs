using System.Text.Json.Serialization;
using CafeApp.Application;
using CafeApp.Infrastructure;
using CafeApp.WebAPI.Modules;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddApplicationRegistrar();
builder.Services.AddInfrastructureRegistrar(builder.Configuration);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.RegisterRoutes();

app.MapGet("/", () => Results.Redirect("/scalar/v1"));
app.MapOpenApi();
app.MapScalarApiReference();

app.Run();


