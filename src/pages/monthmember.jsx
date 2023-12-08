import React from 'react'
import TopNav from '../components/TopNav'
import Layout from '../components/Layout'
import nft from "../assets/NFT.svg"

const MonthMember = () => {
  return (
    <Layout >
      <div className="bg-stone px-">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <TopNav heading="Member of the Month" />

            <div className='text-white mt-10 px-4'>
              <div className='inline-grid md:flex gap-4'>
                <div className='w-full md:w-[40%]'>
                  <h3 className='text-lg md:text-4xl pb-2'>Ella Roberts</h3>
                  <p>Ellaroberts34@gmail.com</p>
                  <div className='mt-10 space-y-5'>
                    <div className='flex justify-between'>
                      <span className='text-xs'>Wallet Address</span>
                      <span>Asd87484jfjffjk</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-xs'>Position</span>
                      <span>UI Engineer</span>
                    </div>

                  </div>

                </div>
                <div className='w-full flex justify-end'>
                  <img src={nft} className="w-[40%" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MonthMember