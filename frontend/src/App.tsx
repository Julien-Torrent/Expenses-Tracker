import { useEffect, useState } from 'react';
import './App.css';
import { Api } from './api/Api';
import Expense from './api/types/Expense';
import ExpenseRow from './components/ExpenseRow';
import EditModal from './components/EditModal';
import FormExample from './components/ExpenseForm';
import ConfirmModal from './components/ConfirmModal';

function App() {

    const [items, setItems] = useState<Expense[]>();

    const [createExpense, setCreateExpense] = useState(new Expense());

    const [editExpense, setEditExpense] = useState(new Expense());
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const [deleteExpense, setDeleteExpense] = useState<Number>(-1);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    useEffect(() => {
        async function getItems() {
            const response = await Api.GetAllExpenses();
            setItems(response);
        };

        if (!items) {
            getItems();
        }
    }, [items]);

    const OnDelete = async (id: Number) => {
        await Api.DeleteExpense(id);
        setItems(items?.filter(x => x.id !== id));
        setDeleteOpen(false);
    }

    const OnRemove = (id: Number) => {
        setDeleteExpense(id);
        setDeleteOpen(true);
    }

    const OnCreate = async (expense: Expense) => {
        const res = await Api.CreateExpense(expense);
        setItems([...(items as Expense[]), res]);
        setCreateExpense(new Expense());
    }

    const OnUpdate = async (expense: Expense) => {
        await Api.UpdateExpense(expense);
        setItems(items?.map(x => x.id === expense.id ? expense : x));
        setEditOpen(false);
    }

    const OnEdit = async (expense: Expense) => {
        setEditExpense({
            ...expense,
            transactionDate: new Date(expense.transactionDate)
        });
        setEditOpen(true);
    }

    return (
        <div className="App">
            <header className="App-header">
                <>
                    <h1>Add a new Expense</h1>
                    <FormExample expense={createExpense} onSubmit={OnCreate}></FormExample>


                    <EditModal
                        open={editOpen}
                        expense={editExpense}
                        onCancel={() => setEditOpen(false)}
                        onSave={(expense) => OnUpdate(expense)}
                    />

                    <ConfirmModal
                        open={deleteOpen}
                        expense={deleteExpense}
                        onCancel={() => setDeleteOpen(false)}
                        onSave={(id) => OnDelete(id)}
                    />

                    <div className="w-100">
                        <h1>Your Expenses</h1>
                        <ul className="list-group list-group-flush">
                            {items?.map(elt =>
                                <ExpenseRow
                                    key={elt.id.toString()}
                                    value={elt}
                                    onDelete={OnRemove}
                                    onEdit={OnEdit}
                                />
                            )}
                        </ul>
                    </div>
                </>
            </header>
        </div>
    );
}

export default App;
