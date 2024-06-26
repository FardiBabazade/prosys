// src/StudentTable.tsx

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid
} from '@mui/material';

interface Student {
  number: number;
  name: string;
  surname: string;
  class: number;
}

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({ number: 0, name: '', surname: '', class: 0 });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({ number: 0, name: '', surname: '', class: 0 });
    setOpen(false);
  };

  return (
    <>
      <Button style={{margin:'50px 0 30px 0'}} variant="contained" color="primary" onClick={handleClickOpen}>
        Add Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="number"
                name="number"
                label="Student Number"
                type="number"
                fullWidth
                variant="outlined"
                value={newStudent.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newStudent.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="surname"
                name="surname"
                label="Surname"
                type="text"
                fullWidth
                variant="outlined"
                value={newStudent.surname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="class"
                name="class"
                label="Class"
                type="number"
                fullWidth
                variant="outlined"
                value={newStudent.class}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStudent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer style={{width:'80%',margin:'0 auto'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign:'center'}}>Number</TableCell>
              <TableCell style={{textAlign:'center'}}>Name</TableCell>
              <TableCell style={{textAlign:'center'}}>Surname</TableCell>
              <TableCell style={{textAlign:'center'}}>Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.number}>
                <TableCell>{student.number}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.surname}</TableCell>
                <TableCell>{student.class}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentTable;
