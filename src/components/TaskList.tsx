import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { WatchIgnorePlugin } from 'webpack';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    let max = 1;
    if(tasks.length > 0){
      max = tasks[tasks.length-1].id + 1;
    }
    const data = {
      id: max,
      title: newTaskTitle,
      isComplete: false
    }
    if(data.title != ''){
      //adicionando mais um elemento em um array existente, mesmo que um push();
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });

    const tempTasks = [...tasks];    
    tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;
    setTasks(tempTasks);
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}