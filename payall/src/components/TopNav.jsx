import React, { useState } from 'react'
import { MdMenuOpen } from 'react-icons/md'

const TopNav = ({ heading }) => {
  const [dropMenu, setDropMenu] = useState(false);
  const toggleMenu = () => {
    setDropMenu(!dropMenu);
  };
  return (
    <><div className="flex flex-col items-stretch my-auto max-md:max-w-full md:mt-10">
      <div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap pr-0 max-md:pr-5">
        <div className="items-stretch grow basis-[0%] flex-col hidden md:flex">
          <div className="text-white text-5xl leading-[52px] whitespace-nowrap mt-6 max-md:text-4xl max-md:leading-[51px]">
            {heading}
          </div>
        </div>

        <div className='md:hidden flex justify-between w-full items-center'>
          <div className="items-center flex w-fit max-w-full gap-5 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f39065ba-b0c5-4e01-8582-24c3a73fd8bf?"
              className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full" />
            <div className="text-white text-3xl font-semibold leading-10 grow whitespace-nowrap">
              Payclick
            </div>
          </div>

          <MdMenuOpen
            className="hover:cursor-pointer md:hidden text-white text-5xl font-bold"
            onClick={toggleMenu} />

        </div>

        <div className="items-center w-full md:w-auto border border-[color:var(--White,#FEFEFE)] self-center flex gap-2 my-auto pl-4 pr-2 py-4 rounded-xl border-solid max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/70759b5a-fc3e-4740-8dc2-1cdb459fbf29?"
            className="aspect-square object-contain object-center w-3 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto" />
          <input type="search" placeholder='search' className='w-full bg-black border-0 text-white focus:outline-0 outline:border-0' />
        </div>
      </div>
    </div><div className="justify-center items-stretch bg-zinc-800 flex flex-col pt-3 pb-5 px-8 max-md:px-5">
        <div className="justify-center items-start flex gap-5">
          <div className="justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/31b9c1cf41a3c400fecde17571a2c1d4cb2c6c6501b912b68ec9d98f23065b38?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden max-w-full" />
            <div className="text-zinc-400 text-xs font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Dashboard
            </div>
          </div>
          <div className="justify-center items-center self-stretch flex grow basis-[0%] flex-col px-3 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/091e443118922365e647f476d39db392d00a5f525b778f62bf9318da3915ae61?"
              className="aspect-[1.63] object-contain object-center w-[39px] justify-center items-center overflow-hidden" />
            <div className="text-zinc-400 text-xs font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Activity
            </div>
          </div>
          <div className="justify-center items-center self-stretch flex grow basis-[0%] flex-col px-2 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/14942ffd5f43401126b209420853f9413b2c455ff811759bfb039a39e55d036e?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden max-w-full" />
            <div className="text-emerald-300 text-xs font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Schedule
            </div>
          </div>
          <div className="text-zinc-400 text-xs font-medium leading-5 tracking-normal mt-7 self-end">
            Members
          </div>
          <div className="justify-center items-center self-stretch flex grow basis-[0%] flex-col px-2.5 py-0.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c786338ac354c91a2a2681f290f19fd77d246767b418612eacd7f3308cb35fa?"
              className="aspect-[1.71] object-contain object-center w-[41px] justify-center items-center overflow-hidden" />
            <div className="text-zinc-400 text-xs font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Payouts
            </div>
          </div>
        </div>
      </div></>

  )
}

export default TopNav