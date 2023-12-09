import React from 'react'
import logo from "../assets/logo.svg"
import Layout from '../components/Layout'
import TopNav from '../components/TopNav'
import { currentDate } from '../utils'

const SignAttendance = () => {
  return (
    <Layout>
      <div className="bg-stone block pb-20">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <TopNav heading="Sign Attendance" />

              <div className="bg-stone-950 flex flex-col px-20 py-12 items-start max-md:px-5">
                <div className="items-center self-center flex w-[306px] max-w-full gap-5 mt-5 max-md:mt-10">
                  <div className="text-white text-base leading-6 tracking-normal whitespace-nowrap my-auto">
                    Date:
                  </div>

                  {/* Please show current date rime in this space */}
                  <div className="text-white text-2xl leading-8 self-stretch whitespace-nowrap">
                    {currentDate()}
                  </div>
                </div>
                <div className="items-stretch self-center flex w-[306px] max-w-full justify-between gap-5 mt-16 pr-3 max-md:mt-10">
                  <input type="checkbox" className="checkbox checkbox-lg" />
                  <div className="text-white text-center text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                    Click to mark attendance for today
                  </div>
                </div>
                <div className="text-black text-center text-base font-medium leading-6 tracking-normal whitespace-nowrap justify-center items-stretch bg-emerald-300 self-center mt-24 mb-80 px-12 py-3.5 rounded-lg max-md:my-10 max-md:px-5">
                  Submit
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignAttendance