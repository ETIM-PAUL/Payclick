import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const MemberMiniActionModal = ({ setMiniActionModal, miniActionModal, setRemoveModal, setRemoveType }) => {
  return (
    // <Transition
    //   appear
    //   show={true}
    //   as={Fragment}
    // >
    //   <Dialog open={miniActionModal} onClose={() => null} className="z-10 bg-white">
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black bg-opacity-25" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //           className="bg-red-800 rounded-md w-full text-white  p-4"
    //         >
    //           <Dialog.Panel>
    <div className='bg-zinc-500 p-3 rounded-md'>

      <div className="inline-grid text-white">
        <span onClick={() => setMiniActionModal(false)} className='font-bold text-right text-xl mb-2 cursor-pointer'>x</span>
        <span onClick={() => { setRemoveModal(true); setRemoveType("member"); setMiniActionModal(false) }} className='mb-2 cursor-pointer hover:bg-white hover:text-black rounded-md p-1'>Remove member</span>
        <span onClick={() => { setRemoveModal(true); setRemoveType("payment"); setMiniActionModal(false) }} className='cursor-pointer hover:bg-white hover:text-black rounded-md p-1'>Cancel payment</span>
      </div>
    </div>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
  )
}

export default MemberMiniActionModal