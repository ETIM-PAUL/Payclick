import { UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Logo from "../../assets/logo.svg";

const ClientTopNav = () => {
  return (
    <div className="bg-neutral-900 flex flex-col items-stretch pt-4">
      <div className="bg-neutral-900 flex w-full flex-col py-3 px-20 max-md:max-w-full max-md:px-5">
        <div className="self-stretc flex items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:mr-1.5">
          <img
            loading="lazy"
            src={Logo}
            className="aspect-[3.21] object-contain object-center w-[167px] overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-black relative text-base font-bold leading-5 whitespace-nowrap items-center my-auto w-fit px- py-1 rounded-md flex gap-3">
            <div className="flex items-center gap-4 bg-white py-2 px-5 rounded-lg">
              <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                <span className=" text-white">R</span>
              </div>
              <span>Red Coins: 500</span>
            </div>

            <div className="">
              <UserCircleIcon className="text-white w-16" />
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default ClientTopNav