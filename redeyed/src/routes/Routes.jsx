
import React, { useEffect, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";

import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { PublicWrapper } from "Components/PublicWrapper";
import { NotFoundPage } from "Pages/404";
import { SnackBar } from "Components/SnackBar";
import { SessionExpiredModal } from "Components/SessionExpiredModal";

// generatePagesRoutes
import { ClientWrapper } from "Components/ClientWrapper";
import { AdminWrapper } from "Components/AdminWrapper";


import {
  SocialLoginVerfication,
  AddAdminCmsPage,
  AddAdminEmailPage,
  AddAdminPhotoPage,
  AdminCmsListPage,
  AdminEmailListPage,
  AdminPhotoListPage,
  EditAdminCmsPage,
  EditAdminEmailPage,
  UserMagicLoginPage,
  MagicLoginVerifyPage,
  ClientListPagesTablePage,
  ClientViewPagesTablePage,
  // CustomClientProfilePage,
  AdminListPagesTablePage,
  AdminEditPagesTablePage,
  CustomAdminLoginPage,
  CustomPublicLoginPage,
  AdminListSettingTablePage,
  AdminAddSettingTablePage,
  AdminEditSettingTablePage,
  AdminViewSettingTablePage,
  AdminListUserTablePage,
  AdminAddUserTablePage,
  AdminEditUserTablePage,
  AdminViewUserTablePage,
  CustomAdminProfilePage,
  PublicListPagesTablePage,
  AdminListCategoryTablePage,
  AdminAddCategoryTablePage,
  AdminEditCategoryTablePage,
  AdminViewCategoryTablePage,
  ClientSignUpPage,
  ClientLoginPage,
  ClientForgotPage,
  ClientResetPage,
  ClientDashboardPage,
  AdminSignUpPage,
  AdminForgotPage,
  AdminResetPage,
  AdminDashboardPage,
  AdminUserListPage,
  AddAdminUserPage,
  EditAdminUserPage,
  PublicSignUpPage,
  PublicForgotPage,
  PublicResetPage,
  PublicProfilePage,
  PublicDashboardPage,
  ClientOrdersPage
} from "./LazyLoad";
import ClientProfilePage from "Pages/Client/View/CustomClientProfilePage";

export const DynamicWrapper = ({ isAuthenticated, role, children }) => {
  if (!isAuthenticated) {
    return <PublicWrapper>{children}</PublicWrapper>;
  }
  if (isAuthenticated) {

    if (role === "client") {
      return <ClientWrapper>{children}</ClientWrapper>;
    }

    if (role === "admin") {
      return <AdminWrapper>{children}</AdminWrapper>;
    }

    if (role === "public") {
      return <PublicWrapper>{children}</PublicWrapper>;
    }

  }
};

export const NotFound = ({ isAuthenticated, role }) => {
  if (!isAuthenticated) {
    return (
      <PublicWrapper>
        <NotFoundPage />
      </PublicWrapper>
    );
  }
  if (isAuthenticated) {

    if (role === "client") {
      return (
        <ClientWrapper>
          <NotFoundPage />
        </ClientWrapper>
      );
    }

    if (role === "admin") {
      return (
        <AdminWrapper>
          <NotFoundPage />
        </AdminWrapper>
      );
    }

    if (role === "public") {
      return (
        <PublicWrapper>
          <NotFoundPage />
        </PublicWrapper>
      );
    }

  }
};


export default () => {
  const { state } = useContext(AuthContext);
  const {
    state: { isOpen },
    dispatch,
  } = useContext(GlobalContext);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  function setDimension(e) {
    if (e.currentTarget.innerWidth >= 1024) {
      toggleSideBar(true);
    } else toggleSideBar(false);
    setScreenSize(e.currentTarget.innerWidth);
  }

  // const toTop = () => {
  //   containerRef.current.scrollTo(0, 0);
  // };

  const toggleSideBar = (open) => {
    if (isOpen && screenSize < 1024) {
      dispatch({
        type: "OPEN_SIDEBAR",
        payload: { isOpen: open },
      });
    } else if (!isOpen && screenSize >= 1024) {
      dispatch({
        type: "OPEN_SIDEBAR",
        payload: { isOpen: open },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div
      onClick={() => {
        isOpen ? toggleSideBar(false) : null;
      }}
      className={`h-screen overflow-x-hidden bg-gradient-to-br from-[#FCF3F9] to-[#EAF8FB]`}
    >
      <Routes>

        <Route
          path="/login/oauth"
          element={
            <PublicRoute
              path="/login/oauth"
              element={
                <PublicWrapper>
                  <SocialLoginVerfication />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          exact
          path="/admin/add-cms"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/add-cms"}
              element={
                <AdminWrapper>
                  <AddAdminCmsPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-email"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/add-email"}
              element={
                <AdminWrapper>
                  <AddAdminEmailPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-photo"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/add-photo"}
              element={
                <AdminWrapper>
                  <AddAdminPhotoPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/cms"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/cms"}
              element={
                <AdminWrapper>
                  <AdminCmsListPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/email"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/email"}
              element={
                <AdminWrapper>
                  <AdminEmailListPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/photo"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/photo"}
              element={
                <AdminWrapper>
                  <AdminPhotoListPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-cms/:id"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/edit-cms/:id"}
              element={
                <AdminWrapper>
                  <EditAdminCmsPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-email/:id"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/edit-email/:id"}
              element={
                <AdminWrapper>
                  <EditAdminEmailPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          path="/magic-login/:role"
          element={
            <PublicRoute
              path="/magic-login/:role"
              element={
                <PublicWrapper>
                  <UserMagicLoginPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/magic-login/verify"
          element={
            <PublicRoute
              path="/magic-login/verify"
              element={
                <PublicWrapper>
                  <MagicLoginVerifyPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          exact
          path="/client/pages"
          element={
            <PrivateRoute
              access="client"
              path="/client/pages"
              element={
                <ClientWrapper>
                  <ClientListPagesTablePage />
                </ClientWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/client/view-video/:id"
          element={
            // <PrivateRoute
            //   access="client"
            //   path="/client/view-pages/:id"
            //   element={
            // <ClientWrapper>
            <ClientViewPagesTablePage />
            // </ClientWrapper>
          }
        //   />
        // }
        />

        <Route
          exact
          path="/client/profile"
          element={
            // <PrivateRoute
            //   access="client"
            //   path={"/client/profile"}
            //   element={
            <ClientProfilePage />
          }
        //   />
        // }
        />

        <Route
          exact
          path="/client/orders"
          element={
            // <PrivateRoute
            //   access="client"
            //   path={"/client/profile"}
            //   element={
            <ClientOrdersPage />
          }
        //   />
        // }
        />

        <Route
          exact
          path="/client/view-pages/:id"
          element={
            <PrivateRoute
              access="client"
              path="/client/view-pages/:id"
              element={
                <ClientWrapper>
                  <ClientViewPagesTablePage />
                </ClientWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/client/pages"
          element={
            <PrivateRoute
              access="client"
              path="/client/pages"
              element={
                <ClientWrapper>
                  <ClientListPagesTablePage />
                </ClientWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/pages"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/pages"
              element={
                <AdminWrapper>
                  <AdminListPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/pages"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/pages"
              element={
                <AdminWrapper>
                  <AdminListPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/pages"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/pages"
              element={
                <AdminWrapper>
                  <AdminListPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-pages/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/edit-pages/:id"
              element={
                <AdminWrapper>
                  <AdminEditPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/pages"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/pages"
              element={
                <AdminWrapper>
                  <AdminListPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/pages"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/pages"
              element={
                <AdminWrapper>
                  <AdminListPagesTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/setting"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/setting"
              element={
                <AdminWrapper>
                  <AdminListSettingTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-setting"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/add-setting"
              element={
                <AdminWrapper>
                  <AdminAddSettingTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-setting/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/edit-setting/:id"
              element={
                <AdminWrapper>
                  <AdminEditSettingTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/view-setting/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/view-setting/:id"
              element={
                <AdminWrapper>
                  <AdminViewSettingTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/user"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/user"
              element={
                <AdminWrapper>
                  <AdminListUserTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-user"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/add-user"
              element={
                <AdminWrapper>
                  <AdminAddUserTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-user/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/edit-user/:id"
              element={
                <AdminWrapper>
                  <AdminEditUserTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/view-user/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/view-user/:id"
              element={
                <AdminWrapper>
                  <AdminViewUserTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/profile"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/profile"}
              element={
                <AdminWrapper>
                  <CustomAdminProfilePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/category"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/category"
              element={
                <AdminWrapper>
                  <AdminListCategoryTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-category"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/add-category"
              element={
                <AdminWrapper>
                  <AdminAddCategoryTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-category/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/edit-category/:id"
              element={
                <AdminWrapper>
                  <AdminEditCategoryTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/view-category/:id"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/view-category/:id"
              element={
                <AdminWrapper>
                  <AdminViewCategoryTablePage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          path="/client/sign-up"
          element={
            <PublicRoute
              path="/client/sign-up"
              element={
                <PublicWrapper>
                  <ClientSignUpPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/client/login"
          element={
            <PublicRoute
              path="/client/login"
              element={
                <ClientLoginPage />
              }
            />

          }
        />


        <Route
          path="/client/forgot"
          element={
            <PublicRoute
              path="/client/forgot"
              element={
                <PublicWrapper>
                  <ClientForgotPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/client/reset"
          element={
            <PublicRoute
              path="/client/reset"
              element={
                <PublicWrapper>
                  <ClientResetPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          exact
          path="/client/dashboard"
          element={
            // <PrivateRoute
            //   access="client"
            //   path={"/client/dashboard"}
            //   element={
            // <ClientWrapper>
            <ClientDashboardPage />
            // </ClientWrapper>
          }
        //   />
        // }
        />

        <Route
          path="/admin/sign-up"
          element={
            <PublicRoute
              path="/admin/sign-up"
              element={
                <PublicWrapper>
                  <AdminSignUpPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/admin/forgot"
          element={
            <PublicRoute
              path="/admin/forgot"
              element={
                <PublicWrapper>
                  <AdminForgotPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/admin/reset"
          element={
            <PublicRoute
              path="/admin/reset"
              element={
                <PublicWrapper>
                  <AdminResetPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          exact
          path="/admin/dashboard"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/dashboard"}
              element={
                <AdminWrapper>
                  <AdminDashboardPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/users"
              element={
                <AdminWrapper>
                  <AdminUserListPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/add-user"
          element={
            <PrivateRoute
              access="admin"
              path="/admin/add-user"
              element={
                <AdminWrapper>
                  <AddAdminUserPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          exact
          path="/admin/edit-user/:id"
          element={
            <PrivateRoute
              access="admin"
              path={"/admin/edit-user/:id"}
              element={
                <AdminWrapper>
                  <EditAdminUserPage />
                </AdminWrapper>
              }
            />
          }
        />

        <Route
          path="/public/sign-up"
          element={
            <PublicRoute
              path="/public/sign-up"
              element={
                <PublicWrapper>
                  <PublicSignUpPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/public/forgot"
          element={
            <PublicRoute
              path="/public/forgot"
              element={
                <PublicWrapper>
                  <PublicForgotPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/public/reset"
          element={
            <PublicRoute
              path="/public/reset"
              element={
                <PublicWrapper>
                  <PublicResetPage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/public/profile"
          element={
            <PublicRoute
              path="/public/profile"
              element={
                <PublicWrapper>
                  <PublicProfilePage />
                </PublicWrapper>
              }
            />

          }
        />


        <Route
          path="/public/dashboard"
          element={
            <PublicRoute
              path="/public/dashboard"
              element={
                <PublicWrapper>
                  <PublicDashboardPage />
                </PublicWrapper>
              }
            />

          }
        />



        <Route
          path={"*"}
          element={<PublicRoute path={"*"} element={<NotFound {...state} />} />}
        />
      </Routes>
      <SessionExpiredModal />
      <SnackBar />
    </div>
  );
};
