using BackEnd.Models;
using BackEnd.Repositories;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .AllowAnyOrigin()       
            .AllowAnyMethod()       
            .AllowAnyHeader();      
    });
});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Define the Bearer token security scheme
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer { token }\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    // Add a security requirement for the Bearer token
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
        });
});


builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITravelAlertService, TravelAlertService>();

var jwtKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
            ?? builder.Configuration["Jwt:Key"];

if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT secret key not found. Set JWT_SECRET_KEY environment variable or add Jwt:Key to configuration.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
            ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();


builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddScoped<IEntityService<DiagnosticTest>, EntityService<DiagnosticTest>>();
builder.Services.AddScoped<IEntityService<MonitoredDestination>, EntityService<MonitoredDestination>>();

builder.Services.AddScoped<IRepository<DiagnosticTest>>(provider =>
{
    var context = provider.GetRequiredService<MongoDbContext>();
    return new Repository<DiagnosticTest>(context.Database, "DiagnosticTests");
});

builder.Services.AddScoped<IRepository<MonitoredDestination>>(provider =>
{
    var context = provider.GetRequiredService<MongoDbContext>();
    return new Repository<MonitoredDestination>(context.Database, "MonitoredDestinations");
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var mongoContext = scope.ServiceProvider.GetRequiredService<MongoDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        var connected = await mongoContext.PingAsync();
        if (connected)
            logger.LogInformation("Connected to MongoDB successfully.");
        else
            logger.LogError("Failed to connect to MongoDB.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Exception while connecting to MongoDB.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
