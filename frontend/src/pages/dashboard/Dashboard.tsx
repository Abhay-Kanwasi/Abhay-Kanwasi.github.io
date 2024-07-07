import { Box } from "@mui/material";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile";
import Connect_with_me from "../connect with me/Connect_with_me";
import Articles from "../articles/Articles";
import Experience from "../experience/Experience";
import Projects from "../projects/Projects";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");

  const handleShowProjects = () => setActiveSection("projects");
  const handleShowExperience = () => setActiveSection("experience");
  const handleShowArticles = () => setActiveSection("articles");
  const handleConnectWithMe = () => setActiveSection("connectWithMe");
  const handleShowProfile = () => setActiveSection("profile");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header
        onShowProjects={handleShowProjects}
        onShowExperience={handleShowExperience}
        onShowArticles={handleShowArticles}
        onConnectWithMe={handleConnectWithMe}
        onShowProfile={handleShowProfile}
      />
      <Box flexGrow={1}>
        {activeSection === "profile" && <Profile onClickGetInTouch={handleConnectWithMe}/>}
        {activeSection === "projects" && <Projects />}
        {activeSection === "experience" && <Experience />}
        {activeSection === "articles" && <Articles />}
        {activeSection === "connectWithMe" && <Connect_with_me />}
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
