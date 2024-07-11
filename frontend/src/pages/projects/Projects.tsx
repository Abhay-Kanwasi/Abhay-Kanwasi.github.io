import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProjectCard from '../../components/cardComponent/Project_Card';

const projects = [
  {
    image: './src/assets/Code in browser.png',
    title: 'CodeInBrowser',
    description: 'This application allows you to write and run code snippets in various programming languages',
    technologies: ['React', 'Node.js', 'Chakra UI', 'Monaco Editor'],
    liveLink: 'https://github.com/Abhay-Kanwasi/CodeInBrowser',
  },
  {
    image: './src/assets/AI Blog Generator.jpeg',
    title: 'AI Blog Generator',
    description: 'Provide users with AI-generated blog posts summarizing the content of YouTube videos.',
    technologies: ['Python', 'Tailwind CSS', 'Django', 'JavaScript'],
    liveLink: 'https://example.com/shopper',
  },
  {
    image: './src/assets/AI Blog Generator.jpeg',
    title: 'AI Blog Generator',
    description: 'Provide users with AI-generated blog posts summarizing the content of YouTube videos.',
    technologies: ['Python', 'Tailwind CSS', 'Django', 'JavaScript'],
    liveLink: 'https://example.com/shopper',
  },
];

const Projects: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', paddingLeft: 45, paddingRight: 45, paddingTop: '50px' }}>
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', padding: '20px' }}>
        My Projects
      </Typography>
      <Grid container justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: 1 }}>
            <ProjectCard {...project} />
          </Grid> 
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
