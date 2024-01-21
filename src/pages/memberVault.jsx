/* eslint-disable no-unused-vars */
/** @format */

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import TopNav from "../components/TopNav";
import { Link, useParams } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import childABI from "../const/childFact.json";
import { useContractRead, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { DepositVault } from "../components/DepositVault";
import { WithdrawVault } from "../components/WithdrawVault";
import { GlobalContext } from "../context/GlobalContext";

const MemberVault = () => {
  const { addr } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const { dispatch, state } = useContext(GlobalContext)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false)

  const { data, isError, isLoading } = useContractRead({
    address: addr,
    abi: childABI,
    functionName: "companyDetails",
  });


  const {
    data: writeData,
    isLoading: writeLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: addr,
    abi: childABI,
    functionName: "buyShares",
    onSuccess(data) {
      console.log(data)
      toast.success("Dai Tokens Deposited successfully");
    },
    onError(error) {
      console.log(error)
      toast.error("jrpc error");
    },
  });
  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    setIsChecked(!isChecked);
  };
  const handleAttendance = (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error('check the checkbox')
    } else {
      write?.();
    }
  };
  return (
    // <Layout>
    <div className="bg-stone block pb-20 px-10">
      <div className="flex items-center justify-between mt-6">
        <div className="hidden justify-start text-white items-center md:flex ">
          <img
            loading="lazy"
            srcSet={logo}
            className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full rounded-[50%]"
          />
          <span className="font-bold text-xl">{data[0]}</span>
        </div>
        <ConnectButton />
      </div>
      <div className="gap-5  max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
            <TopNav heading="Vault" />

            <div className="bg-stone-950 flex flex-col px-20 py-12 items-start max-md:px-5">
              <div className="items-center justify-between bg-gray-500 p-6 rounded-md self-center flex w-full gap-5 mt-5 max-md:mt-10">
                <div>
                  <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap my-auto">
                    Vault Balance
                  </div>

                  {/* Please show current date rime in this space */}
                  <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                    100 DAI
                  </div>
                </div>

                <Link to={`/member_loan/${state?.childAddress}`} className="text-wite flex items-center">
                  <span className="font-bold text-emerald-300">Explore Loan</span>
                  <div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c359de759ff8baca0cacf2280a3984f0a2dcdab65d40a060dd65b7e2c108df2d?"
                      className="text-black aspect-square object-contain object-center w-[34px] justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full"
                    />
                  </div>
                </Link>
              </div>

              <div className="mt-10 flex gap-4 justify-center w-full">
                <div
                  onClick={() => setShowDepositModal(true)}
                  className="cursor-pointer text-black text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch bg-emerald-300 self-center px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5"
                >
                  Buy Shares
                </div>
                <div
                  onClick={() => setShowWithdrawnModal(true)}
                  className="cursor-pointer text-emerald-300 text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch border-emerald-500 border self-center px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5"
                >
                  Claim Shares
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Modal */}
      {showDepositModal && (
        <DepositVault
          setShowDepositModal={setShowDepositModal}
          showDepositModal={showDepositModal}
        />
      )}

      {/* withdraw modal */}
      {showWithdrawnModal && (
        <WithdrawVault
          type="vault"
          setShowWithdrawnModal={setShowWithdrawnModal}
          showWithdrawnModal={showWithdrawnModal}
        />
      )}

    </div>
    // </Layout>
  );
};

export default MemberVault;
