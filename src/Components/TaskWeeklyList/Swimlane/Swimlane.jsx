import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const DayTitle = styled.h3`
  margin: -1px -1px 0 -1px; // border-collapse 
  padding: 18px 0;
  border: 1px solid whitesmoke;
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

export default function Swimlane({ day, dailyTaskList }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'Card',
        drop: () => console.log('DROP'),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }), [])



    function renderDailyTaskList(day) {
        const jsxList = [];
        for (let task of dailyTaskList) {
          jsxList.push( <TaskCard task={task} key={task.createdAt} /> );
        }
        return jsxList;
    }

    return (
        <DaySwimlane>
          <DayTitle>{ day }</DayTitle>
          <div className="day-tasks-container" ref={drop}>
            { renderDailyTaskList(day) }
          </div>
        </DaySwimlane> 
    );

}