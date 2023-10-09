using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppUserContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequiredLength = 8;
        options.SignIn.RequireConfirmedEmail = true;
    })
    .AddEntityFrameworkStores<AppUserContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();
var roleManager = builder.Services
    .BuildServiceProvider()
    .GetRequiredService<RoleManager<IdentityRole>>();

if (!await roleManager.RoleExistsAsync("Member"))
{
    await roleManager.CreateAsync(new IdentityRole("Member"));
}

var app = builder.Build();

app.UseCors(
    x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000")
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
