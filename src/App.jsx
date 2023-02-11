import './App.css';
import React, { useState } from 'react';
import Footer from './Components/Footer/Footer';
import TaskForm from './Components/TaskForm/TaskForm';
import TaskWeeklyList from './Components/TaskWeeklyList/TaskWeeklyList';
import { PRIORITIES } from './Constants/Priorities';
import { getDayIndex } from './Constants/Days';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [draggedCard, setDraggedCard] = useState(null);
  const [taskList, setTaskList] = useState([
    [{
      taskName: 'Learning React',
      duration: '2 hours',
      priority: PRIORITIES.High,
      isCompleted: false,
      createdAt: 1675904343555
    }],
    [],
    [{
      taskName: 'Leetcode exercise in Python',
      duration: '30 minutes',
      priority: PRIORITIES.Medium,
      isCompleted: false,
      createdAt: 1675904412722
    },
    {
      taskName: 'React project state management',
      duration: '4 hours',
      priority: PRIORITIES.Low,
      isCompleted: false,
      createdAt: 1675904412725
    },
    {
      taskName: 'Experiment with Styled Components',
      duration: '1 hour',
      priority: PRIORITIES.Low,
      isCompleted: true,
      createdAt: 1675904412729
    }],
    [],
    []
  ]);
  const draggedCardRef = React.useRef();
  draggedCardRef.current = draggedCard;

  const insertItem = (newInsertion) => {
    const dayIndex = getDayIndex(newInsertion.position);
    setTaskList(oldTaskList => {
      const newTaskList = [...oldTaskList];
      newTaskList[dayIndex].push(newInsertion.item);
      return newTaskList;
    });
  }

  const handleDrop = (targetDay) => {
    console.log(draggedCardRef.current, taskList, targetDay);
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Prioritization {draggedCard}</h1>
      </header>
      <main>
        <TaskForm insertItem={insertItem} />
        <DndProvider backend={HTML5Backend}>
          <TaskWeeklyList 
            taskList={taskList} 
            setDraggedCard={setDraggedCard}
            handleDrop={handleDrop} />
        </DndProvider>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
