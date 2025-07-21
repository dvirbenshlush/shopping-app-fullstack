using Microsoft.EntityFrameworkCore;
using catalog_api.Data;         
using catalog_api.Repositories; 
using catalog_api.Services;
using System.Globalization;

CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
    string swaggerUrl = builder.Configuration["Swagger:Url"];

    try
    {
        var psi = new System.Diagnostics.ProcessStartInfo
        {
            FileName = swaggerUrl,
            UseShellExecute = true
        };
        System.Diagnostics.Process.Start(psi);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Couldn't open browser: " + ex.Message);
    }
//}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.MapControllers();
app.Run();