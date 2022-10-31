import Expense from "../api/types/Expense";

export default function ExpenseRow({ value, onDelete, onEdit }:
    {
        value: Expense,
        onDelete: (id: Number) => void,
        onEdit: (expense: Expense) => void
    }) {


    return (
        <li key={value.id.toString()} className="list-group-item d-flex row m-0">

            <p className="col-md-2">{new Date(value.transactionDate).toISOString().slice(0, 10)}</p>

            <p className="col-md-3">{value.recipient}</p>
            <p className="col-md-3">{value.type}</p>


            <p className="col-md-2">{value.amount.toString()} {value.currency}</p>

            <div className="col-md-2">
                <button className="btn btn-primary" onClick={() => onEdit(value)}>
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button className="btn btn-danger" onClick={() => onDelete(value.id)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </li>
    );
}