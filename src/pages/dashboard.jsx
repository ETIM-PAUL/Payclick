/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import fund_bg from "../assets/withdraw_img.svg"
import withdraw_bg from "../assets/fund_img.svg"
import schedule from "../assets/schedule.png"
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FundModal } from '../components/FundAccountModal';
import { WithdrawModal } from '../components/WithdrawModal';
import {useContractReads} from 'wagmi';
import TopNav from '../components/TopNav';
import { GlobalContext } from '../context/GlobalContext';
import childABI from '../const/childFact.json'
import tokenABI from '../const/token.json'
import { TestTokenAddr } from '../const/contract';
import { gql, useQuery } from 'urql';



const Dashboard = () => {
  const [showFundModal, setShowFundModal] = useState(false)
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false)
  const {state} =useContext(GlobalContext)

//   const QueryTokendeposit = gql`
// {
//   tokenDeposits {
//     id
//     _contract
//     _amount
//     time
//   }
//   }
// `;

// const QueryTokenWithdraw = gql`
// {
//   withdrawTokens {
//     _amount
//     _contract
//     receiver
//     time
//   }
//   }
// `;
//   //depost query
//   const [Depositresult, reexecuteDepositQuery] = useQuery({
//     query: QueryTokendeposit,
//   });

//   //withdraw query
//   const [result, reexecuteQuery] = useQuery({
//     query: QueryTokenWithdraw,
//   });

//   const { data : depositData, fetching: fetchingDeposit, error: depositError } = Depositresult;
//     console.log('deposit data here', depositData);
//     if (fetchingDeposit) return <p>Loading...</p>;
//     if (depositError) return <p>Oh no... {depositError.message}</p>;

