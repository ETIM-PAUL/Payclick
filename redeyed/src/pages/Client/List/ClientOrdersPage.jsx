import { PlayCircleIcon } from '@heroicons/react/24/solid'
import ClientTopNav from 'Components/ClientHeader/ClientTopNav'
import React from 'react'
import { Link } from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail'

const ClientOrdersPage = () => {
  return (
    <div>
      <ClientTopNav />
      <div className="bg-black h-full flex flex-col justify-center items-stretch">
        <div className="bg-neutral-900 flex w-full flex-col items-stretch pt-8 pb-12 px-20 max-md:max-w-full max-md:px-5">

          <div className="bg-neutral-800 self-center flex w-full flex-col mt-8 px-16 py-8 rounded-md items-start max-md:max-w-full max-md:px-5">

            <div className="self-stretch flex w-full items-stretch justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
              <div className="self-center flex items-stretch gap-8 my-auto">
                <div className="flex gap-2 items-center">
                  <div className="text-zinc-100 text-xl font-medium leading-7 self-center grow whitespace-nowrap my-auto">
                    My Orders
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-stone-300 w-fit flex items-stretch justify-between gap-1 rounded-xl max-md:max-w-full max-md:flex-wrap mt-10">
              <div className="text-black text-base font-bold leading-5 whitespace-nowrap items-center bg-white grow justify-center px-5 py-2.5 rounded-xl">
                Active Orders
              </div>
              <div className="text-stone-500 text-base font-bold leading-5 whitespace-nowrap items-center bg-white bg-opacity-0 grow justify-center px-5 py-2.5 rounded-xl">
                Past Orders
              </div>
              <div className="text-stone-500 text-base font-bold leading-5 whitespace-nowrap items-center bg-white bg-opacity-0 grow justify-center px-5 py-2.5 rounded-xl">
                Sold Orders
              </div>
            </div>

            <div className="self-stretch flex items-start justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
              {[1, 2, 3].map((item, index) => (
                <div className="flex-col flex max:w-[302px] items-center px-">
                  <div style={{
                    position: 'relative',
                  }}>
                    <VideoThumbnail
                      videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                    />
                    <Link to={`/client/view-video/${index + 1}`}>
                      <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                    </Link>
                    <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                  </div>
                  <div className="text-white flex justify-between items-center w-full mt-2">
                    <span className="text-sm font-bold">Airplane Crashed</span>
                    <span className="text-xs font-bold">24 minutes ago</span>
                  </div>
                  <div className="text-white flex justify-between items-start w-full mt-2">
                    <div className='inline-grid space-y-2'>
                      <span className="text-xs font-bold">Canada Crashed</span>
                      <span className="text-xs font-bold">Confirmation: 5</span>
                      <span className="text-xs font-bold">Offer 200.00 coins</span>
                    </div>

                    <span className="text-xs font-bold bg-red-500 rounded-md p-2">Cancel</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="self-stretch flex items-start justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
              {[1, 2, 3].map((item, index) => (
                <div className="flex-col flex max:w-[302px] items-center px-">
                  <div style={{
                    position: 'relative',
                  }}>
                    <VideoThumbnail
                      videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                    />
                    <Link to={`/client/view-video/${index + 1}`}>
                      <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                    </Link>
                    <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                  </div>
                  <div className="text-white flex justify-between items-center w-full mt-2">
                    <span className="text-sm font-bold">Airplane Crashed</span>
                    <span className="text-xs font-bold">24 minutes ago</span>
                  </div>
                  <div className="text-white flex justify-between items-start w-full mt-2">
                    <div className='inline-grid space-y-2'>
                      <span className="text-xs font-bold">Canada Crashed</span>
                      <span className="text-xs font-bold">Confirmation: 5</span>
                      <span className="text-xs font-bold">Offer 200.00 coins</span>
                    </div>

                    <span className="text-xs font-bold bg-red-500 rounded-md p-2">Cancel</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientOrdersPage