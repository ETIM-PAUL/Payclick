import React, { useState } from 'react'
import { MdMenuOpen } from 'react-icons/md'
import { BiSolidDashboard } from "react-icons/bi";
import { LuActivitySquare } from "react-icons/lu";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';

const TopNav = ({ heading }) => {
  const [dropMenu, setDropMenu] = useState(false);
  const toggleMenu = () => {
    setDropMenu(!dropMenu);
  };
  return (
    <div className=''>
      <div className="flex px-4 md:px-0 flex-col items-stretch my-auto max-md:max-w-full md:mt-10">
        <div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap pr-0">
          <div className="items-stretch grow basis-[0%] flex-col hidden md:flex">
            <div className="text-white text-3xl leading-[52px] whitespace-nowrap mt-6 max-md:text-4xl max-md:leading-[51px]">
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

          <div className="items-center w-full md:w-[360px] border border-[color:var(--White,#FEFEFE)] self-center flex gap-2 my-auto pl-4 pr-2 py-4 rounded-xl border-solid max-md:pr-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/70759b5a-fc3e-4740-8dc2-1cdb459fbf29?"
              className="aspect-square object-contain object-center w-3 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto" />
            <input type="search" placeholder='search' className='w-full bg-black border-0 text-white focus:outline-0 outline:border-0' />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 justify-center items-stretch bg-zinc-800 md:hidden flex-col pt-3 pb-5 px-8 max-md:px-5 w-full">
        <div className="justify-center items-start flex gap-5">
          <NavLink to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-emerald-500 justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5" : "text-white justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5"
            }>
            <BiSolidDashboard className='text-white text-xl font-bold' />
            <div className="text-xs font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/schedule"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-emerald-500 justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5" : "text-white justify-center items-center self-stretch flex grow basis-[0%] flex-col px-2 py-0.5"
            }
          >
            <AiOutlineSchedule className='text-white text-xl font-bold' />
            <div className="text-xs text-center font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Schedule
            </div>
          </NavLink>

          <NavLink to="/members"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-emerald-500 justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5" : "text-white justify-center items-center self-stretch flex grow basis-[0%] flex-col px-2 py-0.5"
            }
          >
            <FaUsers className='text-white text-xl font-bold' />
            <div className="text-xs text-center font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Members
            </div>
          </NavLink>

          <NavLink to="/payouts"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-emerald-500 justify-center items-center self-stretch flex grow basis-[0%] flex-col py-0.5" : "text-white justify-center items-center self-stretch flex grow basis-[0%] flex-col px-2 py-0.5"
            }
          >
            <FaUsers className='text-white text-xl font-bold' />
            <div className="text-xs text-center font-medium leading-5 tracking-normal self-stretch whitespace-nowrap">
              Payouts
            </div>
          </NavLink>
        </div>
      </div></div>

  )
}

export default TopNav