import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCopyOutline } from "react-icons/io5";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { GlobalContext } from '../context/GlobalContext';
import childABI from '../const/childFact.json'
import { toast } from 'react-toastify';

export function MemberModal({ setMemberAdd, memberAdd }) {
  const { state } = useContext(GlobalContext)
  const [lastStep, setLastStep] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [wallet, setWallet] = useState('')
  const [position, setPosition] = useState('')
  const [salary, setSalary] = useState('')

  const [groupName, setGroupName] = useState([])
  const [groupMail, setGroupMail] = useState([])
  const [groupWallet, setGroupWallet] = useState([])
  const [groupPosition, setGroupPosition] = useState([])
  const [groupSalary, setGroupSalary] = useState([])
  const [err, setErr] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: state.childAddress,
    abi: childABI,
    functionName: 'addStaff',
    args: [[wallet], [salary], [name], [position], [email]],
    onSuccess(data) {
      setLastStep(true)
      setName('')
      setEmail('')
      setWallet('')
      setPosition('')
      setSalary('')
      console.log(data)
      toast.success('Staff Added');

    },
    onError() {
      setErr("Error Occur, Try Again");
    },
  })



  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '' || email === '' || wallet === '' || position === '' || salary === '') {
      setErr('All fields required')
    } else {
      write?.()


    }


    // console.log(groupWallet,groupSalary,groupName,groupPosition,groupMail)
  }


  return (
    <Transition
      appear
      show={true}
      as={Fragment}
    >
      <Dialog open={memberAdd} onClose={() => null} className="z-10 bg-white">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="bg-zinc-800 rounded-md text-white p-6"
            >
              <Dialog.Panel>
                {isLoading ? (
                  <div className="flex tems-center mt-[200px] absolute ">
                    <span className="relative flex h-20 w-20 ml-[250px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-20 w-20 bg-[#63D9B9]"></span>
                    </span>
                  </div>
                ) : null}
                <div className='flex justify-between items-center'>
                  <Dialog.Title className="text-start block text-3xl">Add Member</Dialog.Title>
                  <span onClick={() => setMemberAdd(false)} className='font-bold text-right text-xl mb-2 cursor-pointer'>x</span>
                </div>
                <Dialog.Description className="text-start block text-base w-[60%] mt-2">
                  Members added can be scheduled to get their salary paid on a set date and time
                </Dialog.Description>
                {err !== "" && (
                  <h2 className=" w-[100%] bg-[red] text-white text-center text-[16px]  h-[30px]  mt-10 ">
                    {err}
                  </h2>
                )}

                <div className='my-10 block text-start w-full'>
                  {!lastStep ?
                    <div>
                      <div className='mb-2 w-full'>
                        <p className=''>
                          Full Name
                        </p>
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Member Name" className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                      </div>
                      <div className='mb-2 mt-4 w-full'>
                        <p className=''>
                          Email Address
                        </p>
                        <input type="email" placeholder="Member Email" onChange={(e) => setEmail(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                      </div>
                      <div className='mb-2 mt-4 w-full'>
                        <p className=''>
                          Wallet Address
                        </p>
                        <input type="text" placeholder="Wallet Address" onChange={(e) => setWallet(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                      </div>
                    </div>
                    :
                    <div>
                      <div className='mb-2 mt-4 w-full'>
                        <p className=''>
                          Position
                        </p>
                        <input type="text" placeholder="Software Developer" value={position} onChange={(e) => setPosition(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                      </div>
                      <div className='mb-2 mt-4 w-full'>
                        <p className=''>
                          Salary
                        </p>
                        <input type="number" placeholder="Salary in DAI Tokens" onChange={(e) => setSalary(e.target.value)} className='bg-transparent border rounded-lg mt-2 border-white text-xl p-2 outline-white focus:outline-0 font-bold appearance-none w-full' />
                      </div>

                    </div>
                  }

                  <div className='flex w-full items-center gap-3 mt-16'>
                    {!lastStep ?
                      <button onClick={() => setLastStep(true)} type='button' className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Next Step</button>
                      :
                      <>
                        <button onClick={() => setLastStep(false)} type='button' className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Back</button>
                        <button
                          // onClick={() => {setMemberAdd(false)}}
                          onClick={handleSubmit}
                          type='submit' className="w-full bg-[#63D9B9] text-black p-3 rounded-[8px]">Add Member</button>
                      </>
                    }
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}