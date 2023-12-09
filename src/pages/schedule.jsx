/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SchedulePaymentModal } from '../components/SchedulePaymentModal';
import MemberMiniActionModal from '../components/MemberMiniActionModal';
import { MdMenuOpen } from "react-icons/md";
import TopNav from '../components/TopNav';
import { RemoveModalPage } from '../components/RemoveModalPage';
import { gql, useQuery } from 'urql';
import { GlobalContext } from '../context/GlobalContext';


const Schedule = () => {
  const [scheduleModal, setScheduleModal] = useState(false)
  const [miniActionModal, setMiniActionModal] = useState()
  const [selectedMember, setSelectedMember] = useState()
  const [removeModal, setRemoveModal] = useState(false)
  const [removeType, setRemoveType] = useState("")
  const {state} = useContext(GlobalContext)


  
    return (
    <Layout>
      <div className="bg-stone">
        <div className="gap-5 max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <TopNav heading="Schedule" />
            <div className=''>
              <div className='flex w-full items-center justify-between my-10'>
                <select className='p-2 border-0 bg-transparent text-white rounded-md focus:outline-0 w-24'>
                  <option disabled>Sort By</option>
                  <option>Salary</option>
                  <option>Date</option>
                  <option>Time</option>
                  <option>Position</option>
                </select>

                <div className='absolute md:relative bottom-32 md:bottom-0 flex justify-center md:justify-end w-full'>
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



              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Adebisi
                      </th>
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
                      <MemberMiniActionModal setMiniActionModal={setMiniActionModal} miniActionModal={miniActionModal} setRemoveModal={setRemoveModal} setRemoveType={setRemoveType} />
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

      {removeModal &&
        <RemoveModalPage setRemoveModal={setRemoveModal} removeModal={removeModal} selectedMember={selectedMember} removeType={removeType} />
      }

    </Layout>
  )
}

export default Schedule