import { Grid, Container, Box } from '@mui/material';
import CardComponent from './Card_Component';
import ExploreIcon from '@mui/icons-material/Explore';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ShareIcon from '@mui/icons-material/Share';
import "./style.css";

const Profile_Cards = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={1}>
          {/* First Grid */}
          <Grid item xs={12} sm={6}>
            <CardComponentWrapper>
              <CardComponent
                logo={<ExploreIcon fontSize='large' sx={{ color: 'limegreen' }} />}
                heading="Explore Projects"
                description="Building hobby projects while learning new technologies is something I do quite often and I would love if you explored them."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Second Grid */}
          <Grid item xs={12} sm={6}>
            <CardComponentWrapper>
              <CardComponent
                logo={<CodeIcon fontSize='large' sx={{ color: 'limegreen' }} />}
                heading="Coding and Development"
                description="I occasionally involve myself in problem-solving on different coding platforms to refresh my knowledge. Checkout my coding profiles."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Third Grid */}
          <Grid item xs={12} sm={6}>
            <CardComponentWrapper>
              <CardComponent
                logo={<WorkIcon fontSize='large' sx={{ color: 'limegreen' }} />}
                heading="Work Experience"
                description="Building hobby projects while learning new technologies is something I do quite often and I would love if you explored them."
              />
            </CardComponentWrapper>
          </Grid>

          {/* Fourth Grid */}
          <Grid item xs={12} sm={6}>
            <CardComponentWrapper>
              <CardComponent
                logo={<ShareIcon fontSize='large' sx={{ color: 'limegreen' }} />}
                heading="Connect with me"
                description="I occasionally involve myself in problem-solving on different coding platforms to refresh my knowledge. Checkout my coding profiles."
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
}

const CardComponentWrapper: React.FC<CardComponentWrapperProps> = ({ children }) => (
  <Box
    sx={{
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '15px',
    }}
  >
    {children}
  </Box>
);

export default Profile_Cards;
