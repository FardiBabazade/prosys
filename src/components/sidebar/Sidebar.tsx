import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';



export default function Sidebar() {
    return (

        <Box sx={{
            width: 203, height: '92vh', position: 'absolute', top: '80px', backgroundColor: '#1976d2',
            color: '#fff'
        }} >

            <List >


                <ListItem disablePadding>
                    <Link to="/admin">
                        <ListItemButton>
                            <ListItemIcon>
                                <ImportContactsIcon style={{ fill: '#fff' }} />
                            </ListItemIcon >
                            <ListItemText >Subjects</ListItemText>
                        </ListItemButton>
                    </Link>

                </ListItem>
                <ListItem disablePadding>
                <Link to="/student">
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonOutlineIcon style={{ fill: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText >Students</ListItemText>
                    </ListItemButton>
                    </Link>

                </ListItem>


                <ListItem disablePadding>
                <Link to="/exam">

                    <ListItemButton>
                        <ListItemIcon>
                            <CreateIcon style={{ fill: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText >Exams</ListItemText>
                    </ListItemButton>
                    </Link>


                    
                </ListItem>

                
                <ListItem disablePadding>
                <Link to="/">

                    <ListItemButton style={{position:'fixed',bottom:'30px'}}>
                        <ListItemIcon>
                            <LogoutIcon style={{ fill: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText >Log out</ListItemText>
                    </ListItemButton>
                    </Link>
                    
                </ListItem>
            </List>
        </Box>
    );
}
