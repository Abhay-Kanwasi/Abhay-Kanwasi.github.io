import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const customGreenColor = '#22C55E'; 

const ContactForm: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '10px', 
        paddingTop: '50px', 
        width: '100%',
        maxWidth: '500px', 
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          backgroundColor: customGreenColor,
          marginBottom: '10px',
          fontSize: '0.8rem',
          borderRadius: '10px',
          '&:hover': { backgroundColor: '#00a3cc' },
        }}
        startIcon={<SendIcon />}
        fullWidth
      >
        Send me a Mail
      </Button>

      <Button
        variant="outlined"
        sx={{
          textTransform: 'none',
          borderColor: customGreenColor,
          color: 'inherit',
          marginBottom: '10px',
          borderRadius: '10px',
          fontSize: '0.8rem', 
          '&:hover': {
            borderColor: '#00a3cc',
            color: '#00a3cc',
          },
        }}
        startIcon={<LinkedInIcon />}
        fullWidth
      >
        Connect on LinkedIn
      </Button>

      <Typography variant="body1" sx={{ margin: '10px 0', fontSize: '0.8rem' }}>or</Typography>

      <Paper
        sx={{
          padding: '15px', 
          borderRadius: '8px',
          textAlign: 'left',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px', fontSize: '1rem', fontWeight: 'bold' }}>
          Send me a Message
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '10px', fontSize: '0.8rem' }}>
          Want to connect with me? Hit me a message below and get instant replies
        </Typography>

        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="subtitle1" sx={{ marginBottom: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Name
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: 'inherit',
              borderRadius: '5px',
              fontSize: '0.8rem',
              padding: '5px', 
            }}
            inputProps={{
              style: {
                fontSize: '0.7rem', 
                padding: '10px' 
              }
            }} 
          />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="subtitle1" sx={{ marginBottom: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: 'inherit',
              borderRadius: '5px',
              fontSize: '0.8rem',
              padding: '5px', 
            }}
            inputProps={{
              style: {
                fontSize: '0.7rem', 
                padding: '10px' 
              }
            }} 
          />
        </Box>

        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="subtitle1" sx={{ marginBottom: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Message
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            sx={{
              backgroundColor: 'inherit',
              borderRadius: '5px',
              fontSize: '0.8rem',
              padding: '5px', 
              marginBottom: '10px' 
            }}
            inputProps={{
              style: {
                fontSize: '0.7rem', 
                padding: '10px' 
              }
            }} 
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: customGreenColor,
            fontSize: '0.8rem', 
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#00a3cc' },
          }}
          startIcon={<SendIcon />}
          fullWidth
        >
          Send message
        </Button>
      </Paper>
    </Box>
  );
};

export default ContactForm;
