/** @format */

import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCopyOutline } from "react-icons/io5";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import childABI from "../const/childFact.json";
import tokenABI from "../const/token.json";
import { GlobalContext } from "../context/GlobalContext";
import { TestTokenAddr } from "../const/contract";

export function FundModal({ setShowFundModal, showFundModal }) {
  const { state } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(true);
  const [num, setNum] = useState("");
  const [fullnum, setFullNum] = useState("");
  const { address } = useAccount();
  const [err, setErr]= useState('')

  const { data, isLoading, isSuccess, write  } = useContractWrite({
    address: state.childAddress,
    abi: childABI,
    functionName: "depositFund",
    args: [Number(num) * 1e18],
    onSuccess(data) {
      console.log("Success", data);

    },
    onError(error){
setErr(error)
    }
  })

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    write: approveWrite,
  } = useContractWrite({
    address: TestTokenAddr,
    abi: tokenABI,
    functionName: "approve",
    args: [state.childAddress, Number(num) * 1e18],
    onSuccess(data) {
      console.log("Success", data);
      write?.();
    },
  });

;


  const handleSubmit = (e) => {
    e.preventDefault();
    if(Number(num)===0){
      setErr('INPUT CAN NOT BE EMPTY')
    }else{
console.log('clicked')
      approveWrite?.();
    }
  
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        open={showFundModal}
        onClose={() => null}
        className="z-10 bg-white"
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
              className="bg-zinc-800 rounded-md text-white p-6"
            >
              <Dialog.Panel>
                {isLoading || approveLoading &&
                <div className="flex tems-center mt-[200px] absolute ">
                  <span className="relative flex h-20 w-20 ml-[250px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-20 w-20 bg-[#63D9B9]"></span>
                  </span>
                </div>
                }
              
                <Dialog.Title className="text-start block text-3xl">
                  Fund Account
                </Dialog.Title>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  Amount funded into your account will be added directly from
                  connected wallet
                </Dialog.Description>
                {err !== '' &&
                <h2 className=" w-[100%] bg-[red] text-white text-center text-[16px]  h-[30px]  mt-10 ">{err}</h2>
                }

                <div className="my-20 w-full mx-auto">
                  <p className="text-center block w-full">
                    Enter amount to add to your account
                  </p>
                  <input
                    type="number"
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="$0.00"
                    className="bg-transparent focus:outline-non border-white mt-4 text-3xl font-bold appearance-none text-center bg-red-500"
                  />
                </div>

                <div className="flex justify-between items-center mt-24">
                  <span>Wallet Address: {address}</span>
                  <IoCopyOutline className="text-2xl cursor-pointer" />
                </div>

                <div className="flex w-full items-center gap-3 mt-16">
                  <button
                    onClick={() => setShowFundModal(false)}
                    className="w-full bg-zinc-500 text-white p-3 rounded-[8px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]"
                  >
                    Fund Account
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
