import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Student {
    studentNumber: string;
    studentName: string;
    studentSurname: string;
    studentClass: number | string;
}

const SubjectTable: React.FC = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentSurname, setStudentSurname] = useState('');
    const [studentClass, setStudentClass] = useState<number | string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
        setStudents(existingStudents);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        if (!studentNumber || !studentName || !studentSurname || !studentClass) {
            alert('Please fill out all fields.');
            return;
        }

        // Create student data object
        const studentData: Student = {
            studentNumber,
            studentName,
            studentSurname,
            studentClass,
        };

        // Save student data to localStorage
        const updatedStudents = [...students, studentData];
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudents(updatedStudents);

        // Show success alert
        setAlertMessage('Successfully registered student!');
        setOpen(true);

        // Clear form fields
        setStudentNumber('');
        setStudentName('');
        setStudentSurname('');
        setStudentClass('');

        // Close dialog
        setDialogOpen(false);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <Container>
          
            <Button style={{marginTop:'100px'}} startIcon={<AddCircleIcon />} variant="contained" color="primary" onClick={handleDialogOpen}>
                Register New Student
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Register Student</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Student Number"
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Student Name"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Student Surname"
                                    value={studentSurname}
                                    onChange={(e) => setStudentSurname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Student Class"
                                    type="number"
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Register Student
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Student Number</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Student Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Student Surname</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Student Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ textAlign: 'center' }}>{student.studentNumber}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{student.studentName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{student.studentSurname}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{student.studentClass}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default SubjectTable;
