
import React, { useEffect, useRef, useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore"; // Add this line for the query-related functions

// import firebase from 'firebase';

export default function Input(props) {
  const[todos, setTodos] = useState("");
  
  const trimmedTodo = todos.trim();

  const addToDoHandler = async (event) => {
    event.preventDefault();
    if (trimmedTodo !== "") { // Check if todo is not empty or just whitespace
      try {
        // Check if the todo already exists in the database before adding
        const todoExistsQuery = query(collection(db, "Items"), where("todos", "==", todos.trim()));
        const snapshot = await getDocs(todoExistsQuery);

        if (snapshot.empty) {
          await addDoc(collection(db, "Items"), {
            todos: todos.trim(),
            timestamp: serverTimestamp(),
          });
          setTodos("");
        } else {
          // Todo already exists, show a message or handle accordingly
          console.log("Todo already exists:", todos.trim());
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  
    // to remove duplicate entries
    // if (!props.data.some((entry) => entry.todo === todos)) {
    //   setTodos("");
    // }
  }


  // Ref use as a ID in react
  const inputBox = useRef();
  // const AddEnteries = () =>{
    
  //   if(inputBox.current.value.trim() !== ""){
  //   props.handler(inputBox.current.value)
  //       inputBox.current.value = "";
  //   }
  // }

   // add entries when enter key press
   const handleKeyDown = (event) => {
    if (event.key === "Enter" && todos.trim() !== "") {
      event.preventDefault();
      addToDoHandler(event); // Invoke addToDoHandler with the event object
    }
  };

  return (
    <div className='p-3 flex justify-around'>
      <form className='w-[100%]' >
      <input type="text" name="text" id="text" placeholder='Enter Data Here ...' 
      className='p-2 pr-2 text-sm border-[#D70FC6] bg-[#FFE6FC] w-[97%]
       focus:bg-[#FDF3FD] 
      focus:outline-none blur:bg-[#FFE6FC] sm:p-3 border sm:text-xl'  ref={inputBox} 
      value={todos}
      onChange={(e) => setTodos(e.target.value)}
      onKeyDown={handleKeyDown}
      /></form>
    
      <div className='cursor-pointer w-[40px] h-[40px] bg-[#D70FC6] text-white
       rounded-[100%] flex justify-center items-center sm:w-[50px] 
       sm:h-[50px]' onClick={addToDoHandler}>
      <i className="fa-solid fa-plus sm:fa-2xl"></i>
      </div>
    </div>
    
  )
}
