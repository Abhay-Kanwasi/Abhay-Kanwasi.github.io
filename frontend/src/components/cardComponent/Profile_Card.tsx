import { Grid, Container, Box } from '@mui/material';
import CardComponent from './Card_Component';
import ExploreIcon from '@mui/icons-material/Explore';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Profile_Cards = () => {
  const navigate = useNavigate();
  const handleCardClick = (action: string) => {
    if(action == 'explore_projects'){
      navigate('/projects');
    }
    else if(action == 'coding'){
      console.log(action) 
    }
    else if(action == 'work_experience'){
      navigate('/experience')
    }
    else if(action == 'connect_with_me'){
      navigate('/connect-with-me')
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
        <Grid container spacing={2} justifyContent="center" sx={{ margin: 0 }}>
          {/* First Grid */}
          <Grid item xs={12} md={6}>
            <CardComponentWrapper onClick={() => handleCardClick('explore_projects')}>
              <CardComponent
                logo={<ExploreIcon fontSize='large' sx={{ color: '#22C55E' }} />}
                heading="Explore Projects"
                description="Building hobby projects while learning new technologies is something I do quite often and I would love if you explored them."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Second Grid */}
          <Grid item xs={12} md={6}>
            <CardComponentWrapper onClick={() => handleCardClick('coding')}>
              <CardComponent
                logo={<CodeIcon fontSize='large' sx={{ color: '#22C55E' }} />}
                heading="Coding and Development"
                description="I occasionally involve myself in problem-solving on different coding platforms to refresh my knowledge. Checkout my coding profiles."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Third Grid */}
          <Grid item xs={12} md={6}>
            <CardComponentWrapper onClick={() => handleCardClick('work_experience')}>
              <CardComponent
                logo={<WorkIcon fontSize='large' sx={{ color: '#22C55E' }} />}
                heading="Work Experience"
                description="Take a look at my recent work experience and get to know more about what I was cooking in the process."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Fourth Grid */}
          <Grid item xs={12} md={6}>
            <CardComponentWrapper onClick={() => handleCardClick('connect_with_me')}>
              <CardComponent
                logo={<ShareIcon fontSize='large' sx={{ color: '#22C55E' }} />}
                heading="Connect with me"
                description="Want to know more of me? I'd be happy to connect with you. Check out my social media handles."
              />
            </CardComponentWrapper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

interface CardComponentWrapperProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CardComponentWrapper: React.FC<CardComponentWrapperProps> = ({ children, onClick }) => (
  <Box
    sx={{
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '15px',
      margin: 0,
      maxWidth: '100%',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default Profile_Cards;
