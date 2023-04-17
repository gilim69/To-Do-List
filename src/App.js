import React, { useState } from 'react'
import './App.css';

var taskListAll = [];

function App() {
  const [info, setInfo] = useState(0);  
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [taskListViewMode, setTaskListViewMode] = useState(0);

  const inputNewTask = (ev) => {
    if (ev.keyCode === 13 && task !== '') {
        // const date = new Date()
        const newTask = {
            id: Math.floor(Math.random()*1000),
            whatToDo: task,
            isFinshed: false
        };
        taskListAll = [...taskListAll, newTask];  
        setTaskList(taskListAll);
        setTasksView(taskListViewMode); 
        setTask('');
    };   
    setInfo(taskListAll.length);
};

  const setChecked = (id) => {
      const checkedElemInd = taskList.findIndex((el) => el.id === id);
      const newTaskList = [...taskList];
      newTaskList[checkedElemInd].isFinshed = !newTaskList[checkedElemInd].isFinshed;
      setTaskList(newTaskList);
  };

  const setTasksView = (mode) => {
      setTaskListViewMode(mode);
      if (mode === 1) {
          setTaskList(taskListAll.filter((t) => !t.isFinshed));
      }
      else if (mode === 2) {
          setTaskList(taskListAll.filter((t) => t.isFinshed));
        }
      else {
          setTaskList(taskListAll);
        };
  };

  const clearFinishedTasks = () => {
      taskListAll = taskListAll.filter((t) => !t.isFinshed);
      setTaskListViewMode(0);
      setTasksView(0);
      setInfo(taskListAll.length);
    };

  return (
      <div className='container'>
          <h1>
              To Do List
          </h1>

          <div className='menu'>
                <button className={taskListViewMode===0? 'btn-disabled' : 'btn'} onClick={()=>setTasksView(0)}>
                    All Tasks
                </button>
                
                <button className={taskListViewMode===1? 'btn-disabled' : 'btn'} onClick={()=>setTasksView(1)}>
                    Active
                </button>
                
                <button className={taskListViewMode===2? 'btn-disabled' : 'btn'} onClick={()=>setTasksView(2)}>
                    Finished
                </button>

                <button onClick={()=>clearFinishedTasks()}>
                    Clear finished
                </button>
          </div>

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
          {taskList !== [] ? (
              <ul className='task-list'>
                  {taskList.map((t) => (

                       <li className={t.isFinshed ? 'task-finished' : 'task-active'}>
                          <span onClick={() => setChecked(t.id)}>
                              {(t.isFinshed)? '[ V ] ' : '[ ... ] '}
                          </span>
                          
                          <input className='what-to-do'
                              type='text'
                              id={'inp-'+t.id}
                              onChange={(ev) => setTask(ev.target.value)}
                              onKeyUp={(ev) => inputNewTask(ev)}
                              value={t.whatToDo}
                              readOnly
                          />
                      </li>
                  ))}
              </ul>
          ) : null}

          <div className='info'>Всего задач: {info}</div>
      </div>
  );
};

export default App;