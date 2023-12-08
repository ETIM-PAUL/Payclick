/* eslint-disable no-unused-vars */
import React, { useState,useContext,useEffect } from 'react'
import Layout from '../components/Layout'
import TopNav from '../components/TopNav'
import { MemberModal } from '../components/MemberModal'
import { gql, useQuery } from 'urql';
import { GlobalContext } from '../context/GlobalContext';



const Attendance = () => {
  const [memberAdd, setMemberAdd] = useState(false)
  const {state} = useContext(GlobalContext)


//   const GET_ATTENDANCES = gql`
//   query GetAttendances($contract: String!) {
//     allAttendances(where: { _contract: $contract }) {
//       _contract
//       _staff
//       _time
//     }
//   }
// `;

// const [result] = useQuery({
//   query: GET_ATTENDANCES,
//   variables: { contract: state.childAddress },
// });

//   const { data, fetching, error } = result;
//   console.log('attendance staff here', data.allAttendances[0]._staff);
//   console.log('attendance time here', data.allAttendances[0]._time);
//   if (fetching) return <p>Loading...</p>;
//   if (error) return <p>Oh no... {error.message}</p>;
  

  return (
    <Layout>
      <div className="bg-stone block pb-20">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <TopNav heading="Attendance" />

              <div className=''>
                <div className='flex w-full items-center justify-betwee my-10'>
                  <div className='px-4'>
                    <select className='border-0 bg-transparent text-white rounded-md focus:outline-0 w-fit px-2'>
                      <option disabled>Year</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                    </select>
                  </div>
                  <div className='px-4'>
                    <select className='border-0 bg-transparent text-white rounded-md focus:outline-0 w-fit px-2'>
                      <option disabled>Month</option>
                      <option>December</option>
                      <option>November</option>
                      <option>October</option>
                      <option>September</option>
                    </select>
                  </div>
                  <div className='px-4'>
                    <select className='border-0 bg-transparent text-white rounded-md focus:outline-0 w-fit px-2'>
                      <option disabled>Day</option>
                      <option>28</option>
                      <option>27</option>
                      <option>26</option>
                      <option>25</option>
                    </select>
                  </div>
                </div>



                <div className="px-4 relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="co" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="co" className="px-6 py-3 hidden md:inline-block">
                          Email
                        </th>
                        <th scope="co" className="px-6 py-3">
                          Position
                        </th>
                        <th scope="co" className="px-6 py-3">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="ro" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Adebisi
                        </td>
                        <td className="px-6 py-4 hidden md:inline-block">
                          vince@gmail.com
                        </td>
                        <td className="px-6 py-4">
                          UI Engineer
                        </td>
                        <td className="px-6 py-4">
                          11:26 am
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

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

export default Attendance