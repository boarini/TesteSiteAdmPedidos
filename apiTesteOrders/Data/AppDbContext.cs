using Microsoft.EntityFrameworkCore;
using apiTesteOrders.Models;

namespace apiTesteOrders.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders{ get; set; }

}
}
