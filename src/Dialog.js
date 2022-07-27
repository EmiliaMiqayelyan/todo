import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { create } from "./todoStore";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function FormDialog() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
   const [todo, setToDo] = useState({
    id: uuidv4(),
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

 const onTodoChange = (property, value)  => {
    let newEdit = { ...todo };

    newEdit[property] = value;
    setToDo(newEdit);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    dispatch(create(todo));

    setToDo({
      id: uuidv4(),
      firstName: '',
      lastName: '',
      email:'',
      phone: '',
    });

    setOpen(false);
}

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName" 
            label="First Name"
            type="firstName"
            value={todo.firstName}
            fullWidth
            variant="standard"
            onChange={(event) => onTodoChange('firstName', event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName" 
            label="Last Name"
            type="lastName"
            value={todo.lastName}
            fullWidth
            variant="standard"
            onChange={(event) => onTodoChange('lastName', event.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            value={todo.email}
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => onTodoChange('email', event.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="phone"
            value={todo.phone}
            label="Phone"
            type="phone"
            fullWidth
            variant="standard"
            onChange={(event) => onTodoChange('phone', event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
