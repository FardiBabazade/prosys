import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CreateIcon from '@mui/icons-material/Create';


export default function Sidebar() {
    return (


        <Box sx={{
            width: 250, height: '100vh', backgroundColor: '#1976d2',
            color: '#fff'
        }} >

            <List >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonOutlineIcon style={{fill:'#fff'}} />
                        </ListItemIcon>
                        <ListItemText >Students</ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ImportContactsIcon  style={{fill:'#fff'}} />
                        </ListItemIcon >
                        <ListItemText >Subjects</ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CreateIcon  style={{fill:'#fff'}} />
                        </ListItemIcon>
                        <ListItemText >Exams</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}
