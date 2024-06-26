import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';


// function Alert(props: AlertProps) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const SubjectTable: React.FC = () => {
    const [lessonCode, setLessonCode] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [classNumber, setClassNumber] = useState<number | string>('');
    const [teacherFirstName, setTeacherFirstName] = useState('');
    const [teacherLastName, setTeacherLastName] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

  


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

        // Log to console (optional)
        console.log('Lesson Data:', lessonData);

        // Show success alert
  
        setAlertMessage('Successfully added Subjects!');
      setOpen(true);

        // Clear form fields
        setLessonCode('');
        setLessonName('');
        setClassNumber('');
        setTeacherFirstName('');
        setTeacherLastName('');

       
    };

    return (
        <Container>
            <Typography style={{margin:'50px 10px'}} variant="h4" gutterBottom>
                Register Lesson
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Lesson Code"
                            value={lessonCode}
                            onChange={(e) => setLessonCode(e.target.value)}
                            inputProps={{ maxLength: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Lesson Name"
                            value={lessonName}
                            onChange={(e) => setLessonName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Class Number"
                            type="number"
                            value={classNumber}
                            onChange={(e) => setClassNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Teacher First Name"
                            value={teacherFirstName}
                            onChange={(e) => setTeacherFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Teacher Last Name"
                            value={teacherLastName}
                            onChange={(e) => setTeacherLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{width:'100%'}} type="submit" variant="contained" color="primary">
                            Register Lesson
                        </Button>
                    </Grid>
                </Grid>
            </form>
           
              <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        </Container>
    );
};

export default SubjectTable;
