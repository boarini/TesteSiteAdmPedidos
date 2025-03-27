using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using apiTesteOrders.Models;
using apiTesteOrders.Data;
using System.Text.Json;

public class OrderStatusService : BackgroundService
{
    private readonly ILogger<OrderStatusService> _logger;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly string _connectionString;
    private readonly string _queueName;

    public OrderStatusService(ILogger<OrderStatusService> logger, IServiceScopeFactory serviceScopeFactory, IConfiguration configuration)
    {
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;
        _connectionString = configuration["AzureServiceBusConnectionString"];
        _queueName = configuration["AzureServiceBusQueueName"];
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await using (var client = new ServiceBusClient(_connectionString))
        {
            await using (var receiver = client.CreateReceiver(_queueName))
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    
                    var message = await receiver.ReceiveMessageAsync(TimeSpan.FromSeconds(10), stoppingToken);

                    if (message != null)
                    {
                        var orderJson = message.Body.ToString();
                        var order = JsonSerializer.Deserialize<Order>(orderJson);
                        if (order != null)
                        {
                            await ProcessOrderAsync(order, stoppingToken);
                            await receiver.CompleteMessageAsync(message, stoppingToken);
                        }
                        else
                        {
                            _logger.LogWarning("Received invalid order message: {Message}", message.Body.ToString());
                        }
                    }
                }
            }
        }
    }

    private async Task ProcessOrderAsync(Order order, CancellationToken stoppingToken)
    {
        using (var scope = _serviceScopeFactory.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var existingOrder = await context.Orders.FindAsync(order.ID);
            if (existingOrder != null)
            {
                existingOrder.Status = "Processando";
                await context.SaveChangesAsync(stoppingToken); 

                _logger.LogInformation($"Order {order.ID} status updated to 'Processando'");

                await Task.Delay(5000, stoppingToken);

                existingOrder.Status = "Finalizado";
                await context.SaveChangesAsync(stoppingToken); 

                _logger.LogInformation($"Order {order.ID} status updated to 'Finalizado'");
            }
            else
            {
                _logger.LogWarning($"Order {order.ID} not found in the database.");
            }
        }
    }
}
