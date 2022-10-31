import { Modal, Button } from 'react-bootstrap';
import Expense from "../api/types/Expense";
import EditExpense from "./ExpenseForm";


export default function EditModal({ open, expense, onSave, onCancel }:
    {
        open: boolean,
        expense: Expense,
        onSave: (expense: Expense) => void,
        onCancel: () => void;
    }) {

    return (
        <>
            <Modal show={open} onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditExpense expense={expense} onSubmit={(ex) => onSave(ex)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onCancel()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}