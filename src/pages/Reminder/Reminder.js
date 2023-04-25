import React, { useState, useEffect } from "react";
import AddReminder from "../../components/AddReminder/AddReminder";

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
      {/* {console.log(modal)} */}
      <h3> Welcome, {currentUser.email}</h3>
      {modal && <AddReminder onConfirm={modalHandler} />}
      <h2> This is the Reminder Page</h2>
      <div className="display-reminder">
        {reminder.map((rem, index) => (
          <>
            <p>{rem.id}</p>
            <p key={index}>{rem.Name}</p>
            <p>{rem.Date} </p>
            <p>{rem.Status}</p>
            <p>{rem.Time} </p>
            <input // Updating Tasks
              id={index}
              className="checkbox-custom"
              name="checkbox"
              checked={checked[index]}
              onChange={() => {
                checkHandler(rem.id, index);
              }}
              type="checkbox"
            />

            <button
              onClick={() => {
                delReminder(rem.id);
              }}
            >
              Delete
            </button>
          </>
        ))}
      </div>
      <button onClick={modalHandler}> Add a Reminder</button>
    </div>
  );
}
