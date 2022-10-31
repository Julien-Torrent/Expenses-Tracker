import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Expense from '../api/types/Expense';

export default function FormExample({ expense, onSubmit }:
    {
        expense: Expense,
        onSubmit: (expense: Expense) => void
    }) {

    const [updatedExpense, setExpense] = useState(expense);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            onSubmit(updatedExpense);
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3 w-100">

            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={updatedExpense.amount as number}
                        onChange={(e) => setExpense({ ...updatedExpense, amount: Number(e.target.value) })}
                    />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Currency</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        maxLength={3}
                        minLength={3}
                        value={updatedExpense.currency as string}
                        onChange={(e) => setExpense({ ...updatedExpense, currency: e.target.value })}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Recipient</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={updatedExpense.recipient as string}
                        onChange={(e) => setExpense({ ...updatedExpense, recipient: e.target.value })}
                    />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={updatedExpense.type as string}
                        onChange={(e) => setExpense({ ...updatedExpense, type: e.target.value })}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        value={updatedExpense.transactionDate.toISOString().slice(0, 10)}
                        onChange={(e) => setExpense({ ...updatedExpense, transactionDate: new Date(e.target.value) })}
                    />
                </Form.Group>
            </Row>

            <Button className="w-100" type="submit">Save</Button>
        </Form>
    );
}