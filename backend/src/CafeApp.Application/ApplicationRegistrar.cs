using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnglishCardApp.Application.Behaviors;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace CafeApp.Application
{
    public static class ApplicationRegistrar
    {
        public static IServiceCollection AddApplicationRegistrar(this IServiceCollection services)
        {
            services.AddMediatR(conf =>
            {
                conf.RegisterServicesFromAssembly(typeof(ApplicationRegistrar).Assembly);
                conf.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });
            services.AddValidatorsFromAssembly(typeof(ApplicationRegistrar).Assembly);

            return services;
        }

    }
}