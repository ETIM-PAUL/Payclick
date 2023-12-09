/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import TopNav from '../components/TopNav'
import { Link } from 'react-router-dom'
import { MemberModal } from '../components/MemberModal'
import { gql, useQuery } from 'urql';
import { GlobalContext } from '../context/GlobalContext';

//withdraw query
const GET_AMOUNTPAIDOUT = gql`
query Getamountppaidout($contract: String!) {
  amountPaidouts(where: { _contract: $contract }) {
    _contract
    amount
    timePaid
  }
}
`;

const Payout = () => {
  const [memberAdd, setMemberAdd] = useState(false)
  const {dispatch, state} = useContext(GlobalContext)

  const [paidOutResult] = useQuery({
    query: GET_AMOUNTPAIDOUT,
    variables: { contract: state.childAddress },
  });

  const { data : amountPaidData, fetching:paidfetching, error: paiderror } = paidOutResult;

  function convertTimestampToAMPM(timestamp) {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; 

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; 
  
    return `${formattedDate}`;
  }

  function convertTime(timestamp) {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; 
  
    const formattedTime = `${formattedHours}:${minutes.substr(-2)} ${ampm}`;
    return `${formattedTime}`;
  }




  
  return (
    <Layout>
      <div className="bg-stone block pb-20">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <TopNav heading="Members" />

              <div className='my-10 px-4'>
                <div className="items-stretch mb-10 flex gap-5 flex-wrap max-md:justify-center">
                  <div className="justify-between items-center grow bg-orange-600 flex gap-5 px-12 py-3 md:py-6 rounded-lg max-md:px-5">
                    <div className="text-black text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap my-auto">
                      Total Payouts
                    </div>
                    <div className="text-black text-center text-lg leading-8 self-stretch whitespace-nowrap">
                      $62,478
                    </div>
                  </div>

                  <div className="justify-between items-center grow bg-blue-300 flex gap-5 px-12 py-3 md:py-6 rounded-lg max-md:px-5">
                    <div className="justify-center items-stretch flex gap-2 my-auto">
                      <select className='bg-transparent text-xl focus:outline-none'>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                    <div className="text-black text-center text-lg leading-8 self-stretch grow whitespace-nowrap">
                      $7,300
                    </div>
                  </div>
                  <div className="justify-between items-center grow border border-[color:var(--color-gray-500,#D9D9D9)] bg-white flex gap-5 px-12 py-3 md:py-6 rounded-lg border-solid max-md:px-5">
                    <div className="justify-center items-stretch flex gap-2 my-auto">
                      <select className='bg-transparent px-2 text-xl focus:outline-none'>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                      </select>
                    </div>
                    <div className="text-black text-center text-lg leading-8 self-stretch grow whitespace-nowrap">
                      $35,800
                    </div>
                  </div>
                </div>

              {amountPaidData.amountPaidouts.map((amount, index)=>(
                <div key={index} className="items-stretch content-start flex-wrap flex flex-col py-2.5">
                  <div className="w-full max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col flex-wrap max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col grow items-stretch md:w-fit w-full max-md:ml-0">
                        <div className="justify-center items-stretch bg-zinc-800 flex w-full grow flex-col mx-auto px-6 py-3 rounded-lg max-md:mt-6 max-md:px-5">
                          <div className="items-center flex justify-between gap-1">
                            <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                              {(amount.amount)/1e18 + " usdt"}
                            </div>
                          </div>
                          <div className="items-stretch flex justify-between gap-2 mt-16 max-md:mt-10">
                            <div className="items-stretch flex justify-between gap-0.5">
                              <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                                {convertTime(amount.timePaid)}
                              </div>
                            </div>
                            <div className="items-stretch flex gap-1 max-md:justify-center">
                              <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                                {convertTimestampToAMPM(amount.timePaid)}
                              </div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
     
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Payment Modal */}
      {memberAdd &&
        <MemberModal setMemberAdd={setMemberAdd} memberAdd={memberAdd} />
      }
    </Layout>
  )
}

export default Payout