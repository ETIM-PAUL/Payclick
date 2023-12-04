import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import childABI from '../const/childFact.json'
import { GlobalContext } from '../context/GlobalContext';

export function FundModal({ setShowFundModal, showFundModal }) {
  const {state} =useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(true)
  const [num, setNum] = useState('')



  const { config } = usePrepareContractWrite({
    address: state.childAddress,
    abi: childABI,
    functionName: 'depositFund',
    args:[num]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleSubmit=(e)=>{
    e.preventDefault();
    write?.()
  }

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={showFundModal} onClose={() => null} className="z-10 bg-white">
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
                <Dialog.Title className="text-start block text-3xl">Fund Account</Dialog.Title>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  Amount funded into your account will be added directly from connected wallet
                </Dialog.Description>

                <div className='my-20 w-full mx-auto'>
                  <p className='text-center block w-full'>
                    Enter amount to add to your account
                  </p>
                  <input type="number" onChange={(e)=>setNum(e.target.value)} placeholder="$0.00" className='bg-transparent focus:outline-non border-white mt-4 text-3xl font-bold appearance-none text-center bg-red-500' />
                </div>

                <div className='flex justify-between items-center mt-24'>
                  <span>Wallet Address: Asdhj6823hdjhdj</span>
                  <IoCopyOutline className='text-2xl cursor-pointer' />
                </div>

                <div className='flex w-full items-center gap-3 mt-16'>
                  <button onClick={() => setShowFundModal(false)} className="w-full bg-zinc-500 text-white p-3 rounded-[8px]">Cancel</button>
                  <button onClick={() => setIsOpen(false)} className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Fund Account</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}