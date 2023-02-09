import React from 'react';
import styled, { css } from 'styled-components';
import { PRIORITIES } from '../../../Constants/Priorities';
import { useDrag } from 'react-dnd';

const Card = styled.div`
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

export default function TaskCard({ task }) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'Card', //`${task.createdAt}`,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));  

  return (       
  <Card 
    ref={drag}
    priority={ task.priority } 
    isCompleted={ task.isCompleted }>
    <h4>{ task.taskName }</h4>
    <p className="duration-p">Duration: { task.duration }</p>
    <p className="priority-p">Priority: { task.priority }</p>
  </Card>
  );
}