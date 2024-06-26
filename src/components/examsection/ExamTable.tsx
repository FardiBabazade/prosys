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


const ExamTable: React.FC = () => {
    const [lessonCode, setLessonCode] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [classNumber, setClassNumber] = useState<number | string>('');
    const [teacherFirstName, setTeacherFirstName] = useState('');
    const [teacherLastName, setTeacherLastName] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        const existingLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
        setLessons(existingLessons);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create lesson data object
        const lessonData = {
            lessonCode,
            lessonName,
            classNumber,
            teacherFirstName,
            teacherLastName,
        };

        // Save lesson data to localStorage
        const existingLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
        const updatedLessons = [...existingLessons, lessonData];
        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        setLessons(updatedLessons);

        // Log to console (optional)
        console.log('Lesson Data:', lessonData);

        // Show success alert
        setAlertMessage('Successfully added Subject!');
        setOpen(true);

        // Clear form fields
        setLessonCode('');
        setLessonName('');
        setClassNumber('');
        setTeacherFirstName('');
        setTeacherLastName('');

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
           
            <Button style={{marginTop:'100px'}} startIcon={<AddCircleIcon   />} variant="contained" color="primary" onClick={handleDialogOpen}>
            Register New Exam
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Register Subject</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Lesson Code"
                                    value={lessonCode}
                                    onChange={(e) => setLessonCode(e.target.value)}
                                    inputProps={{ maxLength: 3 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Lesson Name"
                                    value={lessonName}
                                    onChange={(e) => setLessonName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Class Number"
                                    type="number"
                                    value={classNumber}
                                    onChange={(e) => setClassNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Teacher First Name"
                                    value={teacherFirstName}
                                    onChange={(e) => setTeacherFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Teacher Last Name"
                                    value={teacherLastName}
                                    onChange={(e) => setTeacherLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Register Lesson
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
                            <TableCell  style={{fontWeight:'bold'}}>Lesson Code</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Lesson Name</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Class Number</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Teacher First Name</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Teacher Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson, index) => (
                            <TableRow key={index}>
                                <TableCell style={{textAlign:'center'}}>{lesson.lessonCode}</TableCell>
                                <TableCell style={{textAlign:'center'}}>{lesson.lessonName}</TableCell>
                                <TableCell style={{textAlign:'center'}}>{lesson.classNumber}</TableCell>
                                <TableCell style={{textAlign:'center'}}>{lesson.teacherFirstName}</TableCell>
                                <TableCell style={{textAlign:'center'}}>{lesson.teacherLastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ExamTable;
