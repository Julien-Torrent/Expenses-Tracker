using ExpensesTracker.Expenses.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ExpensesTracker.Expenses
{
    public interface IExpenseContext
    {
        public Task<IEnumerable<Expense>> GetExpensesAsync(CancellationToken ct);

        public Task<bool> ExpenseExists(int id, CancellationToken ct);

        public Task CreateExpenseAsync(Expense expense, CancellationToken ct);
        public Task<Expense> GetExpenseAsync(int id, CancellationToken ct);
        public Task UpdateExpenseAsync(Expense expense, CancellationToken ct);
        public Task DeleteExpenseAsync(Expense expense, CancellationToken ct);
    }
}
