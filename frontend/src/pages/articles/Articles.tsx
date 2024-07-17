import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const articles = [
  {
    date: '20th May, 2024',
    title: 'Lets see what we can do with rehype pretty code',
    description: 'Syntax highlighting, line numbers, line highlights, word highlights',
    link: '#'
  },
  {
    date: '11th May, 2024',
    title: 'This is just a sample title to check',
    description: 'For years parents have espoused the health benefits of eating garlic bread with cheese to their children...',
    link: '#'
  },
  {
    date: '11th May, 2024',
    title: 'This is just a sample title to check',
    description: 'For years parents have espoused the health benefits of eating garlic bread with cheese to their children...',
    link: '#'
  }
];

const Articles: React.FC = () => {
  const theme = useTheme();
  const hoverBackgroundColor = theme.palette.mode === 'dark' ? '#333333' : '#FFFDD0';

  return (
    <Container sx={{ paddingTop: '50px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', padding: '20px', paddingBottom: '2px' }}>Latest Articles</Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px', color: 'grey', padding: '20px', paddingTop: '0' }}>
        I love to write about stuff that I learn. Here are some of my latest articles.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', ml: 3, paddingLeft: '100px', paddingTop: '50px', gap: '20px' }}>
        {articles.map((article, index) => (
          <Box key={index} sx={{ display: 'flex', mb: 3 }}>
            <Box sx={{ minWidth: '150px', textAlign: 'right', pr: 2, paddingRight: '70px' }}>
              <Typography variant="body2" color="textSecondary" fontSize='1.1rem'>{article.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center', marginRight: 2 }}>
              {articles.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '100%',
                    bgcolor: 'text.secondary',
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                padding: '20px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: hoverBackgroundColor,
                  borderRadius: '20px',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" paddingBottom="10px">
                {article.title}
              </Typography>
              <Typography variant="body1" paddingBottom="10px">
                {article.description}
              </Typography>
              <Link href={article.link} sx={{ color: '#50B468', textDecoration: 'none' }}>
                Read more&nbsp;&gt;
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Articles;
