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
    await getDocs(collection(db, `${currentUser.email}`)).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReminder(newData);
        console.log(reminder, newData);
      }
    );

    //const checkArr = new Array(reminder.length);

    reminder.map((rem, id) => {
      checkArr[id] = rem.Status;
    });
    isChecked(checkArr);
    //const [checked, isChecked] = useState(checkArr);
    console.log(checked);
  };
  useEffect(() => {
    fetchReminder();
  }, []);

  const checkArr = new Array(reminder.length);

  reminder.map((rem, id) => {
    checkArr[id] = rem.Status;
  });
  isChecked(checkArr);
  //const [checked, isChecked] = useState(checkArr);
  console.log(checked);
  const handleCheckedChange = async (id, ind) => {
    await updateDoc(doc(db, `${currentUser.email}`, id), {
      Status: checked,
    });

    console.log("Check id" + id);
    /* const updatedCheckedState = checked.map((item, index) => {
      index === ind ? !item : item;
    }); 

    isChecked(updatedCheckedState);*/
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
        {reminder.map((rem, id) => (
          <>
            <p>{rem.id}</p>
            <p key={id}>{rem.Name}</p>
            <p>{rem.Date} </p>
            <p>{rem.Status}</p>
            <p>{rem.Time} </p>
            <input
              id={id}
              className="checkbox-custom"
              name="checkbox"
              checked={checked[id]}
              onChange={() => {
                handleCheckedChange(rem.id, id);
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
