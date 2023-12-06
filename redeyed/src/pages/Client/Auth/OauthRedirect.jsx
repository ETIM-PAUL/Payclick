import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { GlobalContext, showToast } from "@/globalContext";
import { parseJsonSafely } from "Utils/utils";
import { AuthContext } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";

const OauthRedirect = () => {
  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = parseJsonSafely(urlParams.get("data"), {});
    if (data?.error) {
      showToast(globalDispatch, data?.message, 3000, "error")
      navigate("/login");
    } else {
      authDispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("first_login", data.user_id);
      navigate("/client/dashboard");
    }
  }, []);

  return <h1 className="mt-96 text-7xl"></h1>;
};

export default OauthRedirect;
