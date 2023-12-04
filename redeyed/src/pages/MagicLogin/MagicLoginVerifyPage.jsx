
import React from "react";
import MkdSDK from "Utils/MkdSDK";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";

const MagicLoginVerifyPage = () => {
 

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch:GlobalDispatch } = React.useContext(GlobalContext);

  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
 

  const login = async () => {
    let sdk = new MkdSDK();
    try {
      let token = search.get('token') ?? null;
      const result = await sdk.magicLoginVerify(token);
      if (!result.error) {
        dispatch({
          type: "LOGIN",
          payload: result,
        });
        navigate(`/${result.role}/dashboard`);
      } else {
        navigate('/user/login')
      }
    } catch (error) {
      navigate('/user/login')
      // console.log("Error", error);
      // setError("email", {
      //   type: "manual",
      //   message: error.message,
      // });
    }
  };

  React.useEffect(() => {
    ( async () => {
      await login();
    })()
  });

  return (
    <>
      <div className="flex min-h-screen justify-center items-center min-w-full">
      <svg className="w-24 h-24 animate-spin" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      
      </div>
    </>
  );
};

export default MagicLoginVerifyPage;
