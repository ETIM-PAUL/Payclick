import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  PaymentElement,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

export function StripeModal({ clientSecret, paymentIntent, stripeModal, setStripeModal, amount, setAmount }) {

  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={stripeModal} onClose={() => null} className="z-10 bg-white">
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
                  <Dialog.Title className="text-start block text-xl">Buy Red Coins</Dialog.Title>
                  <div onClick={() => setStripeModal(false)} className='text-xl cursor-pointer font-bold bg-black text-white h-8 w-8 flex justify-center rounded-[50%]'>
                    <span>x</span>
                  </div>
                </div>

                <div className='my-10 w-full'>
                  <div>
                    <div className='mt-3 md:flex justify-between text-start w-full'>
                      <p className=''>
                        Subtotal
                      </p>
                      <span>$500.00</span>
                    </div>
                    <hr className='bg-black mt-2' />
                  </div>
                  <div>
                    <div className='mt-3 md:flex justify-between text-start w-full'>
                      <p className=''>
                        Tax
                      </p>
                      <span>$14.00</span>
                    </div>
                    <hr className='bg-black mt-2' />
                  </div>
                  <div>
                    <div className='mt-3 md:flex justify-between text-start w-full'>
                      <p className=''>
                        Total
                      </p>
                      <span>$514.00</span>
                    </div>
                    <hr className='bg-black mt-2' />
                  </div>

                </div>

                <PaymentElement
                  id="payment-element"
                  options={paymentElementOptions}
                />


                <div className='flex w-full items-center gap-3 mt-16'>
                  <button disabled onClick={() => setStripeModal(false)} className={`cursor-not-allowed opacity-25 w-full bg-red-500 text-white p-3 rounded-[8px]`}>Pay Now</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}