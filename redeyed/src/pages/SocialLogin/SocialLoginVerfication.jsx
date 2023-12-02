

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "Context/Auth";

// Route /login/oauth
// <Route path="/login/oauth" element={<SocialLoginVerificationTemplate />}></Route>

const SocialLoginVerificationTemplate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = React.useContext(AuthContext);
  let data = searchParams.get("data");
  useEffect(() => {
    const parsedData = JSON.parse(data);
    dispatch({
      type: "LOGIN",
      payload: parsedData,
    });
  }, []);

  return <div>{data}</div>;
};

export default SocialLoginVerificationTemplate;

