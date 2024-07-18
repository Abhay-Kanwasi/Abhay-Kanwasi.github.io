import React from 'react';
import { Container, Typography, Box, Button, Avatar, Link } from '@mui/material';

const July_8_Article: React.FC = () => {
  return (
    <Container sx={{ paddingTop: '20px', width: '70%', mx: 'auto' }}>
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
        20th May, 2024
      </Typography>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: '20px' }}>
        Lets see what we can do with rehype pretty code
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar alt="Author" src="/path/to/avatar.jpg" sx={{ marginRight: '10px' }} />
        <Box>
            <Typography variant="body1" fontWeight="bold">
            Abhay Kanwasi
            </Typography>
            <Link href="https://www.linkedin.com/in/abhay-kanwasi" variant="body2" color="textSecondary">
            @abhay-kanwasi
            </Link>
        </Box>
      </Box>
      <Typography variant="body1" paragraph>
        <Box component="span" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }}>
          rehype-pretty-code
        </Box> 
        is a Rehype plugin powered by the 
        <Box component="span" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }}>
          shiki
        </Box> 
        syntax highlighter that provides beautiful code blocks for Markdown or MDX. It works on both the server at build-time (avoiding runtime syntax highlighting) and on the client for dynamic highlighting.
      </Typography>
      <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '30px', marginBottom: '10px' }}>
        Editor-Grade Highlighting
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ marginTop: '20px', marginBottom: '10px' }}>
        Line Numbers and Line Highlighting
      </Typography>
      <Typography variant="body1" paragraph>
        Draw attention to a particular line of code.
      </Typography>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
          fontFamily: 'monospace',
          color: 'white',
        }}
      >
        <Box component="pre" sx={{ margin: 0 }}>
          <Box component="code">
            {`
            import { useFloating } from "@floating-ui/react";
            
            
            function MyComponent() {
            const { refs, floatingStyles } = useFloating();
            
            return (
                <>
                <div ref={refs.setReference} />
                <div ref={refs.setFloating} style={floatingStyles} />
                </>
            );
            }
            `}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default July_8_Article;
