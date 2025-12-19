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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNext", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                // localhost
                if (origin.StartsWith("http://localhost"))
                    return true;

                // aynı ağdan gelen IP’ler (192.168.x.x, 10.x.x.x vs)
                if (origin.StartsWith("http://192.168.") ||
                    origin.StartsWith("http://10.") ||
                    origin.StartsWith("http://172."))
                    return true;

                return false;
            })
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});



builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseCors("AllowNext");

// app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.RegisterRoutes();

app.MapGet("/", () => Results.Redirect("/scalar/v1"));
app.MapOpenApi();
app.MapScalarApiReference();

app.Run();


