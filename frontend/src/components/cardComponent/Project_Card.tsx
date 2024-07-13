import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Chip, Grid, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  sourceCodeLink: string; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, technologies, liveLink, sourceCodeLink }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{ padding: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{ borderRadius: 3 }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div" fontWeight={'bold'} paddingTop={"5px"}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          {technologies.map((tech) => (
            <Grid item key={tech}>
              <Chip label={tech} size="small" />
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: 4 }}>
          <Grid item xs={10}>
            <Button
              variant="contained"
              color="primary"
              href={liveLink}
              target="_blank"
              fullWidth
              sx={{ marginTop: 4, marginBottom: 2, borderRadius: 3, textTransform: 'none', backgroundColor: '#22C55E' }}
            >
              Watch Live
            </Button>
          </Grid>
          <Grid item sx={{ mt: 2 }}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size="small"
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 160,
                      borderRadius: '8px',
                      padding: '8px',
                      overflow: 'auto',
                    },
                  }}
                  disableScrollLock
                >
                  <Typography sx={{ fontSize: '1.0rem', p: 1, fontWeight: 'bold' }}>
                    Source Code
                  </Typography>
                  <Typography variant={'body2'} sx={{ fontSize: '0.8rem', p: 1, color: 'secondary' }}>
                    Want to explore source code ?
                  </Typography>
                  <MenuItem onClick={handleClick} sx={{ p: 1 }}>
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                  <Typography variant="body2" component="div" color="#22C55E">
                    {sourceCodeLink}
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
