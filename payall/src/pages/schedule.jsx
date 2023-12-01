import React, { useState } from 'react'
import Layout from '../components/Layout'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SchedulePaymentModal } from '../components/SchedulePaymentModal';
import MemberMiniActionModal from '../components/MemberMiniActionModal';

const Schedule = () => {
  const [scheduleModal, setScheduleModal] = useState(false)
  const [miniActionModal, setMiniActionModal] = useState()
  const [selectedMember, setSelectedMember] = useState()

  return (
    <Layout>
      <div className="bg-stone">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap pr-0 max-md:pr-5">
                <div className="items-stretch grow basis-[0%] flex-col hidden md:flex">
                  <div className="text-white text-5xl leading-[52px] whitespace-nowrap mt-6 max-md:text-4xl max-md:leading-[51px]">
                    Schedule
                  </div>
                </div>
                <div className="items-center w-full md:w-auto border border-[color:var(--White,#FEFEFE)] self-center flex gap-2 my-auto pl-4 pr-2 py-4 rounded-xl border-solid max-md:pr-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/70759b5a-fc3e-4740-8dc2-1cdb459fbf29?"
                    className="aspect-square object-contain object-center w-3 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
                  />
                  <input type="search" placeholder='search' className='w-full bg-black border-0 text-white focus:outline-0 outline:border-0' />
                </div>
              </div>
            </div>

            <div>
              <div className='flex w-full items-center justify-between my-10'>
                <select className='p-2 rounded-md focus:outline-0 w-32'>
                  <option disabled>Sort By</option>
                  <option>Salary</option>
                  <option>Date</option>
                  <option>Time</option>
                  <option>Position</option>
                </select>

                <div className='absolute md:relative bottom-24 md:bottom-0 flex justify-center md:justify-end w-full'>
                  <button
                    onClick={() => setScheduleModal(true)}
                    className="bg-emerald-300 hover:cursor-pointer items-stretch self-center flex w-60 max-w-full gap-2 mt-2 py-3.5 text-black rounded-lg"
                  >
                    <div className="text-base font-medium leading-6 tracking-normal grow whitespace-nowrap">
                      Schedule Payment
                    </div>
                  </button>
                </div>
              </div>



              <div className="relative overflow-x-aut">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 hidden md:inline-block">
                        Wallet Address
                      </th>
                      <th scope="col" className="px-6 py-3 hidden md:inline-block">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 hidden md:inline-block">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Salary
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Adebisi
                      </td>
                      <td className="px-6 py-4 hidden md:inline-block">
                        HS9NNS77383GHJ
                      </td>
                      <td className="px-6 py-4 hidden md:inline-block">
                        12th December, 2023
                      </td>
                      <td className="px-6 py-4 hidden md:inline-block">
                        102:00 PM
                      </td>
                      <td className="px-6 py-4">
                        $2999
                      </td>
                      <td className="px-6 py-4">
                        <MoreVertIcon onClick={() => { setMiniActionModal(true); setSelectedMember() }} />
                      </td>
                    </tr>
                  </tbody>
                  {/* member action */}
                  {miniActionModal &&
                    <div className="inline-grid px-6 pt-2 pb-4 rounded-md absolute right-0 md:right-16 top-20 md:top-10  text-white">
                      <MemberMiniActionModal setMiniActionModal={setMiniActionModal} miniActionModal={miniActionModal} />
                    </div>
                  }
                </table>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Schedule Payment Modal */}
      {scheduleModal &&
        <SchedulePaymentModal setScheduleModal={setScheduleModal} scheduleModal={scheduleModal} selectedMember={selectedMember} />
      }

    </Layout>
  )
}

export default Schedule