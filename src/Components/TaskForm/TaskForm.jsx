import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 2rem;
  padding: 1rem;
  border: 3px double whitesmoke;
`;

export default function TaskForm() {
  const [taskName, setTaskName] = React.useState('');
  const [duration, setDuration] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // document.querySelector('[name=task-name]').value
    alert(taskName);

  }

  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Form>
        <FormGroup floating>
          <Input 
            id="task-name" 
            name="task-name" 
            placeholder="Task name" 
            type="text" 
            value={taskName}
            onChange={handleTaskNameChange}></Input>
          <Label htmlFor="task-name">Task name</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="duration"
            name="duration"
            placeholder="Duration"
            type="text"
            value={duration} 
            onChange={handleDurationChange}></Input>
          <Label htmlFor="duration">Duration</Label>            
        </FormGroup>    
        <FormGroup>
          <Label htmlFor="priority" className="text-light">Priority</Label>
          <Input
            id="priority"
            name="priority"
            type="select"
            placeholder="Priority"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Input>  
        </FormGroup>  
        <FormGroup>
          <Label htmlFor="day" className="text-light">Day</Label>
          <Input
            id="day"
            name="day"
            type="select"
            placeholder="Day"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </Input>  
        </FormGroup>         
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
}
