/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../components/Layout'
import activity from "../assets/activity.svg"
import TopNav from '../components/TopNav'
import { gql, useQuery } from 'urql';

const QueryTokendeposit = gql`
{
  tokenDeposits {
    id
    _contract
    _amount
    time
  }
  }
`;

const QueryTokenWithdraw = gql`
{
  withdrawTokens {
    _amount
    _contract
    receiver
    time
  }
  }
`;

const QueryAmountpaidOut = gql`
{
  amountPaidouts {
    _contract
    amount
    timePaid
  }
  }
`;


const Activity = () => {
  const [activities, setActivities] = React.useState([1, 2, 3])
  //depost query
  const [Depositresult, reexecuteDepositQuery] = useQuery({
    query: QueryTokendeposit,
  });

  //withdraw query
  const [result, reexecuteQuery] = useQuery({
    query: QueryTokenWithdraw,
  });
  //amount paid out query
  const [amountpaidData, reexecuteAmountpaidQuery] = useQuery({
    query: QueryAmountpaidOut,
  });

  const { data : depositData, fetching: fetchingDeposit, error: depositError } = Depositresult;
    console.log('deposit data here', depositData);
    if (fetchingDeposit) return <p>Loading...</p>;
    if (depositError) return <p>Oh no... {depositError.message}</p>;

  const { data, fetching, error } = result;
    console.log('withdraw data here', data);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    const { data :paidOutdata, fetching:paidOutfetching, error:paidouterror } = amountpaidData;
    console.log('Amount paid out data here', paidOutdata);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
  
  
  
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
                  {activities.length > 0 && activities.map((activity, index) => (
                    <div key={index} className="items-star self-stretch bg-zinc-800 flex justify-between gap-5 px-6 py-5 rounded-lg max-md:flex-wrap max-md:justify-between max-md:px-5 w-full">
                      <div className="items-stretch self-stretch flex justify-between gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/14def1ff-8b6e-4c15-860b-04c8f78bfd6b?"
                          className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                        />
                        <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                          Account Funded
                        </div>
                      </div>
                      <div className="items-stretch self-stretch flex justify-between gap-2">
                        <div className="items-stretch flex justify-between gap-0.5">
                          <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                            11:26am
                          </div>
                        </div>
                        <div className="items-stretch flex gap-1 max-md:justify-center">
                          <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                            24th
                          </div>
                          <div className="text-white text-base leading-6 tracking-normal">
                            November
                          </div>
                          <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap">
                            2023
                          </div>
                        </div>
                      </div>
                      <div className="items-stretch self-stretch flex justify-between gap-1">
                        <div className="text-white text-base font-medium leading-6 tracking-normal whitespace-nowrap">
                          $125
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