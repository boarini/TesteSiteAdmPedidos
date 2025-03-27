using Azure.Messaging.ServiceBus;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using apiTesteOrders.Models;

namespace apiTesteOrders.Services
{
    public class OrderServiceBus
    {
        private readonly string _connectionString;
        private readonly string _queueName;
        private ServiceBusClient _client;
        private ServiceBusSender _sender;
        private readonly ILogger<OrderServiceBus> _logger;

        public OrderServiceBus(string connectionString, string queueName, ILogger<OrderServiceBus> logger)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
            _queueName = queueName ?? throw new ArgumentNullException(nameof(queueName));

            _client = new ServiceBusClient(_connectionString);
            _sender = _client.CreateSender(_queueName);
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        
        public async Task SendOrderMessageAsync(Order order)
        {
            try
            {
                var orderJson = JsonSerializer.Serialize(order);  
                var message = new ServiceBusMessage(orderJson); 

                // Log the message send attempt
                _logger.LogInformation("Sending order message: {Order}", order);

                await _sender.SendMessageAsync(message); 

                _logger.LogInformation("Order message sent successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending order message.");
                throw; 
            }
        }
    }
}
