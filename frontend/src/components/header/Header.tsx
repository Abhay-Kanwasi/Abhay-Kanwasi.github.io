import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; 
import { toggleTheme } from '../../store/theme/themeReducer'; 
import NotesIcon from '@mui/icons-material/Notes';
import "./style.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleProjects = () => {
    // Implement functionality
  }

  const handleExperience = () => {
    // Implement functionality
  }

  const handleArticles = () => {
    // Implement functionality
  }

  const handleConnectWithMe = () => {
    // Implement functionality
  }

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar className={`header-toolbar ${isMobile ? 'mobile' : ''}`}>
        <Typography variant="h6" component="div" className="header-title">
          <NotesIcon className="header-icon" />
          Abhay Kanwasi
        </Typography>
        <Box className={`header-buttons ${isMobile ? 'mobile' : ''}`}>
          <Button color="inherit" onClick={handleProjects}>
            Projects
          </Button>
          <Button color="inherit" onClick={handleExperience}>
            Experience
          </Button>
          <Button color="inherit" onClick={handleArticles}>
            Articles
          </Button>
          <Button color="inherit" onClick={handleConnectWithMe}>
            Connect with me
          </Button>
        </Box>
        <Box className={`header-theme ${isMobile ? 'mobile' : ''}`}>
          <IconButton color="inherit" onClick={handleToggleTheme}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            href="https://github.com/Abhay-Kanwasi"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            <GitHubIcon className="github-icon" />
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
