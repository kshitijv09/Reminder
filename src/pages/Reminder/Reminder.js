import React, { useState } from "react";
import AddReminder from "../../components/AddReminder/AddReminder";

export default function Reminder() {
  const [modal, setModal] = useState(false);
  const modalHandler = () => {
    setModal((prevValue) => {
      return !prevValue;
    });
  };
  return (
    <div>
      {/* {console.log(modal)} */}
      {modal && <AddReminder onConfirm={modalHandler} />}
      <h2> This is the Reminder Page</h2>
      <button onClick={modalHandler}> Add a Reminder</button>
    </div>
  );
}