//   const { data, fetching, error } = result;
//     console.log('withdraw data here', data);
//     if (fetching) return <p>Loading...</p>;
//     if (error) return <p>Oh no... {error.message}</p>;
  

  console.log('hello',state.childAddress)

  const childContract = {
    address: state.childAddress,
    abi: childABI,
  }
  const tokenContract = {
    address: TestTokenAddr,
    abi: tokenABI,
  }

  // const { data, isError, isLoading } = useContractReads({
  //   contracts: [

  //     {
  //       ...childContract,
  //       functionName: 'balanceOf',
  //       args:[state.childAddress]
  //     },
  //     {
  //       ...childContract,
  //       functionName: 'salaryPaidout',
      
  //     },
  //     // {
  //     //   ...childContract,
  //     //   functionName: 'totalPayment',
      
  //     // },
     
  //   ],
  // })

  return (
    <Layout>
      <div className="bg-stone block pb-20">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <TopNav heading="Dashboard" />

              <div className="mt-9 max-md:max-w-full md:pr-">
                <div className="gap-5 block md:flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[69%] max-md:w-full max-md:ml-0">
                    <div className="md:border border-[color:var(--color-secondary-30400,#4A4A4A)] md:bg-zinc-800 flex grow flex-col items-center w-full mx-auto md:pt-12 pb-8 px-7 rounded-xl border-solid max-md:max-w-full mt-0 max-md:px-5">
                      <div className="self-stretch max-md:max-w-full">
                        <div className="gap-5 flex md:flex-wrap overflow-scroll space-x-8 md:space-x-0 w-full max-md:items-stretch max-md:gap-0">

                          <div className="flex flex-col items-stretch grow max-md:w-full max-md:ml-0">
                            <div className="bg-orange-600 flex grow justify-between gap-5 w-full mx-auto pl-6 pb-6 rounded-2xl max-md:mt-5 max-md:pl-5">
                              <div className="items-stretch flex grow basis-[0%] flex-col mt-6">
                                <div className="text-white text-2xl leading-8 whitespace-nowrap">
                                  Available Balance
                                </div>
                                <div className="justify-between items-stretch flex gap-1 mt-20 max-md:mt-10">
                                  <div className="text-white text-4xl font-medium leading-10">
                                    {/* {Number(data[0].result)} */}
                                  </div>
                                  <div className="text-white text-2xl font-medium leading-8 self-center whitespace-nowrap my-auto">
                                    USDT
                                  </div>
                                </div>
                              </div>
                              <div className="flex basis-[0%] flex-col items-stretch self-start">
                                <div className="flex shrink-0 h-12 flex-col rounded-[50%]" />
                                <div className="flex w-[25px] shrink-0 h-[51px] flex-col mt-9 rounded-[50%] self-end" />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-stretch grow max-md:w-full max-md:ml-0">
                            <div className="justify-center items-center bg-stone-950 flex grow flex-col w-full mx-auto pl-6 pr-7 py-6 rounded-2xl max-md:mt-5 max-md:px-5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8f9f233-b951-4765-b511-1aee8fe1f087?"
                                className="aspect-square object-contain object-center w-9 justify-center items-center overflow-hidden self-center max-w-full"
                              />
                              <div className="text-white text-xl font-medium leading-8 self-stretch whitespace-nowrap mt-6">
                                Salary Payouts
                              </div>
                              <div className="text-white text-xs leading-5 tracking-wide self-center whitespace-nowrap mt-2">
                                For November
                              </div>
                              <div className="text-white text-base font-medium leading-6 tracking-normal self-center whitespace-nowrap mt-2">
                                {/* ${Number(data[1]?.result[0])} */}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-stretch grow max-md:w-full max-md:ml-0">
                            <div className="justify-center items-center bg-white flex grow flex-col w-full mx-auto px-10 py-6 rounded-2xl max-md:mt-5 max-md:px-5">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/085df5ad-3365-4147-8f1e-69155a368a76?"
                                className="aspect-square object-contain object-center w-9 justify-center items-center overflow-hidden max-w-full"
                              />
                              <div className="text-black text-xl font-medium leading-8 self-stretch whitespace-nowrap mt-6">
                                Scheduled
                              </div>
                              <div className="text-black text-xs leading-5 tracking-wide self-stretch whitespace-nowrap mt-2">
                                Outgoing Payments
                              </div>
                              <div className="text-black text-base font-medium leading-6 tracking-normal whitespace-nowrap mt-2">
                                $7490
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="justify-start w-full flex gap-5 items-start mt-5">
                        <div className="text-emerald-300 text-xl font-medium leading-8 whitespace-nowrap">
                          Member of the Month
                        </div>
                        <Link to="/members/monthly_winner">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c359de759ff8baca0cacf2280a3984f0a2dcdab65d40a060dd65b7e2c108df2d?"
                            className="aspect-square object-contain object-center w-[34px] justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full"
                          />
                        </Link>
                      </div>

                      <div className="justify-between items-stretch self-stretch flex gap-5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                        <div className="text-white text-2xl leading-8">
                          Recent Activities
                        </div>
                        <div className="text-emerald-300 text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto">
                          View all
                        </div>
                      </div>
                      <div className="w-full mt-0 md:mt-">
                        <div className="gap-5 mt-3 md:mt-0 p-3 md:p-0 w-full flex bg-zinc-800 md:bg-transparent rounded-md md:rounded-none items-center max-md:gap-0">
                          <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
                            <div className="flex grow flex-col items-stretch md:mt-10">
                              <div className="">
                                <span className='block w-full text-start md:hidden text-white'>11:26am</span>
                                <div className='flex gap-2 mt-1 md:mt-0'>
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a104f955-0925-4ef4-8f47-09f0e6402904?"
                                    className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                                  />
                                  <div className="text-white text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                                    Fund Withdrawn
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0">
                            <div className="flex grow flex-col items-stretch max-md:mt-10">
                              <div className="items-stretch flex justify-between gap-2">
                                <div className="items-stretch hidden md:flex justify-between gap-0.5">
                                  <div className="text-white text-base leading-6 tracking-normal">
                                    11:26 am
                                  </div>
                                </div>
                                <div className="items-stretch hidden md:flex gap-1 max-md:justify-center">
                                  <div className="text-white text-base leading-6 tracking-normal">
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
                            </div>
                          </div>
                          <div className="flex flex-col items-stretch w-[31%] ml-5 max-md:w-full max-md:ml-0">
                            <div className="flex grow flex-col items-stretch md:mt-10">
                              <div className="flex w-full items-stretch justify-between gap-5">
                                <div className="items-stretch flex justify-between gap-1">
                                  <div className="text-white text-base font-medium leading-6 tracking-normal whitespace-nowrap">
                                    $125
                                  </div>
                                </div>
                                <div className='block md:hidden'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M10.7901 15.17C10.5901 15.17 10.4001 15.09 10.2601 14.95L7.84006 12.53C7.55006 12.24 7.55006 11.76 7.84006 11.47C8.13006 11.18 8.61006 11.18 8.90006 11.47L10.7901 13.36L15.0901 9.06C15.3801 8.77 15.8601 8.77 16.1501 9.06C16.4401 9.35 16.4401 9.83 16.1501 10.12L11.3201 14.95C11.1801 15.09 10.9901 15.17 10.7901 15.17Z" fill="#53B69B" />
                                    <path d="M11.9999 22.75C11.3699 22.75 10.7399 22.54 10.2499 22.12L8.66988 20.76C8.50988 20.62 8.10988 20.48 7.89988 20.48H6.17988C4.69988 20.48 3.49988 19.28 3.49988 17.8V16.09C3.49988 15.88 3.35988 15.49 3.21988 15.33L1.86988 13.74C1.04988 12.77 1.04988 11.24 1.86988 10.27L3.21988 8.68C3.35988 8.52 3.49988 8.13 3.49988 7.92V6.2C3.49988 4.72 4.69988 3.52 6.17988 3.52H7.90988C8.11988 3.52 8.51988 3.37 8.67988 3.24L10.2599 1.88C11.2399 1.04 12.7699 1.04 13.7499 1.88L15.3299 3.24C15.4899 3.38 15.8899 3.52 16.0999 3.52H17.7999C19.2799 3.52 20.4799 4.72 20.4799 6.2V7.9C20.4799 8.11 20.6299 8.51 20.7699 8.67L22.1299 10.25C22.9699 11.23 22.9699 12.76 22.1299 13.74L20.7699 15.32C20.6299 15.48 20.4799 15.88 20.4799 16.09V17.79C20.4799 19.27 19.2799 20.47 17.7999 20.47H16.0999C15.8899 20.47 15.4899 20.62 15.3299 20.75L13.7499 22.11C13.2599 22.54 12.6299 22.75 11.9999 22.75ZM6.17988 5.02C5.52988 5.02 4.99988 5.55 4.99988 6.2V7.91C4.99988 8.48 4.72988 9.21 4.35988 9.64L3.00988 11.23C2.65988 11.64 2.65988 12.35 3.00988 12.76L4.35988 14.35C4.72988 14.79 4.99988 15.51 4.99988 16.08V17.79C4.99988 18.44 5.52988 18.97 6.17988 18.97H7.90988C8.48988 18.97 9.21988 19.24 9.65988 19.62L11.2399 20.98C11.6499 21.33 12.3699 21.33 12.7799 20.98L14.3599 19.62C14.7999 19.25 15.5299 18.97 16.1099 18.97H17.8099C18.4599 18.97 18.9899 18.44 18.9899 17.79V16.09C18.9899 15.51 19.2599 14.78 19.6399 14.34L20.9999 12.76C21.3499 12.35 21.3499 11.63 20.9999 11.22L19.6399 9.64C19.2599 9.2 18.9899 8.47 18.9899 7.89V6.2C18.9899 5.55 18.4599 5.02 17.8099 5.02H16.1099C15.5299 5.02 14.7999 4.75 14.3599 4.37L12.7799 3.01C12.3699 2.66 11.6499 2.66 11.2399 3.01L9.65988 4.38C9.21988 4.75 8.47988 5.02 7.90988 5.02H6.17988Z" fill="#53B69B" />
                                  </svg>
                                </div>
                                <div className="text-white text-sm leading-5 tracking-wide self-center grow whitespace-nowrap my-auto hidden md:flex">
                                  Successful
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* chart */}
                  <div className="flex flex-col items-stretch w-[31%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="hidden justify-center items-stretch border border-[color:var(--color-accent-10900,#244E43)] bg-stone-950 md:flex w-full grow flex-col mx-auto pl-7 pr-7 py-9 rounded-2xl border-solid max-md:mt-10 max-md:px-5">
                      <div className="items-center flex justify-between gap-2.5">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ae9e1be-c710-42fe-acd0-16eb7d0354b4?"
                          className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
                        />
                        <div className="text-white text-3xl leading-9 self-stretch grow whitespace-nowrap">
                          Supplied data
                        </div>
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e064d331-21a1-4cf6-a739-a1a2ba4cb3d8?"
                        className="aspect-[1.48] object-contain object-center w-full overflow-hidden mt-14 max-md:mt-10"
                      />
                      <div className="items-stretch flex justify-between gap-2.5 mt-16 max-md:mt-10">
                        <div className="items-center flex justify-between gap-2.5">
                          <div className="flex w-4 shrink-0 h-4 flex-col my-auto rounded-[50%]" />
                          <div className="text-white text-base font-medium leading-6 tracking-normal self-stretch grow whitespace-nowrap">
                            2022
                          </div>
                        </div>
                        <div className="items-center flex justify-between gap-2.5">
                          <div className="flex w-4 shrink-0 h-4 flex-col my-auto rounded-[50%]" />
                          <div className="text-white text-base font-medium leading-6 tracking-normal self-stretch grow whitespace-nowrap">
                            2023
                          </div>
                        </div>
                      </div>
                      <div className="text-white text-2xl leading-8 mt-5">
                        Value of transactions over the years
                      </div>
                      <div className="text-slate-300 text-base leading-6 tracking-normal mt-2">
                        Analyzing the fluctuations in transaction values over the
                        years
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="hidden md:block mt-9 max-md:max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-center justify-between max-md:gap-0">
                  <div className="flex items-stretch gap-5 w-full max-md:ml-0">
                    <div className="justify-center grow w-[69%] max-md:w-full max-md:mt-10">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">

                        <div onClick={() => setShowFundModal(true)} className="flex flex-col items-center hover:cursor-pointer w- max-md:w-full max-md:ml-0">
                          <div className="border border-[color:var(--color-accent-10900,#244E43)] bg-stone-950 grow w-full mx-auto pl-8 pr-6 pt-9 pb-5 rounded-2xl border-solid max-md:mt-6 max-md:px-5">
                            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                              <div className="flex flex-col items-stretch w-[66%] max-md:w-full max-md:ml-0">
                                <div className="items-stretch flex flex-col max-md:mt-10">
                                  <div className="text-white text-2xl font-bold leading-8 whitespace-nowrap">
                                    Fund Account
                                  </div>
                                  <div className="text-white text-base leading-6 tracking-normal mt-4">
                                    Add Fund directly from your wallet account and
                                    get your account funded instantly
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                                <img
                                  loading="lazy"
                                  src={fund_bg}
                                  className="aspect-[1.43] object-contain object-center w-[114px] overflow-hidden shrink-0 max-w-full my-auto max-md:mt-10"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => setShowWithdrawnModal(true)} className="flex flex-col items-stretch hover:cursor-pointer max-md:ml-0">
                          <div className="border border-[color:var(--color-accent-10900,#244E43)] bg-stone-950 grow w-full mx-auto pl-8 pr-4 pt-9 pb-11 rounded-2xl border-solid max-md:mt-6 max-md:pl-5">
                            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                              <div className="flex flex-col items-stretch w-full max-md:w-full max-md:ml-0">
                                <div className="items-stretch flex flex-col max-md:mt-10">
                                  <div className="text-white text-2xl font-bold leading-8 whitespace-nowrap">
                                    Withdraw Fund
                                  </div>
                                  <div className="text-white text-base leading-6 tracking-normal mt-4">
                                    Withdraw Fund from your Account directly to
                                    wallet account without delay
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-stretch w-full ml-5 max-md:w-full max-md:ml-0">
                                <img
                                  loading="lazy"
                                  src={withdraw_bg}
                                  className="aspect-[1.51] object-contain object-center w-[121px] overflow-hidden shrink-0 max-w-full my-auto max-md:mt-10"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link to="/schedule" className="relative justify-center w-[31%] ml-5 max-md:w-full max-md:ml-0">
                      <img
                        loading="lazy"
                        src={schedule}
                        className="object-contain w-full overflow-hidden max-w-full"
                      />
                    </Link>


                  </div>

                </div>
              </div>

              {/* mobile */}
              <div className='pb-8 block md:hidden'>
                <div className='flex gap-1 px-5'>
                  <div onClick={() => setShowFundModal(true)} className="flex p-2 border border-[color:var(--color-accent-10900,#244E43)] rounded-md items-center hover:cursor-pointer w-fit max-md:w-full max-md:ml-0 gap-3">
                    <img
                      loading="lazy"
                      src={fund_bg}
                      className="aspect-[1.43] object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="text-white text-base font-bold leading-8 whitespace-nowrap">
                      Fund Account
                    </div>
                  </div>
                  <div onClick={() => setShowFundModal(true)} className="flex p-2 border border-[color:var(--color-accent-10900,#244E43)] rounded-md items-center hover:cursor-pointer w-fit max-md:w-full max-md:ml-0 gap-3">
                    <img
                      loading="lazy"
                      src={withdraw_bg}
                      className="aspect-[1.43] object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="text-white text-base font-bold leading-8 whitespace-nowrap">
                      Withdraw Fund
                    </div>
                  </div>
                </div>

                <div className='flex gap-1 px-5'>
                  <Link to="/schedule" className="p-2 rounded-md items-center hover:cursor-pointer w-fit max-md:w-full max-md:ml-0 gap-3">
                    <img
                      loading="lazy"
                      src={schedule}
                      className="aspect-[1.43] object-contain object-center w-full max-w-full"
                    />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Fund Modal */}
      {showFundModal &&
        <FundModal setShowFundModal={setShowFundModal} showFundModal={showFundModal} />
      }

      {/* withdraw modal */}
      {showWithdrawnModal &&
        <WithdrawModal setShowWithdrawnModal={setShowWithdrawnModal} showWithdrawnModal={showWithdrawnModal} />
      }

    </Layout>
  );
}

export default Dashboard