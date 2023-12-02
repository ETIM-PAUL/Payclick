import React from "react";

const AlartMolad = ({ onClose, onClick, text }) => {
  return (
    <div className=" fixed  top-0 left-0 w-full h-full z-[99999]">
      <div
        onClick={() => onClose(false)}
        className=" absolute top-0 left-0 w-full h-full bg-[#0000004f] "
      />
      <div className="bg-white w-1/3 min-h-1/2  max-h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="pb-4 px-5">
          <div className=" w-full max-w-lg">
            <h5 className=" py-5 text-[#5e6c84] relative">{text}</h5>
            <div className="flex ">
              <button
                onClick={() => onClose(false)}
                className="bg-[#aeaeae] hover:bg-[#797979] text-[14px] text-white font-bold py-[6px] px-[10px] rounded focus:outline-none focus:shadow-outline mr-4"
              >
                Cancel
              </button>
              <button
                onClick={onClick}
                className="bg-[#df0000] hover:bg-[#a20404] text-[14px] text-white font-bold py-[6px] px-[10px] rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlartMolad;

          