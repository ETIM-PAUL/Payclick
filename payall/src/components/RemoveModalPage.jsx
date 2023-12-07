import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";

export function RemoveModalPage({ setRemoveModal, removeModal, removeType }) {

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={removeModal} onClose={() => null} className="z-10 bg-white">
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
                <div className='flex justify-between items-center'>
                  <Dialog.Title className="text-start block text-3xl">Are you sure</Dialog.Title>
                  <span onClick={() => setRemoveModal(false)} className='font-bold text-right text-xl mb-2 cursor-pointer'>x</span>
                </div>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  {removeType === "member" ? "Are you sure you want to remove Ella Roberts? They will be remove from your PayCheck members"
                    :
                    "Are you sure you want to cancel salary scheduled for Ella Roberts? They will not be able to get their scheduled anymore"
                  }
                </Dialog.Description>

                <div className='flex w-full items-center gap-3 mt-16'>
                  {removeType === "member" ?
                    <button onClick={() => setRemoveModal(false)} className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Remove</button>
                    :
                    <button onClick={() => setRemoveModal(false)} className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Cancel</button>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}