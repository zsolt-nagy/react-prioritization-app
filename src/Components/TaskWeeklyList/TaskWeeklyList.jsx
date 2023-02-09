import React from 'react';
import styled, { css } from 'styled-components';
import { PRIORITIES } from '../../Constants/Priorities';
import { DAYS, getDayIndex } from '../../Constants/Days';

const TaskListContainer = styled.div`
  color: whitesmoke;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DaySwimlane = styled.div`
  width: 225px;
  margin: 0 -1px 0 0; // border-collapse
  padding-bottom: 18px;
  text-align: center;
  border: 1px solid whitesmoke;
  @media screen and (max-width: 992px) {
    width: 576px;
  }
  @media screen and (max-width: 576px) {
    width: 80%;
    min-width: 225px;
  }
`;

const DayTitle = styled.h3`
  margin: -1px -1px 0 -1px; // border-collapse 
  padding: 18px 0;
  border: 1px solid whitesmoke;
`;

const TaskCard = styled.div`
  border: 1px solid whitesmoke;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 12px;
  margin: 12px;

  ${ props => (
    props.isCompleted ? 
    css`background-color: #005700;` :
    props.priority === PRIORITIES.High ? 
    css`background-color: darkred;` : 
    props.priority === PRIORITIES.Medium ?
    css`background-color: #8b7000;` :
    props.priority === PRIORITIES.Low ?
    css`background-color: #004e7c;` :
    '' )
  }   

`;

export default function TaskWeeklyList(props) {

  function renderDailyTaskList(day) {
    const dayIndex = getDayIndex(day);
    const dailyTaskList = props.taskList[dayIndex];
    const jsxList = [];
    for (let task of dailyTaskList) {
      jsxList.push( 
        <TaskCard 
          priority={ task.priority } 
          isCompleted={ task.isCompleted }
          key={task.createdAt}>
          <h4>{ task.taskName }</h4>
          <p className="duration-p">Duration: { task.duration }</p>
          <p className="priority-p">Priority: { task.priority }</p>
        </TaskCard>
      );
    }
    return jsxList;
  }

  function renderWeek() {
    let jsxList = [];

    for (let day of DAYS) {
      jsxList.push( 
        <DaySwimlane key={day}>
          <DayTitle>{ day }</DayTitle>
          <div className="day-tasks-container">
            { renderDailyTaskList(day) }
          </div>
        </DaySwimlane> 
      );
    }
    return jsxList;
  }

  return (
    <TaskListContainer>
      <h2>Task List</h2>
      <BoardContainer>{ renderWeek() }</BoardContainer>
    </TaskListContainer>
    
  );
}
