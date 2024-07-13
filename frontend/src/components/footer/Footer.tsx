import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/material';
import "./style.css";

const Footer: React.FC = () => {
  return (
    <AppBar position="fixed" color="inherit" elevation={1} className="footer-appbar" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar className="footer-toolbar" style={{ marginTop: 'auto' }}>
        <Typography variant="body1" color="textSecondary" className="footer-text">
          &copy; {new Date().getFullYear()} Abhay Kanwasi
        </Typography>
        <Box className="footer-icons">
          <IconButton 
            color="inherit" 
            href="https://github.com/Abhay-Kanwasi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-icon"
          >
            <GitHubIcon />
            <span className="icon-text">GitHub</span>
          </IconButton>
          <IconButton 
            color="inherit" 
            href="https://www.linkedin.com/in/abhay-kanwasi/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-icon"
          >
            <LinkedInIcon />
            <span className="icon-text">LinkedIn</span>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
