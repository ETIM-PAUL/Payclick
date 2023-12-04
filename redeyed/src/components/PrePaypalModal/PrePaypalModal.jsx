import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function PrePaypalModal({ prePaypalModal, coinExchange, setCoinExchange, setPrePaypalModal, setPaypalModal }) {
  const [thirtyPercent, setThirtyPercent] = useState();
  const calculateRate = (value) => {
    setCoinExchange(value)
    const num = value * 0.30;
    setThirtyPercent(num);
  }

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={prePaypalModal} onClose={() => null} className="z-10 bg-white">
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
              className="bg-white w-full md:w-[600px] rounded-md text-black p-6"
            >
              <Dialog.Panel>
                <div className='flex items-center w-full justify-between'>
                  <Dialog.Title className="text-start block text-xl">Exchange Red Coins Through Paypal</Dialog.Title>
                  <div onClick={() => { setPrePaypalModal(false); setCoinExchange() }} className='text-xl cursor-pointer font-bold bg-black text-white h-8 w-8 flex justify-center rounded-[50%]'>
                    <span>x</span>
                  </div>
                </div>

                <div className='my-10 w-full'>
                  <input type='number' value={coinExchange}
                    min={1}
                    onChange={(e) => calculateRate(e.target.value)}
                    placeholder="Enter amount of coins you want to exchange" className="w-full border-black outline-black focus:outline-black focus:outline-0" />
                  <input disabled type='number' value={thirtyPercent} placeholder="How much will be send to your paypal" className="cursor-not-allowed w-full border-black outline-black focus:outline-black focus:outline-0 mt-5" />
                </div>


                <div className='flex w-full items-center gap-3 mt-10'>
                  <button disabled={(coinExchange === undefined || Number(coinExchange) === 0 || coinExchange === null) ? true : false} onClick={() => { setPaypalModal(true); setPrePaypalModal(false); setCoinExchange() }} className={`${!!coinExchange ? "hover:bg-red-800 cursor-pointer bg-red-500" : "cursor-not-allowed opacity-25"} w-full bg-red-500 text-white outline-0 p-3 rounded-[8px] font-bold`}>Preview Exchange</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default PrePaypalModal