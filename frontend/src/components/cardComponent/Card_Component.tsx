import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
interface CardProps {
    logo: React.ReactNode;
    heading: string;
    description: string;
}

const CardComponent: React.FC<CardProps> = ({ logo, heading, description }) => {
  return (
    <Box sx={{ padding: '20px', borderRadius: '8px' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {logo}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {heading}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ marginTop: '10px', paddingLeft: '50px', color: 'grey' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default CardComponent;
