/** @format */

import React, { useEffect, useRef, useState } from "react";
import { WalletButton } from '@rainbow-me/rainbowkit';
import imgLogo from "../assets/gallery-import.svg";
import WalletConnect from "./WalletConnect";
import main from "../utils/upload.mjs";
import PayClickABI from "../const/payclickFact.json";
import { FactoryAddr, TestTokenAddr } from "../const/contract";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function SignUpComp() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [logoURI, setLogoURI] = useState("");
  const [certURI, setCertURI] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [myLoading, setMyLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [cert, setCert] = useState(null);

  const hiddenFileInput = useRef(null);
  const handleCert = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleCertClick = (event) => {
    handleCert.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCert(file);
  };
  const handleCertChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  function createNFTName(orgName) {
    // Convert to lowercase and remove spaces
    const cleanedName = orgName.toLowerCase().replace(/\s/g, "");

    // Add a random suffix to make it unique
    const randomSuffix = Math.floor(Math.random() * 1000);
    const nftName = cleanedName + randomSuffix;

    return nftName;
  }

  function generateRandomSymbol(orgName) {
    const characters = orgName;
    let symbol = "";

    // Generate a random 3-character symbol
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      symbol += characters.charAt(randomIndex);
    }

    return symbol;
  }

  const nftName = createNFTName(orgName);
  const nftSymbol = generateRandomSymbol(orgName);
  const handleLogoUpload = async () => {
    await main(selectedFile, orgName, `${orgName} logo`).then((data) => {
      setLogoURI(data.ipnft);
    });
  };
  const handleCertUpload = async () => {
    await main(cert, nftName, `${nftName} uri`).then((data) => {
      setCertURI(data.ipnft);
    });
  };

  const { config } = usePrepareContractWrite({
    address: FactoryAddr,
    abi: PayClickABI,
    functionName: "createAccount",
    args: [TestTokenAddr, nftName, nftSymbol, certURI, orgName, logoURI, email],
    onError(error) {
      setErrMsg(error);
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });


  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const { data: readAcct, isError: readError, isLoading: readLoading } = useContractRead({
    address: FactoryAddr,
    abi: PayClickABI,
    functionName: 'showMyAcct',
    args: [address]
  })


  const handleSubmit = () => {
    setErrMsg("");

    if (orgName === "" || email === "" || selectedFile === null || cert === null) {
      setErrMsg("All Fields Required");
    } else {
      setMyLoading(true);
      handleLogoUpload();
      handleCertUpload();
      write?.();
      setMyLoading(false);
    }
  };
  useEffect(()=>{
    if(address){

      if(readAcct!=='0x0000000000000000000000000000000000000000'){
       navigate("/dashboard")
      } 
    }
  },[address, readAcct])

  return (
    <main>
      {errMsg !== "" && <h2 className=" w-[36%] bg-[red] text-white text-center text-[16px]  h-[30px] ml-20 mt-10 ">{errMsg}</h2>}
      {myLoading ||
        isLoading && (
          <div className="flex justify-center items-center w-[36%] mt-[300px] absolute ">

            <span className="relative flex h-20 w-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-20 w-20 bg-[#63D9B9]"></span>
            </span>
          </div>
        )}
      {!next ? (
        <div className="bg-[black] formBackground w-[36%] ml-20 mt-10 rounded-lg pb-10">
          <div className="w-[90%] mx-auto">
            <h2 className="pt-8 text-[36px] leading-[40px] text-white font-bold">
              Sign Up
            </h2>
            <p className="text-[#FEFEFE] text-[12px] leading-4 tracking-[0.4px] h-5 mt-2 font-normal">
              New to Payclick, create an account with few clicks
            </p>

            <form>
              <div className="mt-8">
                <label className="text-[12px] leading-5 font-normal tracking-[0.4px] text-[#F1F1F1]">
                  Organization Name
                </label>{" "}
                <br />
                <input
                  type="text"
                  placeholder="Fourth Canvas"
                  className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1] border-[1px] outline-[#F1F1F1] rounded-lg border-[#F1F1F1] bg-transparent outline-1 w-[100%] h-[46px] px-[10px] "
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <label className="text-[12px] leading-5 font-normal tracking-[0.4px] text-[#F1F1F1]">
                  Organization Email Address
                </label>{" "}
                <br />
                <input
                  type="text"
                  placeholder="FourthCanvas@mail.com"
                  className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1] border-[1px] outline-[#F1F1F1] rounded-lg border-[#F1F1F1] bg-transparent outline-1 w-[100%] h-[46px] px-[10px]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <label className="text-[12px] leading-5 font-normal tracking-[0.4px] text-[#F1F1F1]">
                  Organization Logo
                </label>{" "}
                <br />
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={hiddenFileInput}
                  className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1] border-[1px] outline-[#F1F1F1] rounded-lg border-[#F1F1F1] bg-transparent outline-1 w-[100%] h-[46px]  hidden"
                />
                <div
                  className="w-[100%] h-[46px] border-[1px] rounded-lg border-spacing-2 border-dashed px-[10px] flex justify-between items-center cursor-pointer"
                  onClick={handleClick}
                >
                  <h2 className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1]">
                    {" "}
                    Upload image{" "}
                  </h2>
                  <img
                    src={imgLogo}
                    alt="upload image"
                    className="w-[16px] h-[16px]"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="text-[12px] leading-5 font-normal tracking-[0.4px] text-[#F1F1F1]">
                  Monthly certificate
                </label>{" "}
                <br />
                <input
                  type="file"
                  onChange={handleCertChange}
                  ref={handleCert}
                  className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1] border-[1px] outline-[#F1F1F1] rounded-lg border-[#F1F1F1] bg-transparent outline-1 w-[100%] h-[46px]  hidden"
                />
                <div
                  className="w-[100%] h-[46px] border-[1px] rounded-lg border-spacing-2 border-dashed px-[10px] flex justify-between items-center cursor-pointer"
                  onClick={handleCertClick}
                >
                  <h2 className="text-[12px] font-normal leading-5 tracking-[0.4px] text-[#F1F1F1]">
                    {" "}
                    Upload image{" "}
                  </h2>
                  <img
                    src={imgLogo}
                    alt="upload image"
                    className="w-[16px] h-[16px]"
                  />
                </div>
              </div>

              <button
                onClick={() => setNext(true)}
                className="bg-[#63D9B9] w-[100%] h-[52px] rounded-lg text-[16px] font-medium tracking-[0.15px] text-center text-[#010101] mt-[80px]
"
              >
                Next Step
              </button>
              <div className="mt-3">
                <h2 className="text-[12px] leading-5 text-[#FEFEFE] font-medium text-center ">
                  Already have an account? Proceed to{" "}
                  <span className="text-[#63D9B9]">
                  <WalletButton.Custom wallet="metamask">
        {({ ready, connect }) => {
          return (
            <>
        

            <button
              type="button"
              disabled={!ready}
              onClick={()=>{connect(); setMMask(true), setConnected(true)}}
              className="">
               Connect Wallet
            </button>
           
            </>
          );
        }}
      </WalletButton.Custom>
                   </span>{" "}
                </h2>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-[black] formBackground w-[36%] ml-20 mt-10 rounded-lg pb-10">
          <WalletConnect />
          <div className="w-[90%] mx-auto">
            <button
              onClick={() => setNext(false)}
              className={` bg-[#63D9B9] w-[100%] h-[52px] rounded-lg text-[16px] font-medium tracking-[0.15px] text-center text-[#010101] mt-[80px]
`}
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!address}
              className={`${!address ? "bg-[#365d53]" : "bg-[#63D9B9] "
                }  text-[#010101] w-[100%] h-[52px] rounded-lg text-[16px] font-medium tracking-[0.15px] text-center  mt-4
`}
            >
              Create Account
            </button>
            <div className="mt-3">
              <h2 className="text-[12px] leading-5 text-[#63D9B9] font-medium text-center ">
                Need help creating a wallet?
              </h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
