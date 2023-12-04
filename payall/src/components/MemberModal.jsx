import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";

export function MemberModal({ setMemberAdd, memberAdd }) {

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={memberAdd} onClose={() => null} className="z-10 bg-white">
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
                  <Dialog.Title className="text-start block text-3xl">Add Member</Dialog.Title>
                  <span onClick={() => setMemberAdd(false)} className='font-bold text-right text-xl mb-2 cursor-pointer'>x</span>
                </div>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  Members added can be scheduled to get their salary paid on a set date and time
                </Dialog.Description>

                <form className='my-10 block text-start w-full'>
                  <div className='mb-2 w-full'>
                    <p className=''>
                      Full Name
                    </p>
                    <input type="text" placeholder="Member Name" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                  <div className='mb-2 mt-4 w-full'>
                    <p className=''>
                      Email Address
                    </p>
                    <input type="email" placeholder="Member Email" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                  <div className='mb-2 mt-4 w-full'>
                    <p className=''>
                      Wallet Address
                    </p>
                    <input type="text" placeholder="$0.00" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                  <div className='mb-2 mt-4 w-full'>
                    <p className=''>
                      Position
                    </p>
                    <input type="text" placeholder="$0.00" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                  <div className='mb-2 mt-4 w-full'>
                    <p className=''>
                      Salary
                    </p>
                    <input type="number" placeholder="Salary in Dollars($)" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                  </div>
                </form>

                <div className='flex w-full items-center gap-3 mt-16'>
                  <button onClick={() => setMemberAdd(false)} className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Add Member</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}