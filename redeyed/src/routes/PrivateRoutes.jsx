
import React, { memo, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { NotFound } from "./Routes";
import PublicRoute from "./PublicRoutes";
import ClientRoute from "./ClientRoutes";
import AdminRoute from "./AdminRoutes";


const PrivateRoute = ({ path, element, access }) => {
  const Auth = useContext(AuthContext);

  if (Auth?.state?.isAuthenticated) {
    switch (true) {
      case Auth?.state?.role === "client" && access === "client":
        return <ClientRoute path={path}>{element}</ClientRoute>
      case Auth?.state?.role === "admin" && access === "admin":
        return <AdminRoute path={path}>{element}</AdminRoute>
      case Auth?.state?.role === "public" && access === "public":
        return <PublicRoute path={path}>{element}</PublicRoute>

      default:
        return <PublicRoute path={"*"} element={<NotFound />} />;
    }
  }
  if (!Auth?.state?.isAuthenticated) {
    return <PublicRoute path={"*"} element={<NotFound />} />;
  }
};

export default memo(PrivateRoute);
