import React from "react";
import Modal from "../../UI/Modal/Modal";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "./AddReminder.css";

export default function AddReminder(props) {
  function closeModal() {
    console.log("Close Modal");
    props.onConfirm();
  }
  return (
    <Modal>
      <div className="add-container">
        <Form onSubmit={closeModal}>
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" /* ref={emailRef} */ required />
          </Form.Group>
          <Form.Group id="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" /* ref={textRef} */ required />
          </Form.Group>
          <Form.Group id="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="text" /* ref={textRef} */ required />
          </Form.Group>
          <Button /* disabled={loading} */ className="w-100" type="submit">
            Set Reminder
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
