
import React, { memo, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "Context/Auth";
import metadataJSON from "Utils/metadata.json";

const ClientRoute = ({ path, children }) => {
  const Auth = useContext(AuthContext);

  const { isAuthenticated, role } = Auth?.state;
  React.useEffect(() => {
    const metadata = metadataJSON[path ?? "/"];
    if (metadata !== undefined) {
      document.title = metadata?.title?metadata?.title:"redeyeddev";
    } else {
      document.title = "redeyeddev";
    }
  }, [path]);

  return (
    <>
      {isAuthenticated ? (
        <>{children}</>
      ) : (
        <Navigate to="/client/login" replace />
      )}
    </>
  );
};


export default memo(ClientRoute);
