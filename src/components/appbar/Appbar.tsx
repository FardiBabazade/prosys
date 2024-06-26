import * as React from 'react';
import logo from "../../assets/prosyslogo.png";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';
import SubjectTable from '../subjectsection/SubjectTable';

import { useLocation } from 'react-router-dom';
import StudentTable from '../studentsection/StudentTable';
import ExamTable from '../examsection/ExamTable';



function Appbar() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <Grid container>
    <Grid item xs={12}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              position: 'relative',
              left: '10px',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              style={{ mixBlendMode: 'multiply', height: '80px', width: '122px' }}
              src={logo}
              alt="Logo"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Add menu items here */}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              display: { xs: 'none', md: 'flex',justifyContent:'end' },
            }}
          >
            
            {location.pathname === '/admin' &&  <h3>Register Subject</h3> }
            {location.pathname === '/exam' &&  <h3>Register Exam</h3> }
            {location.pathname === '/student' &&  <h3>Register Student</h3> }
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* Add any additional components or text on the right side */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 3 }}>
                <Avatar
                  alt="User Avatar"
                  src="https://media.licdn.com/dms/image/D4E03AQFLDQ_SE3G_jA/profile-displayphoto-shrink_800_800/0/1718239637708?e=1724889600&v=beta&t=-5uLFnzwuODSqKRLZ3_AmHfVi9UQCxpG6yUA_uN-wXg"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>

    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid justifyContent="center" alignItems="center" item xs={8}>
        <Box bgcolor="primary.dark" p={0}></Box>
        {location.pathname === '/admin' && <SubjectTable />}
        {location.pathname === '/student' && <StudentTable />}
        {location.pathname === '/exam' && <ExamTable />}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  </Grid>
    
   
  );
}
export default Appbar;
