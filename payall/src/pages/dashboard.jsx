import React from 'react'
import fund_bg from "../assets/withdraw_img.svg"
import withdraw_bg from "../assets/fund_img.svg"
import schedule from "../assets/schedule.png"
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-stone">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <div className="flex w-full items-stretch justify-between gap-5 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                <div className="items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-white text-5xl leading-[52px] whitespace-nowrap mt-6 max-md:text-4xl max-md:leading-[51px]">
                    Dashboard
                  </div>
                </div>
                <div className="items-center border border-[color:var(--White,#FEFEFE)] self-center flex gap-2 my-auto pl-4 pr-2 py-4 rounded-xl border-solid max-md:pr-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/70759b5a-fc3e-4740-8dc2-1cdb459fbf29?"
                    className="aspect-square object-contain object-center w-3 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
                  />
                  <input type="search" placeholder='search' className='w-full' />
                  {/* <div className="text-white text-xs leading-5 tracking-wide self-stretch grow whitespace-nowrap">
                    Search
                  </div> */}
                </div>
              </div>
              <div className="mt-9 pr-20 max-md:max-w-full max-md:pr-5">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[69%] max-md:w-full max-md:ml-0">
                    <div className="border border-[color:var(--color-secondary-30400,#4A4A4A)] bg-zinc-800 flex grow flex-col items-center w-full mx-auto pt-12 pb-8 px-7 rounded-xl border-solid max-md:max-w-full max-md:mt-10 max-md:px-5">
                      <div className="self-stretch max-md:max-w-full">
                        <div className="gap-5 flex flex-wrap max-md:flex-col max-md:items-stretch max-md:gap-0">

                          <div className="flex flex-col items-stretch grow max-md:w-full max-md:ml-0">
                            <div className="bg-orange-600 flex grow justify-between gap-5 w-full mx-auto pl-6 pb-6 rounded-2xl max-md:mt-5 max-md:pl-5">
                              <div className="items-stretch flex grow basis-[0%] flex-col mt-6">
                                <div className="text-white text-2xl leading-8 whitespace-nowrap">
                                  Available Balance
                                </div>
                                <div className="justify-between items-stretch flex gap-1 mt-20 max-md:mt-10">
                                  <div className="text-white text-4xl font-medium leading-10">
                                    24,000
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
                                $9800
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
                      <div className="justify-between items-stretch self-stretch flex gap-5 mt-12 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                        <div className="text-white text-2xl leading-8">
                          Recent Activities
                        </div>
                        <div className="text-emerald-300 text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto">
                          View all
                        </div>
                      </div>
                      <div className="w-[717px] max-w-full mt-8">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                          <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
                            <div className="flex grow flex-col items-stretch max-md:mt-10">
                              <div className="items-stretch flex justify-between gap-2">
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
                          <div className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0">
                            <div className="flex grow flex-col items-stretch max-md:mt-10">
                              <div className="items-stretch flex justify-between gap-2">
                                <div className="items-stretch flex justify-between gap-0.5">
                                  <div className="text-white text-base leading-6 tracking-normal">
                                    11:26
                                  </div>
                                  <div className="text-white text-sm leading-5 tracking-wide self-center whitespace-nowrap my-auto">
                                    am
                                  </div>
                                </div>
                                <div className="items-stretch flex gap-1 max-md:justify-center">
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
                            <div className="flex grow flex-col items-stretch max-md:mt-10">
                              <div className="flex w-full items-stretch justify-between gap-5">
                                <div className="items-stretch flex justify-between gap-1">
                                  <div className="text-white text-base font-medium leading-6 tracking-normal">
                                    $
                                  </div>
                                  <div className="text-white text-base font-medium leading-6 tracking-normal whitespace-nowrap">
                                    125
                                  </div>
                                </div>
                                <div className="text-white text-sm leading-5 tracking-wide self-center grow whitespace-nowrap my-auto">
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
                    <div className="justify-center items-stretch border border-[color:var(--color-accent-10900,#244E43)] bg-stone-950 flex w-full grow flex-col mx-auto pl-7 pr-7 py-9 rounded-2xl border-solid max-md:mt-10 max-md:px-5">
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
              <div className="mt-9 pr-8 max-md:max-w-full max-md:pr-5">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[71%] max-md:w-full max-md:ml-0">
                    <div className="justify-center grow pr-16 max-md:max-w-full max-md:mt-10 max-md:pr-5">
                      <div className="gap- flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                        <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
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
                                  srcSet={fund_bg}
                                  className="aspect-[1.43] object-contain object-center w-[114px] overflow-hidden shrink-0 max-w-full my-auto max-md:mt-10"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                          <div className="border border-[color:var(--color-accent-10900,#244E43)] bg-stone-950 grow w-full mx-auto pl-8 pr-4 pt-9 pb-11 rounded-2xl border-solid max-md:mt-6 max-md:pl-5">
                            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                              <div className="flex flex-col items-stretch w-[65%] max-md:w-full max-md:ml-0">
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
                              <div className="flex flex-col items-stretch w-[35%] ml-5 max-md:w-full max-md:ml-0">
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
                  </div>
                  <div className="">
                    <div className="relative justify-center w-full px-4">
                      <img
                        loading="lazy"
                        src={schedule}
                        className="object-contain w-full overflow-hidden max-w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </Layout>
  );
}

export default Dashboard