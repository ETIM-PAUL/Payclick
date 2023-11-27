import React from 'react'
import { Sidebar } from './Sidebar'

const Layout = ({ children }) => {
  return (
    <main className=''>
      <section className="h-screen flex">
        <Sidebar />
        <div className="w-[100%] min-h-screen max-h-screen mt-16 px-6">
          <span className='text-white'>X</span>
          <div className=''>
            {children}
          </div>
        </div>
      </section >
    </main >
  )
}

export default Layout