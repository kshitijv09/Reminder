import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import "./AddReminder.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddReminder(props) {
  const { currentUser } = useAuth();

  const nameRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const dataStoreHandler = async () => {
    props.onConfirm();
    try {
      const docRef = await addDoc(collection(db, `${currentUser.email}`), {
        Name: nameRef.current.value,
        Date: dateRef.current.value,
        Time: timeRef.current.value,
        Status: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Modal>
      <div className="add-container">
        <Form onSubmit={dataStoreHandler}>
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group id="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" ref={dateRef} required />
          </Form.Group>
          <Form.Group id="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="text" ref={timeRef} required />
          </Form.Group>
          <Button className="w-100" type="submit">
            Set Reminder
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
