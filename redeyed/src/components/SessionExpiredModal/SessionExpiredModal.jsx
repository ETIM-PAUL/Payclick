
  import { Dialog, Transition } from "@headlessui/react";
  import React, { Fragment } from "react";
  import { useEffect } from "react";
  import { useContext } from "react";
  import { useLocation, useNavigate } from "react-router";
  import { AuthContext } from "Context/Auth";

  let modalTimeout;
  export default function SessionExpiredModal() {
    const { state, dispatch } = useContext(AuthContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();
  
    const logout = () => {
      dispatch({ type: "SESSION_EXPIRED", payload: false });
      dispatch({ type: "LOGOUT" });
      if (state.role) {
        navigate(`${state?.role}/login?redirect_uri=${pathname}`);
      } else {
        window.location.href = `/login?redirect_uri=${pathname}`;
      }
      clearTimeout(modalTimeout);
    };
  
    useEffect(() => {
      if (state.sessionExpired) {
        modalTimeout = setTimeout(() => {
          logout();
        }, 4000);
      }
    }, [state.sessionExpired]);
  

  if (!state.sessionExpired) return null;

  return (
    <div className="relative w-full min-h-screen">
      <Transition
        appear
        show={true}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Session Expired
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Your current login session has expired. Redirecting to login page shortly</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => logout()}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
