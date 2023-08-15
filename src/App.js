import React, { useState, useEffect } from 'react';
import Input from './Components/InputField';
import { format } from 'date-fns';
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import Enteries from './Components/Enteries'; // Make sure to import Enteries

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Items"), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => {
        const timestamp = doc.data().timestamp; // Assuming the field is named "timestamp"
        const formattedTimestamp = timestamp
          ? format(timestamp.toDate(), 'dd-MMM-yyyy') // Use your desired format
          : '';
  
        return {
          id: doc.id,
          todo: doc.data().todos,
          timestamp: formattedTimestamp,
        };
      });

       // Remove duplicates based on the 'todo' property
       const uniqueTodosData = todosData.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.todo.toLowerCase() === item.todo.toLowerCase())
      );

      setTodos(uniqueTodosData);
    });
    
    return () => unsubscribe();
  }, []);

 
    

  return (
    <div className="bg-[#350435] h-screen p-3 flex">
      <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
        <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">
          ToDo List
        </h1>
        <Input  todos={todos}/>
        <Enteries data={todos}  />
      </div>
    </div>
  );
}

export default App;


// const getLocalItems = () => {
//   const list = localStorage.getItem('lists');

//   if (list) {
//     return JSON.parse(list);
//   } else {
//     return [];
//   }
// };

// function App() {
//   const [todos, setTodos] = useState(getLocalItems());

//   useEffect(() => {
//     localStorage.setItem('lists', JSON.stringify(todos));
//   }, [todos]);

//   const removeToDO = (id) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(newTodos);
//   };

//   const updateTodo = (id, updatedItem) => {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, item: updatedItem } : todo
//     );
//     setTodos(updatedTodos);
//   };

//   const addToDoHandler = useCallback(
//     (item) => {
//       setTodos([
//         ...todos,
//         {
//           item,
//           time: new Date().toLocaleDateString(),
//           id: Date.now(),
//         },
//       ]);
//     },
//     [todos]
//   );

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Enter' && event.target.value.trim() !== '') {
//         addToDoHandler(event.target.value);
//         event.target.value = '';
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [addToDoHandler]);

//   // useEffect(() => {
//   //   const updateTodos = todos.filter(
//   //     (todo, index) => index === todos.findIndex((t) => t.item === todo.item)
//   //   );
//   //   setTodos(updateTodos);
//   // }, []);

//   useEffect(() => {
//     const updateTodos = todos.filter(
//       (todo, index) => index === todos.findIndex((t) => t.item === todo.item)
//     );
    
//     if (updateTodos.length !== todos.length) {
//       setTodos(updateTodos);
//     }
//   }, [todos]);
  

//   return (
//     <div className="bg-[#350435] h-screen p-3 flex">
//       <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
//         <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">
//           ToDo List
//         </h1>
//         <Input handler={addToDoHandler} />
//         {/* <Enteries data={todos} removeHandler={removeToDO} updateTodo={updateTodo} /> */}
//       </div>
//     </div>
//   );
// }


// export default App;

// import Input from "./Components/InputField";
// import Enteries from "./Components/Enteries";
// import React, {useState, useEffect, useCallback} from 'react'

// // Get data from local storage
// const getLocalItems = () =>{
//   let list = localStorage.getItem('lists');

//   if (list) {
//     return JSON.parse(localStorage.getItem('lists'));
//   } else {
//     return [];
//   }
// }

// function App() {
//   const [todos,setTodos] = useState(getLocalItems());

//   // Set Data From Local Storage
//   useEffect(() => {
//     localStorage.setItem('lists',JSON.stringify(todos))
// }, [todos]);

// // Remove Item Functionality
// const removeToDO = (id) => {
//   const newTodos = todos.filter((todo) => todo.id !== id);
//   setTodos(newTodos);

// };

//   //Edit functionality
//   const updateTodo = (id, updatedItem) => {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, item: updatedItem } : todo
//     );
//     setTodos(updatedTodos);
//   };

//   // Add Item Functionality
//   const addToDoHandler = (item) => {

//     setTodos(
//       [...todos,
//         {
//           item,
//           time: new Date().toLocaleDateString(),
//           id: Date.now()
//         }
//       ]
//     )

//   }
//   // Enter Event Handler
//   // const handleKeyPress = (event) => {
//     // if(event.key === "Enter"){
//     //   addToDoHandler(event.target.value);
//     //   event.target.value = "";
//     // }

//   //   if (event.key === "Enter" && event.target.value.trim() !== '') {
//   //     addToDoHandler(event.target.value);
//   //     event.target.value = '';
//   //   }

//   // }
//   // useEffect(() => {
//   //   window.addEventListener("keydown", handleKeyPress);
//   //   return () => {
//   //     window.removeEventListener("keydown",handleKeyPress)
//   //   };
//   // }, [todos]);

//   // useEffect(() => {
//   //   window.addEventListener("keydown", handleKeyPress);
//   //   return () => {
//   //     window.removeEventListener("keydown", handleKeyPress);
//   //   };
//   // }, []);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Enter" && event.target.value.trim() !== "") {
//         addToDoHandler(event.target.value);
//         event.target.value = "";
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [addToDoHandler]);

//   // Duplicate Enteries remove

//   useEffect(() => {
//     const updateTodos = todos.filter((todo, index) =>
//     index === todos.findIndex(t => t.item === todo.item)
//     );

//     setTodos(updateTodos);
//   }, [todos]);

//   // useEffect(() => {
//     //   const updatedTodos = todos.filter((todo, index) =>
//     //     index === todos.findIndex(t => t.item === todo.item)
//     //   );
//     //   setTodos(updatedTodos);
//     // }, []);

//     return (
//     <div className="bg-[#350435] h-screen p-3 flex">
//       <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
//         <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">ToDo List </h1>
//         <Input handler = {addToDoHandler} />
//         <Enteries data = {todos} removeHandler={removeToDO} updateTodo= {updateTodo}/>

//       </div>
//     </div>
//   );

// }
//   export default App;
