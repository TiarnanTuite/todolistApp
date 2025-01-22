import { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css'

//main function
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState (false);
  return (
    <div className='App'>
      {/*Heading */}
      <h1>My Todos</h1>

      {/*making the input boxes */}
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" placeholder="What's the task title?"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" placeholder="What's the task description?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primaryBtn'>Add</button>
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
            onClick={() => setIsCompleteScreen (true)}>Completed</button>
        </div>
  
        <div className='todo-list'>

          <div className='todo-list-item'>
            <div>
              <h3>Task 1</h3>
              <p>Description</p>
            </div>
          

            {/*Displaying imported icons */}
            <div>
              <MdDeleteForever className='icon'/>
              <FaCheck className="check-icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
