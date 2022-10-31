using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ExpensesTracker.Expenses;
using ExpensesTracker.Expenses.Models;
using System.Threading;
using Microsoft.AspNetCore.Cors;

namespace ExpensesTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ExpensesController : ControllerBase
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly IExpenseContext _context;

        public ExpensesController(ILogger<ExpensesController> logger, IExpenseContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpense(CancellationToken ct)
        {
            try
            {
                return Ok(await _context.GetExpensesAsync(ct));
            }
            catch (Exception ex)
            {
                _logger.LogError("[{Time:G}] : {Ex}", DateTime.UtcNow, ex);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id, CancellationToken ct)
        {
            try
            {
                var expense = await _context.GetExpenseAsync(id, ct);
                if (expense == null)
                {
                    return NotFound();
                }

                return expense;
            }
            catch (Exception ex)
            {
                _logger.LogError("[{Time:G}] : {Ex} with params={params}", DateTime.UtcNow, ex, id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // PUT: api/Expenses/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutExpense(int id, [FromBody] Expense expense, CancellationToken ct)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            try
            {
                if (!await _context.ExpenseExists(id, ct))
                {
                    return NotFound();
                }

                await _context.UpdateExpenseAsync(expense, ct);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("[{Time:G}] : {Ex} with params={params}", DateTime.UtcNow, ex, new { id, expense });
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // POST: api/Expenses
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense([FromBody] Expense expense, CancellationToken ct)
        {
            try
            {
                await _context.CreateExpenseAsync(expense, ct);

                return CreatedAtAction("GetExpense", new { id = expense.Id }, expense);
            }
            catch (Exception ex)
            {
                _logger.LogError("[{Time:G}] : {Ex} with params={params}", DateTime.UtcNow, ex, expense);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id, CancellationToken ct)
        {
            try
            {
                var expense = await _context.GetExpenseAsync(id, ct);
                if (expense == null)
                {
                    return NotFound();
                }
                await _context.DeleteExpenseAsync(expense, ct);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("[{Time:G}] : {Ex} with params={params}", DateTime.UtcNow, ex, id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
