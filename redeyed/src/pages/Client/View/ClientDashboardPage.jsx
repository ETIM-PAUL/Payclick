
import React, { useEffect, useRef, useState } from "react";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import Logo from "../../../assets/logo.svg";
import placeholder from "../../../assets/iphone.svg";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import ReactPlayer from 'react-player';
import VideoThumbnail from 'react-video-thumbnail';
import VideoCover from 'react-video-cover';
import { Link } from "react-router-dom";

const ClientDashboardPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);


  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "client",
      },
    });
  }, []);
  return (
    <>
      <div className="bg-black flex flex-col items-stretch">
        <div className="bg-neutral-900 flex w-full flex-col pt-8 pb-12 px-20 max-md:max-w-full max-md:px-5">
          <div className="self-stretc flex items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:mr-1.5">
            <img
              loading="lazy"
              src={Logo}
              className="aspect-[3.21] object-contain object-center w-[167px] overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-black relative text-base font-bold leading-5 whitespace-nowrap items-center my-auto w-fit px- py-1 rounded-md flex gap-3">
              <div className="flex items-center gap-4 bg-white py-2 px-5 rounded-lg">
                <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                  <span className=" text-white">R</span>
                </div>
                <span>Red Coins: 500</span>
              </div>

              <div className="">
                <UserCircleIcon className="text-white w-16" />
              </div>

            </div>
          </div>
          <div className="self-stretch flex w-full items-stretch justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
            <div className="self-center flex items-stretch gap-8 my-auto">
              <div className="flex gap-2 items-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/74b54870-2b2b-48d6-a76b-156cecf15e30?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-zinc-100 text-xl font-medium leading-7 self-center grow whitespace-nowrap my-auto">
                  Live
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcca62ae-16ff-4df9-94fe-c01e7d61fcd9?"
                  className="aspect-square object-contain object-center w-[25px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
                <div className="text-zinc-100 text-xl font-medium leading-7 self-center my-auto">
                  Recent
                </div>

              </div>
            </div>
            <div className="bg-white text-black self-stretch flex items-center  justify-between gap- px-4 py-1 rounded-lg max-md:max-w-full w-2xl max-md:flex-wrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1856b4e7-b149-4a16-89bb-4a67bd1eea2d?"
                className="aspect-square object-contain object-center w-[26px] overflow-hidden shrink-0 max-w-full"
              />
              <input type="text" className="text-black placeholder:text-black text-base leading-5 self-center whitespace-nowrap border-0 focus:outline-0 outline:border-0 my-auto w-full" placeholder="search" />
            </div>

            <div className="flex items-start justify-between gap-2.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <div className="bg-white py-3 flex justify-between gap-5 pl-6 pr-7 rounded-lg max-md:px-5">
                <div className="text-black text-lg leading-6">Global</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/23b5acca-98a9-4c57-9dc1-f2a5f6aee0cf?"
                  className="object-contain object-center items-start w-[17px] overflow-hidden shrink-0 max-w-full"
                />
              </div>

            </div>
          </div>
          <div className="text-zinc-100 text-2xl font-bold leading-7 self-center whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10">
            Welcome to search, find any live or recent broadcast in marketplace
          </div>
          <div className="text-zinc-100 text-2xl font-bold leading-7 self-stretch whitespace-nowrap mt-9 max-md:max-w-full max-md:mr-1.5">
            Fire
          </div>
          <div className="self-stretch flex items-start justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/41ae0ce2-18de-4931-abe6-2121db56b487?"
              className="aspect-[0.63] cursor-pointer object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div className="flex-col flex max:w-[302px] items-center px-">
                <div style={{
                  position: 'relative',
                }}>
                  <video playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}`} />
                  <Link to={`/client/view-video/${index + 1}`}>
                    <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                  </Link>
                  <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                </div>
                <div className="text-white flex justify-between items-center w-full mt-2">
                  <span className="text-sm font-bold">Airplane Crashed</span>
                  <span className="text-xs font-bold">24 minutes ago</span>
                </div>
              </div>
            ))}

            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/00e404c8-1405-4a1a-afe6-bfa0c79fc7b2?"
              className="aspect-[0.63] cursor-pointer object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
          <div className="text-zinc-100 text-2xl font-bold leading-7 self-stretch whitespace-nowrap mt-9 max-md:max-w-full max-md:mr-1.5">
            Attack
          </div>
          <div className="self-stretch flex items-start justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/29005359-5dd3-4306-8007-e15355b7e73c?"
              className="aspect-[0.63] object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="flex-col flex max:w-[302px] items-center px-">
                <div style={{
                  position: 'relative',
                }}>
                  <video playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}`} />
                  <span>
                    <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                  </span>

                  <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                </div>
                <div className="text-white flex justify-between items-center w-full mt-2">
                  <span className="text-sm font-bold">Airplane Crashed</span>
                  <span className="text-xs font-bold">24 minutes ago</span>
                </div>
              </div>
            ))}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c970d9c-5155-4d87-ba06-1f34616df84d?"
              className="aspect-[0.63] object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
          <div className="text-zinc-100 text-2xl font-bold leading-7 self-stretch whitespace-nowrap mt-9 max-md:max-w-full max-md:mr-1.5">
            Sports
          </div>
          <div className="self-stretch flex items-start justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mr-1.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f239dc3b-f797-45ac-b8b1-ba395ecd2108?"
              className="aspect-[0.63] object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="flex-col flex max:w-[302px] items-center px-">
                <div style={{
                  position: 'relative',
                }}>
                  <video playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}`} />
                  <span>
                    <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                  </span>
                  <span className="text-white px-2 rounded-md font-bold opacity-80 bg-black text-xl absolute bottom-3 right-4">Joe Doe</span>

                </div>
                <div className="text-white flex justify-between items-center w-full mt-2">
                  <span className="text-sm font-bold">Airplane Crashed</span>
                  <span className="text-xs font-bold">24 minutes ago</span>
                </div>
              </div>
            ))}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cc07024-c985-418b-bbef-cc851ca887c9?"
              className="aspect-[0.63] object-contain object-center w-3 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardPage;
