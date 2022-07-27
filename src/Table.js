import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { remove } from "./todoStore";
import { useDispatch } from 'react-redux';
import { edit } from "./todoStore";
import { useState } from "react";

export default function BasicTable() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.value);

  const [open, setOpen] = useState(false);
   const [todo, setToDo] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
  });

  const onEdit = (editedToDo) => {
    setOpen(true)
    setToDo(editedToDo)
  }

  const onTodoChange = (property, value)  => {
    let newEdit = { ...todo };

    newEdit[property] = value;
    setToDo(newEdit);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    dispatch(edit(todo));;

    setToDo({
      id: '',
      firstName: '',
      lastName: '',
      email:'',
      phone: '',
    });

    setOpen(false);
}

  const onRemove = (id) => {
    dispatch(remove(id));
  }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map(todo => (
            <TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {todo.firstName}
              </TableCell>
              <TableCell align="right">{todo.lastName}</TableCell>
              <TableCell align="right">{todo.email}</TableCell>
              <TableCell align="right">{todo.phone}</TableCell>
              <TableCell align="right"> <Button variant="contained" size="small" onClick={() => onEdit(todo)}>Edit</Button></TableCell>
              <TableCell align="right"> <Button variant="contained" size="small" onClick={() => onRemove(todo.id)}>Remove</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    <Dialog open={open}>
        <DialogTitle>Edit Todo</DialogTitle>
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
