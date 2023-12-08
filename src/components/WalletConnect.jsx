/** @format */

import React, { useRef, useState } from "react";
import CustomWallet from "./CustomWallet";

export default function WalletConnect() {
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <main>

        <div className="w-[90%] mx-auto">
  

          <h2 className="pt-8 text-[36px] leading-[40px] text-white font-bold">
            Connect Wallet
          </h2>
          <p className="text-[#FEFEFE] text-[12px] leading-4 tracking-[0.4px] h-5 mt-2 font-normal">
            Choose how you want to connect. There are several wallet providers
          </p>

          <CustomWallet />
        </div>
 
    </main>
  );
}
