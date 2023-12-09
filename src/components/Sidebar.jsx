import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import dashboard from "../assets/dashboardicon.svg"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { GlobalContext } from '../context/GlobalContext'
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify'

export const Sidebar = () => {
  const { state } = useContext(GlobalContext);
  
  const copyToClipboard = () => {
    let copyText = `http://localhost:5173/sign-attendance/${state.childAddress}`;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("link copied");
    }
  };

  return (
    <>
      <div className="hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#19192E] scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full md:flex flex-col items-stretch  max-md:w-full max-md:ml-0">
        <div className="border-r-[color:var(--color-gray-900,#4E4E4E)] bg-stone-950 flex w-full grow flex-col mx-auto pl-11 pr-8 py-12 border-r-2 border-solid max-md:px-5">
          <div className="items-stretch flex w-[250px] max-w-full gap-5 ml-4 mt-2.5 self-start max-md:ml-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f39065ba-b0c5-4e01-8582-24c3a73fd8bf?"
              className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full" />
            <div className="text-white text-3xl font-semibold leading-10 grow whitespace-nowrap">
              Payclick
            </div>
          </div>
          <div>

          </div>
          <div className="text-neutral-400 text-base font-medium leading-6 tracking-normal pl-6 whitespace-nowrap mt-24 max-md:mt-10">
            Admin Tools
          </div>

          <NavLink to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
            }

          >
            <img
              loading="lazy"
              src={dashboard}
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
            <div className="text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
              Dashboard
            </div>
          </NavLink>

          <div className="self-center flex w-60 max-w-full flex-col items-stretch text-black">
            <NavLink to="/activity"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4855e76b-91ec-418b-985d-86b8a66dc0a4?"
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
              <div className="text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                Activity
              </div>
            </NavLink>

            <NavLink to="/schedule"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/23a13eba-9c97-4e69-9980-a2b7690d0d17?"
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
              <div className="text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                Schedule
              </div>
            </NavLink>
            <NavLink to="/sign-attendance"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/23a13eba-9c97-4e69-9980-a2b7690d0d17?"
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
              <div className="text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                Sign Attendance
              </div>
            </NavLink>

            <NavLink to="/members"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe4a6f6-266c-43f7-8761-81857d1f4832?"
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
              <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                Members
              </div>
            </NavLink>

            <NavLink to="/payouts"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-emerald-300 items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-black rounded-lg max-md:px-5" : "items-stretch self-center flex w-60 max-w-full gap-2 mt-2 pl-8 pr-20 py-3.5 text-white rounded-lg max-md:px-5"
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c592dee-7dc4-46c4-b53d-2b4efa48e229?"
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
              <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                Payouts
              </div>
            </NavLink>
          </div>

          {/* Insights */}
          <div className="bg-neutral-600 self-stretch shrink-0 h-px mt-32 max-md:mt-10" />
          <div className="text-neutral-400 text-base font-medium leading-6 tracking-normal pl-4 whitespace-nowrap mt-6">
            Insights
          </div>
          <div className="items-stretch self-center flex ml-0 w-[125px] max-w-full gap-2 mt-6 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dd96801-498f-416e-b6ee-cab944035cdb?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
            <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
              Profile
            </div>
          </div>
          <div className="items-stretch self-center flex ml-0 w-[125px] max-w-full gap-2 mt-11 rounded-lg max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/626ddb79-a0fd-4e30-9754-743e5a22e317?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
            <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
              Notification
            </div>
          </div>
          <div className="items-stretch self-center flex ml-0 w-[125px] max-w-full gap-2 mt-11 rounded-lg max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f093cf2e-2aab-42d5-bec5-2ceebdddf67b?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full" />
            <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
              Settings
            </div>
          </div>
          <div onClick={copyToClipboard} className=" cursor-pointer justify-between items-stretch self-center flex w-[201px] max-w-full gap-5 mt-11 max-md:mt-10">
            <div className="text-white text-sm font-medium leading-5 tracking-wide">
              Attendance link
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ac0d8f6-1310-42ef-93a8-b35fd8a6b122?"
              className="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden self-center shrink-0 max-w-full my-auto" />
          </div>
          <div className="items-stretch bg-zinc-800 self-center flex w-[201px] max-w-full gap-2 mt-7 mb-8  pr-6 py-3 rounded-lg max-md:px-5">
            {/* <img
              loading="lazy"
              srcSet="..."
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full rounded-[50%]" /> */}
            <div className="text-white text-sm leading-5 tracking-wide self-center grow whitespace-nowrap my-auto">
             <ConnectButton accountStatus="address"/>
            </div>
          </div>
        </div>
      </div >

      {/* mobile */}
    </>
  )
}