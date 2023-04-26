import React, { useState, useEffect } from "react";
import AddReminder from "../../components/AddReminder/AddReminder";
import Nav from "../../components/Nav/Nav";
import "./Reminder.css";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useAuth } from "../../context/AuthContext";

export default function Reminder() {
  const { currentUser } = useAuth();
  const [reminder, setReminder] = useState([]);
  const [modal, setModal] = useState(false);
  const [checked, isChecked] = useState(new Array().fill(false));

  const modalHandler = () => {
    setModal((prevValue) => {
      return !prevValue;
    });
  };

  const fetchReminder = async () => {
    console.log("Initial value of checked");
    console.log(checked);
    await getDocs(collection(db, `${currentUser.email}`)).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReminder(newData);
        //console.log(reminder, newData);
      }
    );

    /* const checkArr = new Array(reminder.length);
    console.log(reminder);

    reminder.map((rem, index) => {
      

      checkArr[index] = rem.Status;
    });

    console.log("Value of Check Arr");
    console.log(checkArr);
    isChecked(checkArr); */
    //const [checked, isChecked] = useState(checkArr);
    //console.log(checked);
  };

  const fetchStatus = () => {
    //console.log(reminder);
    const checkArr = new Array(reminder.length);
    //console.log(checkArr.length);
    reminder.map((rem, index) => {
      checkArr[index] = rem.Status;
    });
    console.log(checkArr);
    isChecked(checkArr);
    console.log(checked);
  };

  useEffect(() => {
    fetchReminder();
  }, []);
  useEffect(() => {
    fetchStatus();
  }, [reminder]);

  /* const checkArr = new Array(reminder.length);

  reminder.map((rem, id) => {
    checkArr[id] = rem.Status;
  });
  isChecked(checkArr);
  const [checked, isChecked] = useState(checkArr);
  console.log(checked); */

  const checkHandler = async (id, position) => {
    console.log("Check id" + id);

    const updatedCheckedState = checked.map((item, index) => {
      return index === position ? !item : item;
    });

    isChecked(updatedCheckedState);

    await updateDoc(doc(db, `${currentUser.email}`, id), {
      Status: checked,
    });
  };

  const delReminder = async (id) => {
    console.log("Id being deleted is " + id);
    await deleteDoc(doc(db, `${currentUser.email}`, id));
  };

  return (
    <div>
      <Nav name={currentUser.email} />
      {modal && <AddReminder onConfirm={modalHandler} />}
      <div className="rem-container">
        <div className="rem-heading">
          <div style={{ width: "20%" }} className="rem-head">
            Reminder
          </div>
          <div style={{ width: "20%" }} className="rem-head">
            Date
          </div>
          <div style={{ width: " 20%" }} className="rem-head">
            Time
          </div>
          <div style={{ width: " 10%" }} className="rem-head">
            Status
          </div>
          <div style={{ width: "10%" }} className="rem-head">
            Delete
          </div>
        </div>
        <div className="display-reminder">
          {reminder.map((rem, index) => (
            <div className="rem-card">
              {/* <p>{rem.id}</p> */}
              <div key={index} style={{ width: "20%" }}>
                {rem.Name}
              </div>
              <div style={{ width: "20%" }}>{rem.Date} </div>

              <div style={{ width: "20%" }}>{rem.Time} </div>
              <input // Updating Tasks
                id={index}
                className="checkbox-custom"
                name="checkbox"
                checked={checked[index]}
                onChange={() => {
                  checkHandler(rem.id, index);
                }}
                type="checkbox"
                style={{ width: "5%" }}
              />

              <button
                onClick={() => {
                  delReminder(rem.id);
                }}
                style={{ width: "10%" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button onClick={modalHandler}> Add a Reminder</button>
      </div>
    </div>
  );
}
