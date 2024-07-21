import React from 'react';
import { Container, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import Coding_Profile from '../../components/cardComponent/Coding_Profile';
import './style.css';

const Coding_Profile_Page: React.FC = () => {
  const githubStats = [
    { label: 'Total repositories', value: '72 repositories' },
    { label: 'Public repositories', value: '49 repositories' },
    { label: 'Active since', value: 'Feb 2021' },
  ];

  const leetcodeStats = [
    { label: 'All problems solved', value: '285 out of 3157 problems' },
    { label: 'Easy problems solved', value: '136 out of 795 problems with 94.85 percent accuracy' },
  ];

  return (
    <>
      <Container sx={{ paddingTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Coding profiles
        </Typography>

        <Grid container spacing={4} sx={{paddingLeft: '100px', paddingRight: '100px'}}>
          <Grid item xs={12} md={6}>
            <Coding_Profile
              title="Github"
              description="I am an active user on Github, here are some of my stats"
              stats={githubStats}
              avatarUrl="https://avatars.githubusercontent.com/u/9919?v=4"
              username="Abhay-Kanwasi"
              profileUrl="https://github.com/Abhay-Kanwasi"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Coding_Profile
              title="Leetcode"
              description="I have practiced quite a bit on leetcode, here are my stats"
              stats={leetcodeStats}
              avatarUrl="https://leetcode.com/static/images/LeetCode_Sharing.png"
              username="Abhay-Kanwasi"
              profileUrl="https://leetcode.com/Abhay-Kanwasi"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Coding_Profile_Page;
