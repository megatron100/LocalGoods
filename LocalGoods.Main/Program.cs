using LocalGoods.DAL;
using LocalGoods.DAL.UnitOfWork;
using LocalGoods.Service.Services.IServices;
using LocalGoods.Service.Services;
using LocalGoods.Services.IServices;
using LocalGoods.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using System.Text;

using Azure.Security.KeyVault.Secrets;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
string keyVaultUrl = builder.Configuration["URI:KeyVault"];
var secretClient = new SecretClient(new Uri(keyVaultUrl), new DefaultAzureCredential());
KeyVaultSecret secret = secretClient.GetSecret("LocalGoodsDbSecret"); 
string connectionString = secret.Value;

//var azureServiceTokenProvider = new AzureServiceTokenProvider();
//string token = azureServiceTokenProvider.GetAccessTokenAsync(keyVaultUrl).Result;

//var secretClient = new SecretClient(new Uri(keyVaultUrl), new DefaultAzureCredential(new TokenCredential(token)));

//KeyVaultSecret secret = secretClient.GetSecret("<secret-name>");
//string connectionString = secret.Value;
builder.Configuration["AzureLocalGoodsConnection"] = connectionString;

builder.Services.AddDbContext<LocalGoodsDbContext>(x => x.UseSqlServer(
                                    builder.Configuration.GetConnectionString("AzureLocalGoodsConnection"))
                                                                       );
//add UnitOfWork
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization();
builder.Services.AddCors();
 
var app = builder.Build();

// Configure the HTTP request pipeline.
 
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee API V1");
    }); ;

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapControllers();

app.Run();
