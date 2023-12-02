
import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
export const AdminHeader = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { state } = React.useContext(GlobalContext);

  return (
    <>
      <div className={`sidebar-holder ${!state.isOpen ? "open-nav" : ""}`}>
        <div className="sticky top-0 h-fit">
          <div className="w-full p-4 bg-sky-500">
            <div className="text-white font-bold text-center text-2xl">
            Admin
            </div>
          </div>
          <div className="w-full sidebar-list">
            <ul className="flex flex-wrap">
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/dashboard"
                  className={`${state.path == "admin" ? "text-black bg-gray-200" : ""}`}
                >
                  Dashboard
                </NavLink>
              </li>

              
    
    <li className="list-none block w-full">
    <NavLink
    to="/admin/cms"
    className={`${state.path === "cmss" ? "text-black bg-gray-200" : ""}`}
    >
    Cms
    </NavLink>
    </li>
    
    
    

    
    <li className="list-none block w-full">
    <NavLink
    to="/admin/email"
    className={`${state.path === "emails" ? "text-black bg-gray-200" : ""}`}
    >
    Emails
    </NavLink>
    </li>
    
    
    

    
    <li className="list-none block w-full">
    <NavLink
    to="/admin/photo"
    className={`${state.path === "photos" ? "text-black bg-gray-200" : ""}`}
    >
    Photos
    </NavLink>
    </li>
    
    
    

    
    <li className="list-none block w-full">
    <NavLink
    to="/admin/category"
    className={`${state.path === "categorys" ? "text-black bg-gray-200" : ""}`}
    >
    Categorys
    </NavLink>
    </li>
    
    
    

    
    <li className="list-none block w-full">
    <NavLink
    to="/admin/users"
    className={`${state.path === "userss" ? "text-black bg-gray-200" : ""}`}
    >
    Users
    </NavLink>
    </li>
    
    
    

                    

              
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/profile"
                  className={`${state.path == "profile" ? "text-black bg-gray-200" : ""}`}
                >
                  Profile
                </NavLink>
              </li>
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/login"
                  onClick={() =>
                    dispatch({
                      type: "LOGOUT",
                    })
                  }
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;


