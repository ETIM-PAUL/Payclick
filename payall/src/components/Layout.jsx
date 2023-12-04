import React, { cloneElement, useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { useAccount, useContractRead } from 'wagmi'
import PayClickABI from "../const/payclickFact.json";
import { FactoryAddr} from "../const/contract";

const Layout = ({ children }) => {
  const {address} = useAccount()
  const [addr, setAddr] = useState('');
  const { data:readAcct, isError:readError, isLoading:readLoading } = useContractRead({
    address: FactoryAddr,
    abi: PayClickABI,
    functionName: 'showMyAcct',
    args:[address]
  })
  useEffect(()=>{
    setAddr(readAcct)
  },[readAcct])
  return (
    <main className=''>
      <section className="h-screen flex">
        <Sidebar />
        <div className="w-full min-h-screen max-h-screen overflow-scroll my-6 md:my-16 md:px-6">
          <span className='text-white hidden md:block'>X</span>
          <div className=''>
          {children}
          </div>
        </div>
      </section >
    </main >
  )
}

export default Layout