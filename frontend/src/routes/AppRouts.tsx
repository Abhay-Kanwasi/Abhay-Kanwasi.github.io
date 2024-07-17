import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Projects from "../pages/projects/Projects.tsx";
import Experiance from "../pages/experience/Experience.tsx";

const routes = [
  { path: "/", component: <Dashboard />, protected: false },
  { path: "projects/", component: <Projects />},
  { path: "experience/", component: <Experiance />},
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