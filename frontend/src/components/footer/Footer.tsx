import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar position="fixed" color="transparent" elevation={1} sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" color="textSecondary">
          &copy; {new Date().getFullYear()} Abhay Kanwasi. All rights reserved.
        </Typography>
        <Box>
            <IconButton 
                color="inherit" 
                href="https://github.com/Abhay-Kanwasi" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{
                    fontSize: '0.8rem',
                    '& > *:first-child': { marginRight: '0.3em' } 
                }}>
                <GitHubIcon />
                GitHub
            </IconButton>
            <IconButton 
                color="inherit" 
                href="https://www.linkedin.com/in/abhay-kanwasi/" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                    fontSize: '0.8rem', 
                    '& > *:first-child': 
                        { marginRight: '0.3em' } 
                    }}>
                <LinkedInIcon />
                LinkedIn
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
