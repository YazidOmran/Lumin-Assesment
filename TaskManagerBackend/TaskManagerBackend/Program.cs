using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using TaskManagerBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<TaskContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TaskContext")));

// Add other services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Configure Auth0 authentication
var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

// Add authorization policies for different task permissions
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("view:tasks", policy =>
        policy.Requirements.Add(new HasScopeRequirement("view:tasks", domain)));
    options.AddPolicy("create:tasks", policy =>
        policy.Requirements.Add(new HasScopeRequirement("create:tasks", domain)));
    options.AddPolicy("edit:tasks", policy =>
        policy.Requirements.Add(new HasScopeRequirement("edit:tasks", domain)));
    options.AddPolicy("delete:tasks", policy =>
        policy.Requirements.Add(new HasScopeRequirement("delete:tasks", domain)));
});

// Register the custom authorization handler
builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable the CORS policy
app.UseCors("AllowLocalhost3000");

// Enable routing
app.UseRouting();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Map endpoints
app.MapControllers();

app.Run();
