import React, { useState } from 'react'
import './App.css';

var taskListAll = []; // All active and finished tasks list

function App() {
    const [info, setInfo] = useState(0);  // the number of all tasks
    const [task, setTask] = useState(''); // current task
    const [taskList, setTaskList] = useState([]); //array of viewed tasks
    const [taskListViewMode, setTaskListViewMode] = useState(0); // the mode of view: all, active or finished

    const inputNewTask = (ev) => {
        if (ev.keyCode === 13 && task !== '') {
            // const date = new Date()
            const newTask = {
                id: Math.floor(Math.random()*1000),
                whatToDo: task,
                isFinshed: false
            };
            taskListAll = [...taskListAll, newTask];  
            //setTaskList(taskListAll);
            setTasksView(taskListViewMode===2? 0 : taskListViewMode); 
            setTask('');
      };   
      setInfo(taskListAll.length);
  };

    const deleteTask = (id) => {
        taskListAll = taskListAll.filter((el) => el.id !== id);
        setTaskList(taskListAll);
        const inf = info - 1;
        setInfo(inf);
    };

    const setChecked = (id) => {
   //     const checkedElemInd = taskListAll.findIndex((el) => el.id === id);
   //     taskListAll[checkedElemInd].isFinshed = !taskListAll[checkedElemInd].isFinshed;
   //     setTasksView(taskListViewMode);
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

                  <button className='btn' onClick={()=>clearFinishedTasks()}>
                      Clear finished
                  </button>
            </div>

            <div>
                <input className='input-new'
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
                <div className='task-list'>
                    {taskList.map((t) => (

                        <div className={t.isFinshed ? 'task-finished' : 'task-active'}>

                            <span className='status' onClick={() => setChecked(t.id)}>
                                <img src={(t.isFinshed)? 'checked.png' : 'unchecked.png'}/>
                            </span>
                            
                            <span className='task-text'>
                                    {t.whatToDo}
                            </span>

                            <span className='del-task' onClick={()=>deleteTask(t.id)}>
                                X
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className='info'>Всего задач: <b>{info}</b></div>
        </div>
    );
};

export default App;