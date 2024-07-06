import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; 
import { toggleTheme } from '../../store/theme/themeReducer'; 
import NotesIcon from '@mui/icons-material/Notes';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleProjects = () => {
    
  }

  const handleExperience = () => {
    
  }

  const handleArticles = () => {
    
  }

  const handleConnectWithMe = () => {
    
  }

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NotesIcon sx={{ mr: 1 }} />
          Abhay Kanwasi
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <Button color="inherit" onClick={() => handleProjects()}>
            Projects
          </Button>
          <Button color="inherit" onClick={() => handleExperience()}>
            Experience
          </Button>
          <Button color="inherit" onClick={() => handleArticles()}>
            Articles
          </Button>
          <Button color="inherit" onClick={() => handleConnectWithMe()}>
            Connect with me
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton color="inherit" onClick={handleToggleTheme} sx={{ 
                    fontSize: '0.8rem', 
                    '& > *:first-child': 
                        { marginRight: '0.6em' } 
                    }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            href="https://github.com/Abhay-Kanwasi"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: '20px', 
              padding: '8px 16px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *:first-child': {
                marginRight: '8px', 
              },
            }}
            >
            <GitHubIcon />
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
