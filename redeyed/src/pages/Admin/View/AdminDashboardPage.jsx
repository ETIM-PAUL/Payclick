
  import React from "react";
  import { AuthContext } from "Context/Auth";
  import { GlobalContext } from "Context/Global";
  
  const AdminDashboardPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  
    React.useEffect(() => {
      globalDispatch({
        type: "SETPATH",
        payload: {
          path: "admin",
        },
      });
    }, []);
    return (
      <>
        <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
          Dashboard
        </div>
      </>
    );
  };
  
  export default AdminDashboardPage;
  