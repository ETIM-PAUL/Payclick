/* eslint-disable no-unused-vars */
import React, { useState,useContext,useEffect } from 'react'
import TopNav from '../components/TopNav'
import Layout from '../components/Layout'
import nft from "../assets/NFT.svg"
import { GlobalContext } from '../context/GlobalContext';


import { gql, useQuery } from 'urql';


const GET_BESTSTAFF = gql`
query GetbestStaff($contract: String!) {
  bestStaffs(where: { _contract: $contract }) {
    _contract
    bestStaff
    name
    nftId
  }
}
`;


const MonthMember = () => {
  const {state} = useContext(GlobalContext)

   //best staff query
   const [result] = useQuery({
    query: GET_BESTSTAFF,
    variables: { contract: state.childAddress },
  });

  const { data, fetching, error } = result;
    console.log('best staff data here', data);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
  return (
    <Layout >
      <div className="bg-stone px-">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <TopNav heading="Member of the Month" />

            <div className='text-white mt-10 px-4'>
              <div className='inline-grid md:flex gap-4'>
                <div className='w-full md:w-[40%]'>
                  <h3 className='text-lg md:text-4xl pb-2 break-words'>{data.bestStaffs[0]?.name}</h3>
                  {/* <p>Ellaroberts34@gmail.com</p> */}
                  <div className='mt-10 space-y-5'>
                    <div className='flex justify-between'>
                      <span className='text-xs'>Wallet Address</span>
                      <span className='break-all'>{data.bestStaffs[0]?.bestStaff}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-xs'>Position</span>
                      <span>UI Engineer</span>
                    </div>

                  </div>

                </div>
                <div className='w-full flex justify-end'>
                  <img src={nft} className="w-[60%]" />

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