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
  const [completedTodos, setCompletedTodos] = useState ([]);

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

  {/*function to delete to dos removing them from the page and local storage */}
  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos]
    //add a 1 after index to prevent the whole list from deleting
    reducedTodo.splice(index, 1)

    {/*removing locally and setting the todo list to the new version with the selected deletion removed */}
    localStorage.setItem("todolist", JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }

  const handleCompleteTodo = (index)=>{
    
    //variables for displaying time of completion
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
       ...allTodos[index],
       completedOn:completedOn
    }
  
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    // calls delete function to remove from todos after adding to complete tab
    handleDeleteTodo(index);

    {/*storing array as a string locally */}
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr))

  }

  const handleDeleteCompleteTodo = ((index)=>{
    let reducedTodo = [...completedTodos]
    //add a 1 after index to prevent the whole list from deleting
    reducedTodo.splice(index, 1)

    {/*removing locally and setting the completed list to the new version with the selected deletion removed */}
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
   
  });

  {/*needed to use the values stored locally*/}
  useEffect(()=>{
    {/*converting back to array*/}
    let savedTodo = JSON.parse(localStorage.getItem("todolist"))
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"))
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);

  return (
    <div className='App'>
      {/*Heading */}
      <h1>My Todo List</h1>

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

          {/*to do screen */}
          {isCompleteScreen == false && allTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            
              {/*Displaying imported icons */}
              <div>
                <MdDeleteForever className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
                <FaCheck className="check-icon" onClick={()=>handleCompleteTodo(index)} title="Complete?"/>
              </div>

            </div>
            )
             })}
          
          {/*Completed screen */}
          {isCompleteScreen == true && completedTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed On: {item.completedOn}</small></p>
              </div>
            
              {/*Displaying imported icons */}
              <div>
                <MdDeleteForever className='icon' onClick={()=>handleDeleteCompleteTodo(index)} title="Delete?"/>
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
