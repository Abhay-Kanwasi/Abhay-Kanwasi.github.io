import { Box, Button, Typography, Link, Container, Paper } from '@mui/material';

const Profile = () => {
    return (
        <Container maxWidth="sm" sx={{paddingTop: '100px'}}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" my={10}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            px: 2, 
                            py: 1, 
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                            Connect with me
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="small" 
                            sx={{ 
                                borderRadius: '50%', 
                                minWidth: '24px', 
                                width: '24px', 
                                height: '24px', 
                                padding: 0 
                            }}
                        >
                            →
                        </Button>
                    </Paper>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Hi there, I'm Abhay
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" gutterBottom color="textSecondary" fontWeight="bold">
                            I am a computer science engineer from Uttarakhand, India.
                        </Typography>
                        <Typography variant="body1" gutterBottom color="textSecondary" fontWeight="bold">
                            Currently, I work at{' '}
                            <Link href="https://www.hobbiate.com/" target="_blank" rel="noopener noreferrer">
                                Hobbiate Technologies
                            </Link>{' '}
                            as a Software Engineer, where I explore and contribute to building products.
                        </Typography>
                    </Box>


                    <Box mt={4}>
                        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                            Get in touch
                        </Button>
                        <Button variant="outlined" href="https://github.com/Abhay-Kanwasi" target="_blank" rel="noopener noreferrer">
                            Visit Github
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;
