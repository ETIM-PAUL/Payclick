import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { GlobalContext } from '../context/GlobalContext';
import childABI from '../const/childFact.json'
import { toast } from 'react-toastify';
import { TestTokenAddr } from '../const/contract';
import { useParams } from 'react-router-dom';
import tokenABI from "../const/token.json";
import { formatUnits } from 'viem';

export function RepayLoan({ setShowWithdrawnModal, showWithdrawnModal }) {
  const { address } = useAccount();
  const [num, setNum] = useState('')
  const { state } = useContext(GlobalContext)
  const [err, setErr] = useState("");
  const { addr } = useParams();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addr,
    abi: childABI,
    functionName: 'paybackLoan',
    args: [address],
    onSuccess(data) {
      console.log('Success', data)
      setShowWithdrawnModal(false)
      toast.success("Transaction Successful");

    },
  })

  const { data: daiLoan, isError } = useContractReads({
    contracts: [
      {
        address: addr,
        abi: childABI,
        functionName: "ghoPayback",
        args: [address],
        onSuccess(data) {
          toast.success('Amount Approved');
          setNum(Number(formatUnits(daiLoan[0]?.result, 18)));
        },
      },
    ]
  });

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    write: approveWrite,
  } = useContractWrite({
    address: TestTokenAddr,
    abi: tokenABI,
    functionName: "approve",
    args: [addr, daiLoan && daiLoan[0]?.result],
    onSuccess(approveData) {
      toast.success('Amount Approved');
      write?.();
    },
    onError() {
      setErr("Error Occur when approving contract");
    },
  });
  // const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr('')
    approveWrite?.()

  }
  //  onClick={() => setShowWithdrawnModal(false)} 
  console.log(daiLoan)
  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={showWithdrawnModal} onClose={() => null} className="z-10 bg-white">
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
                {isLoading ? (
                  <div className="flex tems-center mt-[200px] absolute ">
                    <span className="relative flex h-20 w-20 ml-[250px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-20 w-20 bg-[#63D9B9]"></span>
                    </span>
                  </div>
                ) : null}
                <Dialog.Title className="text-start block text-3xl">Repay Loan</Dialog.Title>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  You will paying back the loan in DAI Tokens with this amount {daiLoan && formatUnits(daiLoan[0]?.result, 18)}
                </Dialog.Description>
                {err !== "" && (
                  <h2 className=" w-[100%] bg-[red] text-white text-center text-[16px]  h-[30px]  mt-10 ">
                    {err}
                  </h2>
                )}

                <div className='flex w-full items-center gap-3 mt-16'>
                  <button onClick={() => setShowWithdrawnModal(false)} className="w-full bg-zinc-500 text-white p-3 rounded-[8px]">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Repay</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}