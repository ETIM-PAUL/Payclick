import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { GlobalContext } from '../context/GlobalContext';
import childABI from '../const/childFact.json'
import { toast } from 'react-toastify';
import { TestTokenAddr } from '../const/contract';
import { useParams } from 'react-router-dom';

export function WithdrawVault({ setShowWithdrawnModal, showWithdrawnModal }) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('')
  const [destAddress, setAddr] = useState('');
  const { addr } = useParams();
  const [err, setErr] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addr,
    abi: childABI,
    functionName: 'withdrawShares',
    args: [address, TestTokenAddr],
    onSuccess(data) {
      console.log('Success', data)
      setShowWithdrawnModal(false)
      toast.success("Transaction Successful");

    },
  })
  // const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const {
    data: approveWait,
    isError: approveWaitErr,
    isLoading: approvewaitLoad,
  } = useWaitForTransaction({
    hash: data?.hash,
    onError() {
      setErr("Error Occur, Check your balance");
    },

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr('')
    console.log('clicked')
    if (amount === '' || destAddress === '') {
      setErr('All Fields Required');
    } else {

      write?.()
    }
  }
  //  onClick={() => setShowWithdrawnModal(false)} 
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
                {isLoading ||
                  approvewaitLoad ? (
                  <div className="flex tems-center mt-[200px] absolute ">
                    <span className="relative flex h-20 w-20 ml-[250px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-20 w-20 bg-[#63D9B9]"></span>
                    </span>
                  </div>
                ) : null}
                <Dialog.Title className="text-start block text-3xl">Withdraw From Vault</Dialog.Title>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  amount desired will be sent out to the added address below
                </Dialog.Description>
                {err !== "" && (
                  <h2 className=" w-[100%] bg-[red] text-white text-center text-[16px]  h-[30px]  mt-10 ">
                    {err}
                  </h2>
                )}


                <div className='my-20 block text-start w-full'>
                  <div className='mb-2 w-full'>
                    <p className=''>
                      Amount to Withdraw
                    </p>
                    <input type="number" placeholder="0 DAI" onChange={(e) => setAmount(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-3xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                  <div className='mb-2 mt-4 w-full'>
                    <p className=''>
                      Withdraw Destination (DAI Wallet)
                    </p>
                    <input type="text" placeholder="$0.00" onChange={(e) => setAddr(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-3xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                </div>

                <div className='flex w-full items-center gap-3 mt-16'>
                  <button onClick={() => setShowWithdrawnModal(false)} className="w-full bg-zinc-500 text-white p-3 rounded-[8px]">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Withdraw Funds</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}