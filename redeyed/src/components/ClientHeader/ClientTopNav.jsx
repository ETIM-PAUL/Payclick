import { UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import Logo from "../../assets/logo.svg";
import { MdMenuOpen } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const ClientTopNav = () => {
  const [dropMenu, setDropMenu] = useState(false);
  const toggleMenu = () => {
    setDropMenu(!dropMenu);
  };

  return (
    <div className="bg-neutral-900 flex flex-col items-stretch pt-4">
      <div className="bg-neutral-900 flex w-full flex-col py-3 px-20 max-md:max-w-full max-md:px-5">
        <div className="self-stretc flex items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:mr-1.5">
          <img
            loading="lazy"
            src={Logo}
            className="aspect-[3.21] object-contain object-center w-[167px] overflow-hidden shrink-0 max-w-full"
          />
          <div className="hidden md:flex text-black relative text-base font-bold leading-5 whitespace-nowrap items-center my-auto w-fit px- py-1 rounded-md gap-3">
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

          <MdMenuOpen
            className="hover:cursor-pointer md:hidden text-white text-5xl font-bold"
            onClick={toggleMenu}
          />
        </div>

      </div>

      {dropMenu && (
        <nav className="mobile-view block md:hidden px-10 py-4 absolute top-20 right-10 w-fit rounded-md z-10 bg-zinc-500">
          <ul className="block gap-2 items-center text-black font-normal text-lg ">
            <div className="">

              <div className="flex items-center gap-4 bg-black py-2 px-5 mb-3 text-white rounded-lg">
                <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                  <span className=" text-white">R</span>
                </div>
                <span>Red Coins: 500</span>
              </div>

              <NavLink
                to="/client/profile"
                onClick={() => toggleMenu()}
              >
                <li className="leading-6 pb-4 text-center block hover:bg-black">
                  My Profile
                </li>
              </NavLink>
              <NavLink to="/client/orders">
                <li className="text-center block hover:bg-black">
                  <button
                    className="pt-[3px] pb-[5px]"
                    onClick={() => toggleMenu()}
                  >
                    My Orders
                  </button>
                </li>
              </NavLink>
            </div>
          </ul>
        </nav>
      )}

    </div>
  )
}

export default ClientTopNav