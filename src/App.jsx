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

  /********************************HELPER FUNCTIONS****************************/
  // helper function for handleDrop, deletion, and completion
  const findItemByCreatedAt = (createdAt, taskList) => {
    for (let i = 0; i < taskList.length; i++) {
      let dayList = taskList[i];
      for (let j = 0; j < dayList.length; j++) {
        let task = dayList[j];
        if (String(task.createdAt) === String(createdAt)) {
          return { 
            item: task,
            dayIndex: i, 
            taskIndex: j
          };
        }
      }
    }
    return {
      item: null,
      dayIndex: -1
    };
  }

  // helper function for handleDrop
  const deleteItemFromDayList = (dayList, item) => 
    dayList.filter(task => task !== item);

  /********************************INSERTION***********************************/
  const insertItem = (newInsertion) => {
    const dayIndex = getDayIndex(newInsertion.position);
    setTaskList(oldTaskList => {
      const newTaskList = [...oldTaskList];
      newTaskList[dayIndex].push(newInsertion.item);
      return newTaskList;
    });
  }

  /********************************DRAG'N'DROP*********************************/
  const handleDrop = (targetDay) => {
    setTaskList(oldTaskList => {
      let newTaskList = [...oldTaskList];
      const { item, dayIndex } = findItemByCreatedAt(draggedCardRef.current, newTaskList);
      if (item === null) {
        return oldTaskList;
      }
      newTaskList[dayIndex] = deleteItemFromDayList(newTaskList[dayIndex], item);
      const targetDayIndex = getDayIndex(targetDay);
      newTaskList[targetDayIndex].push(item);
      return newTaskList;
    });
  }

  /*******************************COMPLETION***********************************/
  const handleComplete = (itemCreatedAt) => {
    setTaskList(oldTaskList => {
      // We need deep cloning, because if we change an item
      // of newItems, without cloning the inner content, the
      // changes will be reflected in the oldItems array too.
      // In Strict Mode, React calls this setter twice with
      // the same oldItems value. If we cange the oldItems
      // value though, the second call will be based on the
      // changed oldItems value, which results in double
      // negation in this case.
      const newTaskList = structuredClone(oldTaskList);
      const { item } = findItemByCreatedAt(itemCreatedAt, newTaskList);
      if (item === null) {
        return oldTaskList;
      }      
      item.isCompleted = !(item.isCompleted);
      return newTaskList;
    });
  }

  /*******************************MOVE*****************************************/
  // direction: -1 is up, +1 is down
  const handleMove = (itemCreatedAt, direction) => {
    setTaskList(oldTaskList => {
      const newTaskList = [...oldTaskList];
      const {item, dayIndex, taskIndex} = findItemByCreatedAt(itemCreatedAt, newTaskList);
      if (
        item === null ||  // impossible if the code is used properly
        (taskIndex === 0 && direction === -1) || // we can't move up 
        (taskIndex >= newTaskList[dayIndex].length - 1 && direction === 1)) {  // we can't move down
        return oldTaskList;
      }
      let otherIndex = taskIndex + direction;
      let swap = newTaskList[dayIndex][taskIndex];
      newTaskList[dayIndex][taskIndex] = newTaskList[dayIndex][otherIndex];
      newTaskList[dayIndex][otherIndex] = swap;
      return newTaskList;
    });
  }


  /*******************************DELETION*************************************/
  const handleDelete = (itemCreatedAt) => {
    setTaskList(oldTaskList => {
      const newTaskList = [...oldTaskList];
      const { item, dayIndex } = findItemByCreatedAt(itemCreatedAt, newTaskList);
      if (item === null) {
        return oldTaskList;
      }      
      newTaskList[dayIndex] = deleteItemFromDayList(newTaskList[dayIndex], item);
      return newTaskList;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prioritization</h1>
      </header>
      <main>
        <TaskForm insertItem={insertItem} />
        <DndProvider backend={HTML5Backend}>
          <TaskWeeklyList 
            taskList={taskList} 
            setDraggedCard={setDraggedCard}
            handleDrop={handleDrop} 
            handleComplete={handleComplete} 
            handleDelete={handleDelete}
            handleMove={handleMove} />
        </DndProvider>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
