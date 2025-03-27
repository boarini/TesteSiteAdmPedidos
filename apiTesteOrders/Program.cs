using Microsoft.EntityFrameworkCore;
using apiTesteOrders.Data;
using apiTesteOrders.Services;
using Azure.Messaging.ServiceBus;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionStringBus = builder.Configuration["AzureServiceBusConnectionString"];  
var queueName = builder.Configuration["AzureServiceBusQueueName"];  


Console.WriteLine($"Service Bus Connection String: {connectionStringBus}");
Console.WriteLine($"Queue Name: {queueName}");


builder.Services.AddSingleton(sp =>
{
    var logger = sp.GetRequiredService<ILogger<OrderServiceBus>>();  
    return new OrderServiceBus(connectionStringBus, queueName, logger);  
});


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod());
});

builder.Services.AddHostedService<OrderStatusService>();
builder.Services.AddControllers();
builder.Services.AddSignalR();

var app = builder.Build();


app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.MapHub<OrderHub>("/orderHub");

app.Run();
