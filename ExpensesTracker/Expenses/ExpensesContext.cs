using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using ExpensesTracker.Expenses.Models;
using System.Threading;

namespace ExpensesTracker.Expenses
{
    public class ExpensesContext : DbContext, IExpenseContext
    {
        public ExpensesContext(DbContextOptions<ExpensesContext> options) : base(options)
        { }

        public DbSet<Expense> Expense { get; set; }

        public async Task CreateExpenseAsync(Expense expense, CancellationToken ct)
        {
            Expense.Add(expense);
            await SaveChangesAsync(ct);
        }

        public async Task DeleteExpenseAsync(Expense expense, CancellationToken ct)
        {
            Expense.Remove(expense);
            await SaveChangesAsync(ct);
        }

        public async Task<Expense> GetExpenseAsync(int id, CancellationToken ct)
        {
            return await Expense.FindAsync(new object[] { id }, ct);
        }

        public async Task UpdateExpenseAsync(Expense expense, CancellationToken ct)
        {
            Expense.Update(expense);
            await SaveChangesAsync(ct);
        }

        public async Task<IEnumerable<Expense>> GetExpensesAsync(CancellationToken ct)
        {
            return await Expense.ToListAsync(ct);
        }

        public async Task<bool> ExpenseExists(int id, CancellationToken ct)
        {
            return await Expense.AnyAsync(e => e.Id == id, ct);
        }
    }
}
