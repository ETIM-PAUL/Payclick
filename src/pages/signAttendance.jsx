/* eslint-disable no-unused-vars */
/** @format */

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { currentDate } from "../utils";
import { Link, useParams } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import childABI from "../const/childFact.json";
import { useContractRead, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const SignAttendance = () => {
  const { addr } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const { dispatch, state } = useContext(GlobalContext)
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
            <div className="flex items-center justify-between">
              <TopNav heading="Attendance" />

              <div className="flex gap-10">
                <Link to={`/member_vault/${state?.childAddress}`}
                  className="flex text-emerald-300 text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-center border-emerald-500 border self-center px-5 py-3.5 rounded-lg mt-10 max-md:px-5"
                >
                  <span>View Vault</span>
                  <div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c359de759ff8baca0cacf2280a3984f0a2dcdab65d40a060dd65b7e2c108df2d?"
                      className="text-black aspect-square object-contain object-center w-[34px] justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full"
                    />
                  </div>
                </Link>
                {/* <div
                  onClick={handleAttendance}
                  className="flex text-emerald-300 text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-center border-emerald-500 border self-center px-5 py-3.5 rounded-lg mt-10 max-md:px-5"
                >
                  <span>Loan Asset</span>
                  <div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c359de759ff8baca0cacf2280a3984f0a2dcdab65d40a060dd65b7e2c108df2d?"
                      className="text-black aspect-square object-contain object-center w-[34px] justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full"
                    />
                  </div>
                </div> */}

              </div>
            </div>

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
