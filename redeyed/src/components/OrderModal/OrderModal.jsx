import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export function OrderModal({ showOfferModal, type, setShowOfferModal, orderValue }) {

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={showOfferModal} onClose={() => null} className="z-10 bg-white">
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
                <Dialog.Title className="text-start block text-3xl">{type === "buy" ? "Purchase Confirmation" : "Offer Confirmation"}</Dialog.Title>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  Video: #20AB
                </Dialog.Description>

                <div className='my-10'>
                  <div className='mt-3 md:flex justify-between text-start w-full'>
                    <div className='w-full'>
                      <p className=''>
                        From
                      </p>
                      <span>JohnDoe1</span>
                    </div>
                    <div className='w-full'>
                      <p className=''>
                        To
                      </p>
                      <span>RyanWong2</span>
                    </div>
                  </div>
                  <div className='my-3 md:flex justify-between text-start w-full'>
                    <div className='w-full'>
                      <p className=''>
                        Price
                      </p>
                      <div className='flex gap-2 pt-2 items-center'>
                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                          <span className=" text-white">R</span>
                        </div>
                        <span>200</span>
                      </div>
                    </div>

                    <div className='w-full'>
                      <p className=''>
                        You pay
                      </p>
                      <div className='flex gap-2 pt-2 items-center'>
                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                          <span className=" text-white">R</span>
                        </div>
                        <span>{type === "order" ? orderValue : 200}</span>
                      </div>
                    </div>

                  </div>

                </div>

                <div className='block'>
                  <h3 className="text-start block text-3xl">Purchase Agreement</h3>
                  <p className="text-start block text-base w-full mt-2">
                    All sales are final, once transferred property for this item will pass to the buyer account. Buyer will be able to download this video to use and reproduce at buyer’s discretion.
                  </p>
                </div>


                <div className='flex w-full items-center gap-3 mt-16'>
                  <button onClick={() => setShowOfferModal(false)} className="w-full bg-zinc-500 text-white p-3 rounded-[8px]">Cancel</button>
                  <button onClick={() => setShowOfferModal(false)} className="w-full bg-red-500 text-white p-3 rounded-[8px]">Confirm Order</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}