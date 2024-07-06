import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && auth.access ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;