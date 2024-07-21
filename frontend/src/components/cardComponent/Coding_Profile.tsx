import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button, Divider, Paper } from '@mui/material';
import { Code, Public, CalendarToday } from '@mui/icons-material';

type Coding_ProfileProps = {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  avatarUrl: string;
  username: string;
  profileUrl: string;
};

const iconMap: { [key: string]: JSX.Element } = {
  'Total repositories': <Code />,
  'Public repositories': <Public />,
  'Active since': <CalendarToday />,
  'All problems solved': <Code />,
  'Easy problems solved': <Code />,
  'Medium problems solved': <Code />,
  'Hard problems solved': <Code />,
};

const Coding_Profile: React.FC<Coding_ProfileProps> = ({ title, description, stats, avatarUrl, username, profileUrl }) => {
  return (
    <Card sx={{ margin: '20px auto', padding: '20px', borderRadius: '15px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                {description}
            </Typography>
            <Box sx={{ marginBottom: '20px', width: '100%' }}>
                {stats.map((stat, index) => (
                    <Paper
                    key={index}
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '10px' }}
                    >
                    {iconMap[stat.label] || <Code sx={{ marginRight: '10px' }} />}
                    <Typography variant="body2" paddingLeft={'20px'}>
                        <strong>{stat.label}</strong>: {stat.value}
                    </Typography>
                    </Paper>
                ))}
            </Box>
            <Divider sx={{ marginY: 2, width: '100%' }} />
            <Avatar src={avatarUrl} sx={{ width: 50, height: 50, marginBottom: '10px' }} />
            <Typography variant="body2" sx={{ marginBottom: '20px' }}>
                @{username}
            </Typography>
            <Button variant="contained" fullWidth color="success" href={profileUrl} target="_blank" sx={{ alignSelf: 'center', borderRadius: '12px'}}>
                View profile
            </Button>
        </CardContent>
    </Card>
  );
};

export default Coding_Profile;
