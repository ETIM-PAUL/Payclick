import React from 'react'
import { Sidebar } from './Sidebar'

const Layout = ({ children }) => {
  return (
    <main className=''>
      <section className="h-screen flex">
        <Sidebar />
        <div className="w-full min-h-screen max-h-screen my-16 px-3 md:px-6">
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