import React, { useState } from 'react'
import './App.css';

function App() {
  const [info, setInfo] = useState(null);  // for helping staff output
  const [task, setTask] = useState('');
  const [tasklist, setTaskList] = useState([]);

  const newTask = () => {    
      if (task !== '') {
          const date = new Date();
          const newTask = {
              id: Math.floor(Math.random()*1000),
              whatToDo: task,
              isFinshed: false,
          };
          setTaskList([...tasklist, newTask]); 
          setTask('');        
      }
  };

  const inputNewTask = (ev) => {
    setInfo(ev.keyCode);
    if (ev.keyCode == 13) {
        newTask();
        ev.target.value='';
    }
    setTask(ev.target.value);
};

  const setChecked = (id) => {
    setInfo(id.toString());
    const checkedElemInd = tasklist.findIndex((el) => el.id === id);
    const newTaskList = [...tasklist];
    newTaskList[checkedElemInd].isFinshed = !newTaskList[checkedElemInd].isFinshed;
    setTaskList(newTaskList);
  };

  const clearFinishedTasks = () => {
      setTaskList(tasklist.filter((t) => !t.isFinshed));
    };

  return (
      <div className='container'>
          <h1>
              To Do List
          </h1>
          <div>
              <input className='input-new-task'
                  type='text'
                  id='text-of-new-task'
                  onChange={(ev) => setTask(ev.target.value)}
                  onKeyUp={(ev) => inputNewTask(ev)}
                  value={task}
                  placeholder='Add new task...'
              />
          </div>

          <br />
          {tasklist !== [] ? (
              <ul className='task-list'>
                  {tasklist.map((t) => (

                       <li className={t.isFinshed ? 'task-finished' : 'task-active'}>
                          <span onClick={() => setChecked(t.id)}>
                              {(t.isFinshed)? '[ V ] ' : '[ ... ] '}
                          </span>
                          <div>{t.whatToDo}</div>
                      </li>
                  ))}
              </ul>
          ) : null}
          <div className='footer'>
              <button className='del-btn' onClick={clearFinishedTasks}>
                  Clear finished
              </button>
          </div>
          <p></p>
          <p></p>
          <div>{info}</div>
      </div>
  );
}

export default App;