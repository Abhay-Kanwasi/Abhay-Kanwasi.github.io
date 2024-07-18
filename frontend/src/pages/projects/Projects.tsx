import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProjectCard from '../../components/cardComponent/Project_Card';

const projects = [
  {
    image: './src/assets/Code in browser.png',
    title: 'CodeInBrowser',
    description: 'This application allows you to write and run code snippets in various programming languages. When you select language it also provide a sample program.',
    technologies: ['React', 'Node.js', 'Chakra UI', 'Monaco Editor', 'TailwindCSS'],
    liveLink: 'https://browser-code-editor-eight.vercel.app/',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/code-in-browser'
  },
  {
    image: './src/assets/AI Blog Generator.jpeg',
    title: 'AI Blog Generator',
    description: "Provides AI-generated blog posts that summarize YouTube video content, providing users with concise and informative text summaries to enhance accessibility and content consumption.",
    technologies: ['Jinja2', 'Python', 'Tailwind CSS', 'Django', 'JavaScript', 'Openai-api', 'assemlyai'],
    liveLink: 'https://example.com/shopper',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/AI-Blog-Generator'
  },
  {
    image: './src/assets/Movie recommender system.png',
    title: 'Movie Recommender System',
    description: "Preprocesses movie data, vectorizes text using Bag of Words, and calculates cosine distances to recommend the top 5 similar movies, enhancing user experience with personalized suggestions.",
    technologies: ['Python', 'Pandas', 'Sklearn', 'Streamlit', 'Nltk'],
    liveLink: 'https://example.com/shopper',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/ML-Learning/tree/main/Projects/Movie%20Recommender%20System'
  },
  {
    image: './src/assets/Puddle.png',
    title: 'Puddle - Online Marketplace Project',
    description: 'Online marketplace provides secure user authentication, seamless product management, efficient search functionality, and an intuitive messaging system for direct communication between sellers and users.',
    technologies: ['Python', 'Tailwind CSS', 'Django', 'JavaScript'],
    liveLink: 'https://example.com/shopper',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/Puddle'
  },
  {
    image: './src/assets/wetherapplication.jpg',
    title: 'Weather App',
    description: 'A Wheather app using Django framework and API name OpenWeather which will compare the weather of the given 2 cities. We will be using request to fetch the data from the OpenWether API',
    technologies: ['Python', 'Tailwind CSS', 'Django', 'JavaScript'],
    liveLink: 'https://example.com/shopper',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/Wether-Application'
  },
  {
    image: './src/assets/ShoppinglyX.jpg',
    title: 'ShoppinglyX',
    description: 'Shopping website that enables users to browse and purchase products online. It features user authentication, product listings, a shopping cart, and order placement functionality. Explore and shop for a wide range of products seamlessly on this platform.',
    technologies: ['Python', 'Tailwind CSS', 'Django', 'JavaScript'],
    liveLink: 'https://example.com/shopper',
    sourceCodeLink: 'https://github.com/Abhay-Kanwasi/Full-stack-Ecommerce-Website/'
  },
];

const Projects: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', paddingLeft: 50, paddingRight: 50, paddingTop: '30px' }}>
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
