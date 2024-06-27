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
    IconButton,
    Box
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SubjectTable: React.FC = () => {
    const [lessonCode, setLessonCode] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [classNumber, setClassNumber] = useState<number | string>('');
    const [teacherFirstName, setTeacherFirstName] = useState('');
    const [teacherLastName, setTeacherLastName] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [lessons, setLessons] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        const existingLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
        setLessons(existingLessons);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const lessonData = {
            lessonCode,
            lessonName,
            classNumber,
            teacherFirstName,
            teacherLastName,
        };

        let updatedLessons;
        if (editIndex !== null) {
            updatedLessons = lessons.map((lesson, index) => index === editIndex ? lessonData : lesson);
            setAlertMessage('Successfully updated Subject!');
        } else {
            updatedLessons = [...lessons, lessonData];
            setAlertMessage('Successfully added Subject!');
        }
        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        setLessons(updatedLessons);

        console.log('Lesson Data:', lessonData);

        setOpen(true);

        setLessonCode('');
        setLessonName('');
        setClassNumber('');
        setTeacherFirstName('');
        setTeacherLastName('');

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
        setLessonName('');
        setClassNumber('');
        setTeacherFirstName('');
        setTeacherLastName('');
    };

    const handleEdit = (index: number) => {
        const lesson = lessons[index];
        setLessonCode(lesson.lessonCode);
        setLessonName(lesson.lessonName);
        setClassNumber(lesson.classNumber);
        setTeacherFirstName(lesson.teacherFirstName);
        setTeacherLastName(lesson.teacherLastName);
        setEditIndex(index);
        setDialogOpen(true);
    };

    const handleDelete = (index: number) => {
        const updatedLessons = lessons.filter((_, i) => i !== index);
        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        setLessons(updatedLessons);
        setAlertMessage('Successfully deleted Subject!');
        setOpen(true);
    };

    return (
        <Container>
            <Button style={{ marginTop: '20px' }} startIcon={<AddCircleIcon />} variant="contained" color="primary" onClick={handleDialogOpen}>
                Register New Subject
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{editIndex !== null ? 'Edit Subject' : 'Register Subject'}</DialogTitle>
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
                            {editIndex !== null ? 'Update Subject' : 'Register Subject'}
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
                            <TableCell style={{ fontWeight: 'bold' }}>Lesson Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Class Number</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Teacher First Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Teacher Last Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ textAlign: 'center' }}>{lesson.lessonCode}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{lesson.lessonName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{lesson.classNumber}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{lesson.teacherFirstName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{lesson.teacherLastName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <Box display="flex" justifyContent="center">
                                        <IconButton style={{color:'#1976d2'}} onClick={() => handleEdit(index)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton style={{color:'#c90d0d'}} onClick={() => handleDelete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default SubjectTable;
