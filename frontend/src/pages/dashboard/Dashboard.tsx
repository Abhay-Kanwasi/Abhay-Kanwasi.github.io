import { Box } from "@mui/material"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Home from "../../components/home/Home"

const Dashboard = () => {
  return (
    <>
    <Box paddingTop="10px">
      <Header />
      <Home />
      <Footer />
    </Box>
    </>
  )
}

export default Dashboard