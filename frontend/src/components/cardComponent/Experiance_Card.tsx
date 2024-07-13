import React from 'react';
import { Box, Typography, Chip, Stack, Link, Grid } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const ExperienceCard: React.FC = () => {
  const experienceData = [
    {
      role: 'Software Engineer',
      period: 'October, 2023 - Present',
      description: 'Created a responsive and user-friendly chat interface, incorporating real-time message processing, history management, and UI/UX improvements. Built comprehensive forms and dashboards for data entry and visualization, ensuring efficient data retrieval and display for various user-driven actions and configurations. Designed and implemented user interface components and backend services for dynamic content management, including user profiles, logging, and resource management.',
      skills: ['Python', 'Git', 'NextJS', 'Django', 'ChakraUI', 'MongoDB', 'PostgreSQL', 'LDAP']
    },
    {
      role: 'Software Engineer Intern',
      period: 'July, 2023 - October, 2023',
      description: 'Gained proficiency in Django ORM, including implementing and querying complex relationships and conducted unit testing to ensure data integrity. Improved the user interface and user experience by resolving key front-end issues, contributing to a smooth and reliable application experience.',
      skills: ['ReactJS', 'Postgres', 'Django', 'Git', 'Ubuntu', 'BitBucket', 'ORM']
    }
  ];

  return (
    <Box sx={{ padding: '20px', paddingTop: '50px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', padding: '20px' }}>
        My recent experience
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: '20px', marginBottom: '10px' }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '10px' }}>
              <Box
                sx={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={'bold'}
                  sx={{
                    color: '#22C55E',
                  }}
                >
                  @hobbiate
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Hobbiate is a startup and fintech solution company. It undertake application development for cutting edge technologies that relate to FinTech, Artificial Intelligence, LLMs, GPT, Data Science, Data Analytics, Data Engineering and Machine Learning.
              It specialise in Python stacks, Cloud Management, and DevOps; and have full understanding of SDLC and Agile Development Methodologies.
             </Typography>
            <Link href="#" underline="hover" sx={{ color: 'inherit', fontWeight: 'bold' }}>
              Checkout website to learn more &gt;
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          {experienceData.map((experience, index) => (
            <Box key={index} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '10px' }}>
                <WorkHistoryIcon fontSize='large' sx={{color: '#16A34A'}}/>
                <Box>
                  <Typography variant="h6" fontWeight={"bold"}>{experience.role}</Typography>
                  <Typography variant="body2" sx={{ color: '#50B468' }}>{experience.period}</Typography>
                </Box>
              </Stack>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                {experience.description}
              </Typography>
              <Stack direction="row" spacing={1}>
                {experience.skills.map((skill, skillIndex) => (
                  <Chip key={skillIndex} label={skill} sx={{ backgroundColor: 'inherit' }} />
                ))}
              </Stack>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExperienceCard;
