import React from 'react'
import Layout from '../components/Layout'
import activity from "../assets/activity.svg"

const Activity = () => {
  const [activities, setActivities] = React.useState([1, 2, 3])

  return (
    <Layout>
      <div className="bg-stone">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <div className="flex w-full items-stretch justify-between gap-5 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                <div className="items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-white text-5xl leading-[52px] whitespace-nowrap mt-6 max-md:text-4xl max-md:leading-[51px]">
                    Activity
                  </div>
                </div>
                <div className="items-center border border-[color:var(--White,#FEFEFE)] self-center flex gap-2 my-auto pl-4 pr-2 py-4 rounded-xl border-solid max-md:pr-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/70759b5a-fc3e-4740-8dc2-1cdb459fbf29?"
                    className="aspect-square object-contain object-center w-3 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
                  />
                  <input type="search" placeholder='search' className='w-full bg-black border-0 text-white focus:outline-0 outline:border-0' />
                </div>
              </div>
            </div>

            <div className='mt-10'>
              {/* Activities */}
              <div className='grid space-y-4'>
                {activities.length > 0 && activities.map((activity) => (
                  <div className="items-star self-stretch bg-zinc-800 flex justify-between gap-5 px-6 py-5 rounded-lg max-md:flex-wrap max-md:justify-between max-md:px-5 w-full">
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

              <div className="relative justify-center w-full flex mt-10">
                <img
                  loading="lazy"
                  src={activity}
                  className="object-contain w-fit md:w-[300px]"
                />
              </div>

            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Activity