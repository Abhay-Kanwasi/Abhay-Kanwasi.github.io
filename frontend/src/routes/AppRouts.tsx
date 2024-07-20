import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Projects from "../pages/projects/Projects.tsx";
import Experiance from "../pages/experience/Experience.tsx";
import Connect_with_me from "../pages/connect with me/Connect_with_me.tsx";

const routes = [
  { path: "/", component: <Dashboard />, protected: false },
  { path: "projects/", component: <Projects />},
  { path: "experience/", component: <Experiance />},
  { path: "connect-with-me/", component: <Connect_with_me />}
];

function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, component, protected: isProtected }) => (
        <Route
          key={path}
          path={path}
          element={isProtected ? <ProtectedRoute>{component}</ProtectedRoute> : component}
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;