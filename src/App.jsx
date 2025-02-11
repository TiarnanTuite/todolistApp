import { useEffect, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css'

//main function
function App() {
  {/*declaring use states */}
  const [isCompleteScreen, setIsCompleteScreen] = useState (false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  {/*function for add button */}
  const handleAddTodo = ()=>{
      let newTodoItem = {
        title:newTitle,
        description:newDescription
      };

      {/*creating array and pushing items to the list */}
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      
      {/*storing array as a string locally */}
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr))

  };

  {/*needed to use the values stored locally*/}
  useEffect(()=>{
    {/*converting back to array*/}
    let savedTodo = JSON.parse(localStorage.getItem("todolist"))
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[]);

  return (
    <div className='App'>
      {/*Heading */}
      <h1>My Todos</h1>

      {/*making the input boxes */}
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

          {/*Buttons to switch between to do and completed */}
        <div className='bnt-area'>
          
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}
            >Todo</button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}
            >Completed</button>
        </div>
  
        <div className='todo-list'>

          {allTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            
              {/*Displaying imported icons */}
              <div>
                <MdDeleteForever className='icon'/>
                <FaCheck className="check-icon"/>
              </div>

            </div>
            )
             })}
          
        </div>
      </div>
    </div>
  );
}

export default App
