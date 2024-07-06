import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";

const routes = [
  { path: "/", component: <Dashboard />, protected: false },
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