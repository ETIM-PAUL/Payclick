/* eslint-disable no-unused-vars */
/** @format */

import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { currentDate } from "../utils";
import { useParams } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import childABI from "../const/childFact.json";
import { useAccount, useContractRead, useContractReads, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { DepositVault } from "../components/DepositVault";
import { WithdrawModal } from "../components/WithdrawModal";
import { WithdrawVault } from "../components/WithdrawVault";
import { BorrowLoanModal } from "../components/BorrowLoanModal";
import { RepayLoan } from "../components/RepayLoan";
import { formatUnits } from "viem";

const MemberLoan = () => {
  const { addr } = useParams();
  const { address } = useAccount();
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false)

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: addr,
        abi: childABI,
        functionName: "companyDetails",
      },
      {
        address: addr,
        abi: childABI,
        functionName: "loanBalance",
        args: [address],
      },
      {
        address: addr,
        abi: childABI,
        functionName: "previewEstimatedLoan",
        args: [address],
      },
    ]
  });

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
          <span className="font-bold text-xl">{data?.length > 0 && data[0]?.result[0]}</span>
        </div>
        <ConnectButton />
      </div>
      <div className="gap-5  max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
            <TopNav heading="Vault" />


            <div className="bg-stone-950 flex flex-col px-20 py-12 items-start max-md:px-5">
              <div className="flex gap-4 justify-center w-full">
                <div className="items-center justify-between bg-gray-500 p-6 rounded-md self-center flex w-full md:w-[250px] gap-5 mt-5 max-md:mt-10">
                  <div>
                    <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap my-auto">
                      Loan Limit
                    </div>

                    {/* Please show current date rime in this space */}
                    <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                      <span className="font-bold text-xl">{data?.length > 0 && data[2]?.result ? formatUnits(data[2]?.result, 18) : 0} GHO</span>
                    </div>
                  </div>
                </div>
                <div className="items-center justify-between bg-gray-500 p-6 rounded-md self-center flex w-full md:w-[250px] gap-5 mt-5 max-md:mt-10">
                  <div>
                    <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap my-auto">
                      Current Outstanding
                    </div>

                    {/* Please show current date rime in this space */}
                    <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                      {data?.length > 0 && formatUnits(data[1]?.result, 18)} GHO
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-10 flex gap-4 justify-center w-full">
                <div
                  onClick={() => setShowDepositModal(true)}
                  className="cursor-pointer text-black text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch bg-emerald-300 self-center px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5"
                >
                  Borrow GHO
                </div>
                <div
                  onClick={() => setShowWithdrawnModal(true)}
                  className="cursor-pointer text-emerald-300 text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch border-emerald-500 border self-center px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5"
                >
                  Pay Back
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Modal */}
      {showDepositModal && (
        <BorrowLoanModal
          setShowDepositModal={setShowDepositModal}
          showDepositModal={showDepositModal}
        />
      )}

      {/* withdraw modal */}
      {showWithdrawnModal && (
        <RepayLoan
          setShowWithdrawnModal={setShowWithdrawnModal}
          showWithdrawnModal={showWithdrawnModal}
        />
      )}

    </div>
    // </Layout>
  );
};

export default MemberLoan;
