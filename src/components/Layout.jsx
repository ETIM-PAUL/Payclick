import React, { cloneElement, useContext, useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { useAccount, useContractRead } from 'wagmi'
import PayClickABI from "../const/payclickFact.json";
import { FactoryAddr } from "../const/contract";
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg"

const Layout = ({ children }) => {
  const { address } = useAccount()
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext)




  const { data: readAcct, isError: readError, isLoading: readLoading } = useContractRead({
    address: FactoryAddr,
    abi: PayClickABI,
    functionName: 'showMyAcct',
    args: [address]
  })

  useEffect(() => {


    dispatch({
      type: "SET_CHILD_ADDRESS",
      payload: { childAddress: readAcct },
    });

    if (address) {

      if (readAcct === '0x0000000000000000000000000000000000000000') {
        navigate("/signin")
      }
    }
    if (!address) {
      navigate("/signin")
    }
  }, [readAcct, address])
  return (
    <main className=''>
      <section className="h-screen flex">
        <Sidebar />
        <div className="w-full min-h-screen max-h-screen overflow-scroll my-6 md:my-16 md:px-10">
          <div className="hidden justify-start text-white items-center md:flex mt-6">
            <img
              loading="lazy"
              srcSet={logo}
              className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full rounded-[50%]"
            />
            <span className='font-bold text-xl'>Fourth Canvas</span>
          </div>
          <div className=''>
            {children}
          </div>
        </div>
      </section >
    </main >
  )
}

export default Layout