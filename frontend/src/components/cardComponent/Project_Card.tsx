import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Chip, Grid, Box } from '@mui/material';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, technologies, liveLink }) => {
  return (
    <Card sx={{ maxWidth: 330, margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{ padding: 2 }}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={title}
          sx={{ borderRadius: 3 }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" paddingTop={"10px"}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Grid container spacing={0.5} sx={{ marginTop: 1, paddingTop: "10px"}}>
          {technologies.map((tech) => (
            <Grid item key={tech}>
              <Chip label={tech} size="small" />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          href={liveLink}
          target="_blank"
          sx={{ marginTop: 2, borderRadius: 3 }}
        >
          Watch Live
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
