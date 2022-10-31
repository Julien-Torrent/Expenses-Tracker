import { Modal, Button } from 'react-bootstrap';

export default function ConfirmModal({ open, expense, onSave, onCancel }:
    {
        open: boolean,
        expense: Number,
        onSave: (expense: Number) => void,
        onCancel: () => void;
    }) {

    return (
        <>
            <Modal show={open} onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this item ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onCancel()}>
                        Close
                    </Button>
                    <Button className="btn btn-danger" onClick={() => onSave(expense)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}