using apiTesteOrders.Models;
using Microsoft.AspNetCore.SignalR;

public class OrderHub : Hub
{
    public async Task SendOrderUpdate(Order order)
    {
        await Clients.All.SendAsync("ReceiveOrderUpdate", order);
    }
}
