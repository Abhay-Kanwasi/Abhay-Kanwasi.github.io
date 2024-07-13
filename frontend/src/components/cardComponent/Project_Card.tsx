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
    <Card sx={{ maxWidth: 300, margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{ padding: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ borderRadius: 3 }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" paddingTop={"5px"}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
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
          fullWidth
          sx={{ marginTop: 2, borderRadius: 3, textTransform: 'none', backgroundColor: '#22C55E' }}
        >
          Watch Live
        </Button>
      </CardContent> 
    </Card>
  );
};

export default ProjectCard;
