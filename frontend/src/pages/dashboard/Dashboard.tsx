import { Box } from "@mui/material";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Home from "../../components/home/Home";

const Dashboard = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
    >
      <Header />
      <Box flexGrow={1}>
        <Home />
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
