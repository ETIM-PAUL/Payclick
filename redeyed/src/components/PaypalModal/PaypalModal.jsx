import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Logo from "../../assets/logo.svg";

function PaypalModal({ paypalModal, coinExchange, setCoinExchange, setPaypalModal }) {
  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={paypalModal} onClose={() => null} className="z-10 bg-white">
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
                {/* <div className='flex items-center w-full justify-between'>
                  <Dialog.Title className="text-start block text-xl">Paypal Preview</Dialog.Title>
                  <div onClick={() => { setPaypalModal(false); setCoinExchange() }} className='text-xl cursor-pointer font-bold bg-black text-white h-8 w-8 flex justify-center rounded-[50%]'>
                    <span>x</span>
                  </div>
                </div> */}
                <div className="flex bg-neutral-900 px-4 rounded-md items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap w-full max-md:mr-1.5">
                  <img
                    loading="lazy"
                    src={Logo}
                    className="w-[167px] overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black relative text-base font-bold leading-5 whitespace-nowrap items-center my-auto w-fit px- py-1 rounded-md flex gap-3">
                    <div className="flex items-center gap-4 bg-white py-2 px-5 rounded-lg">
                      <span>Paypal Preview</span>
                    </div>
                  </div>
                </div>

                <div className='inline-grid text-start w-full mt-10'>
                  <h4>Bill to</h4>

                  <div className='inline-grid mt-2 space-y-1 font-medium'>
                    <span>Your name: Ryan Wong</span>
                    <span>Your email address: ryanwong@gmail.com</span>
                  </div>
                </div>

                <div className="relative overflow-x-aut mt-10">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 hidden md:block">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden md:block">
                          Redeyed coins
                        </td>
                        <td className="px-6 py-4">
                          10
                        </td>
                        <td className="px-6 py-4">
                          500
                        </td>
                        <td className="px-6 py-4">
                          $5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>


                <div className='flex w-full items-center gap-3 mt-10'>
                  <button onClick={() => { setPaypalModal(false); setCoinExchange() }} className="hover:bg-zinc-800 cursor-pointer w-full bg-zinc-500 text-white outline-0 p-3 rounded-[8px] font-bold">Cancel</button>
                  <button onClick={() => { setPaypalModal(true); setCoinExchange() }} className="hover:bg-red-800 cursor-pointer w-full bg-red-500 text-white outline-0 p-3 rounded-[8px] font-bold">Withdraw Coins</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default PaypalModal