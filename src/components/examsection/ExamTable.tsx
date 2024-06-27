import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
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
    Paper,
    IconButton
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ExamTable: React.FC = () => {
    const [lessonCode, setLessonCode] = useState('');
    const [studentNumber, setStudentNumber] = useState<number | string>('');
    const [examDate, setExamDate] = useState('');
    const [score, setScore] = useState<number | string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [exams, setExams] = useState<any[]>([]);
    const [lessons, setLessons] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        const existingExams = JSON.parse(localStorage.getItem('exams') || '[]');
        setExams(existingExams);

        const existingLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
        setLessons(existingLessons);

        const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
        setStudents(existingStudents);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const examData = {
            lessonCode,
            studentNumber,
            examDate,
            score,
        };

        let updatedExams;
        if (editIndex !== null) {
            updatedExams = exams.map((exam, index) => index === editIndex ? examData : exam);
            setAlertMessage('Successfully updated exam!');
        } else {
            updatedExams = [...exams, examData];
            setAlertMessage('Successfully registered exam!');
        }
        localStorage.setItem('exams', JSON.stringify(updatedExams));
        setExams(updatedExams);

        console.log('Exam Data:', examData);

        setOpen(true);

        setLessonCode('');
        setStudentNumber('');
        setExamDate('');
        setScore('');

        setDialogOpen(false);
        setEditIndex(null);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditIndex(null);
        setLessonCode('');
        setStudentNumber('');
        setExamDate('');
        setScore('');
    };

    const handleEdit = (index: number) => {
        const exam = exams[index];
        setLessonCode(exam.lessonCode);
        setStudentNumber(exam.studentNumber);
        setExamDate(exam.examDate);
        setScore(exam.score);
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleDelete = (index: number) => {
        const updatedExams = exams.filter((_, i) => i !== index);
        localStorage.setItem('exams', JSON.stringify(updatedExams));
        setExams(updatedExams);
        setAlertMessage('Successfully deleted exam!');
        setOpen(true);
    };

    return (
        <Container>
            <Button style={{ marginTop: '20px' }} startIcon={<AddCircleIcon />} variant="contained" color="primary" onClick={handleDialogOpen}>
                Register New Exam
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{editIndex !== null ? 'Edit Exam' : 'Register Exam'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    label="Lesson Code"
                                    value={lessonCode}
                                    onChange={(e) => setLessonCode(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    {lessons.map((lesson, index) => (
                                        <option key={index} value={lesson.lessonCode}>
                                            {lesson.lessonCode+' - '+lesson.lessonName}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    label="Student Number"
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    {students.map((student, index) => (
                                        <option key={index} value={student.studentNumber}>
                                            {student.studentNumber}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Exam Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={examDate}
                                    onChange={(e) => setExamDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Score"
                                    type="number"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {editIndex !== null ? 'Update Exam' : 'Register Exam'}
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
                            <TableCell style={{ fontWeight: 'bold' }}>Lesson Code</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Student Number</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Exam Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Score</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.map((exam, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ textAlign: 'center' }}>{exam.lessonCode}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{exam.studentNumber}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{exam.examDate}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{exam.score}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <IconButton style={{color:'#1976d2'}} onClick={() => handleEdit(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton style={{color:'#c90d0d'}} onClick={() => handleDelete(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ExamTable;
