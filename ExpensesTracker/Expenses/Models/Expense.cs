using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpensesTracker.Expenses.Models
{
    public record Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; init; }

        [Required]
        public DateTime TransactionDate { get; init; }

        [Required]
        public decimal Amount { get; init; }

        [Required]
        [MaxLength(3)]
        [MinLength(3)]
        public string Currency { get; init; } = string.Empty;

        [Required]
        public string Recipient { get; init; } = string.Empty;

        [Required]
        public string Type { get; init; } = string.Empty;
    }
}
