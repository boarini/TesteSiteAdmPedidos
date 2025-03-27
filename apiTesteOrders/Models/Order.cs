using System;
using System.ComponentModel.DataAnnotations;

namespace apiTesteOrders.Models
{
    public class Order
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();
        [Required]
        public string Cliente { get; set; }
        [Required]
        public string Produto { get; set; }
        [Required]
        public decimal Valor { get; set;  }
        [Required]
        public string Status { get; set;}
        [Required]
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        }
    }
