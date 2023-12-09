/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import activity from "../assets/activity.svg"
import TopNav from '../components/TopNav'
import { gql, useQuery } from 'urql';
import { GlobalContext } from '../context/GlobalContext';


//deposit query
const GET_TOKENDEPOSIT = gql`
query GetDeposit($contract: String!) {
  tokenDeposits(where: { _contract: $contract }) {
    id
    _contract
    _amount
    time
  }
}
`;

//withdraw query
const GET_WITHDRAW = gql`
query Getwithdraw($contract: String!) {
  withdrawTokens(where: { _contract: $contract }) {
    _amount
    _contract
    time
  }
}
`;

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


const Activity = () => {
  const [activities, setActivities] = React.useState([1, 2, 3])
  const {dispatch, state} = useContext(GlobalContext)
  const [combinedddata, setcombinedData] = useState([])



  const [depositresult] = useQuery({
    query: GET_TOKENDEPOSIT,
    variables: { contract: state.childAddress },
  });
  
  const [withdrawresult] = useQuery({
    query: GET_WITHDRAW,
    variables: { contract: state.childAddress },
  });

  const [paidOutResult] = useQuery({
    query: GET_AMOUNTPAIDOUT,
    variables: { contract: state.childAddress },
  });
  
  const { data : depositData, fetching: fetchingDeposit, error: depositError } = depositresult;
  const { data : withdrawdata, fetching, error: withdrawError } = withdrawresult;
  const { data : amountPaidData, fetching:paidfetching, error: paiderror } = paidOutResult;

  useEffect(() => {
    if(depositData != undefined && withdrawdata != undefined && amountPaidData != undefined){
      setcombinedData([...(depositData.tokenDeposits), ...(withdrawdata.withdrawTokens), ...(amountPaidData.amountPaidouts)])
    }
  }, [depositData,withdrawdata,amountPaidData])
  
  console.log('deposit data here', depositData);
if (fetchingDeposit) return <p>Loading...</p>;
if (depositError) return <p>Oh no... {depositError.message}</p>;

console.log('withdraw data here', withdrawdata);
if (fetching) return <p>Loading...</p>;
if (withdrawError) return <p>Oh no... {withdrawError.message}</p>;

console.log('paidOut data here', amountPaidData);
if (paidfetching) return <p>Loading...</p>;
if (paiderror) return <p>Oh no... {paiderror.message}</p>;

function convertTimestampToAMPM(timestamp) {
  const date = new Date(timestamp * 1000); 
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; 

  const formattedTime = `${formattedHours}:${minutes.substr(-2)} ${ampm}`;
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; 

  return `${formattedDate} ${formattedTime}`;
}
    return (
    <Layout>
      <div className="bg-stone">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <TopNav heading="Activity" />

            <div className='mt-10'>
              {/* Activities */}
              {activities ?
                <div className='grid space-y-4'>
                  {combinedddata?.length > 0 && combinedddata?.map((activity, index) => (
                    <div key={index} className="items-star self-stretch bg-zinc-800 flex justify-between gap-5 px-6 py-5 rounded-lg max-md:flex-wrap max-md:justify-between max-md:px-5 w-full">
                      <div className="items-stretch self-stretch flex justify-between gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/14def1ff-8b6e-4c15-860b-04c8f78bfd6b?"
                          className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                        />
                        <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                        {activity.__typename === "tokenDeposit"
                                ? "Account Funded"
                                : activity.__typename === "withdrawToken"
                                ? "Fund Withdrawn"
                                : "Amount Paidout"}
                        </div>
                      </div>
                      <div className="items-stretch self-stretch flex justify-between gap-2">
                        <div className="items-stretch flex justify-between gap-0.5">
                          <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                            {activity.__typename === "AmountPaidout" ? convertTimestampToAMPM(activity.timePaid) : convertTimestampToAMPM(activity.time)}
                          </div>
                        </div>
                      </div>
                      <div className="items-stretch self-stretch flex justify-between gap-1">
                        <div className="text-white text-base font-medium leading-6 tracking-normal whitespace-nowrap">
                        {activity.__typename === "AmountPaidout" ? (activity.amount)/1e18+" usdt" : (activity._amount)/1e18 + " usdt"}

                        </div>
                      </div>
                      <div className="text-white text-sm leading-5 tracking-wide self-center grow whitespace-nowrap my-auto">
                        Successful
                      </div>
                    </div>
                  ))}
                </div>
                :
                <div className="relative justify-center w-full flex mt-10">
                  <img
                    loading="lazy"
                    src={activity}
                    className="object-contain w-fit md:w-[300px]"
                  />
                </div>
              }


            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Activity