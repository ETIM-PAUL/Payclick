import React, { memo } from "react";
  import { CloseIcon } from "Assets/svgs";
  
  const Modal = ({ children, title, isOpen = false, modalCloseClick, modalHeader, classes }) => {
    return (
      <div
        style={{
          zIndex: 100000002,
          transform: "translate(-50%, -50%)",
        }}
        className={`w-full h-[100vh] fixed top-[50%] left-[50%] modal-holder bg-[#00000099] p-20 items-center justify-center ${isOpen ? "flex" : "hidden"}`}
      >
        <div className={`shadow p-10 bg-white rounded-lg ${classes?.modalDialog}`}>
          {modalHeader && (
            <div className={`flex justify-between border-b pb-2`}>
              <h5 className="font-bold text-center text-lg uppercase">{title}</h5>
              <div className="modal-close cursor-pointer" onClick={modalCloseClick}>
                <CloseIcon />
              </div>
            </div>
          )}
  
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  };
  
  const ModalMemo = memo(Modal);
  export { ModalMemo as Modal };
