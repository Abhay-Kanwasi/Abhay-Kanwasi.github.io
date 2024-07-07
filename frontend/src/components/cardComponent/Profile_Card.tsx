import { Grid, Container } from '@mui/material';
import CardComponent from './Card_Component';
import ExploreIcon from '@mui/icons-material/Explore';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import ShareIcon from '@mui/icons-material/Share';
import "./style.css";

const Profile_Cards = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4}>
          {/* First Grid */}
          <Grid item xs={12} sm={6}>
            <div >
              <CardComponent
                logo={<ExploreIcon fontSize='large' sx={{color: 'limegreen'}}/>}
                heading="Explore Projects"
                description="Building hobby projects while learning new technologies is something I do quite often and I would love if you explored them."
              />
            </div>
          </Grid>

          {/* Second Grid */}
          <Grid item xs={12} sm={6}>
            <div >
              <CardComponent
                logo={<CodeIcon fontSize='large' sx={{color: 'limegreen'}}/>}
                heading="Coding and Development"
                description="I occasionally involve myself in problem-solving on different coding platforms to refresh my knowledge. Checkout my coding profiles."
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <Grid container spacing={4}>
          {/* First Grid */}
          <Grid item xs={12} sm={6}>
            <div >
              <CardComponent
                logo={<WorkIcon fontSize='large' sx={{color: 'limegreen'}}/>}
                heading="Work Experience"
                description="Building hobby projects while learning new technologies is something I do quite often and I would love if you explored them."
              />
            </div>
          </Grid>

          {/* Second Grid */}
          <Grid item xs={12} sm={6}>
            <div >
              <CardComponent
                logo={<ShareIcon fontSize='large' sx={{color: 'limegreen'}}/>}
                heading="Connect with me"
                description="I occasionally involve myself in problem-solving on different coding platforms to refresh my knowledge. Checkout my coding profiles."
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile_Cards;