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
import { useContractRead, useContractWrite } from "wagmi";
import { toast } from "react-toastify";

const SignAttendance = () => {
  const { addr } = useParams();
  const [isChecked, setIsChecked] = useState(false);
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
    functionName: "markAttendance",
    onSuccess(data) {
      console.log(data)
      toast.success("Attendance marked");
    },
    onError(error) {
      console.log(error)
      toast.error("already marked || jrpc error");
    },
  });
  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    setIsChecked(!isChecked);
  };
  const handleAttendance = (e) => {
    e.preventDefault();
    if(!isChecked){
      toast.error('check the checkbox')
    }else{
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
            <TopNav heading="Sign Attendance" />

            <div className="bg-stone-950 flex flex-col px-20 py-12 items-start max-md:px-5">
              <div className="items-center self-center flex w-[306px] max-w-full gap-5 mt-5 max-md:mt-10">
                <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap my-auto">
                  Date:
                </div>

                {/* Please show current date rime in this space */}
                <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                  {currentDate()}
                </div>
              </div>
              <div className="items-stretch self-center flex w-[306px] max-w-full justify-between gap-5 mt-16 pr-3 max-md:mt-10">
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="text-white text-center text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                  Click to mark attendance for today
                </div>
              </div>
              <div
                onClick={handleAttendance}
                className="text-black text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch bg-emerald-300 self-center mt-24 mb-80 px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5"
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default SignAttendance;
