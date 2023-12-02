
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tokenExpireError } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";
import { isImage, empty, isVideo } from "Utils/utils";
import { MkdInput } from "Components/MkdInput";
import { SkeletonLoader } from "Components/Skeleton"
import Logo from "../../../assets/logo.svg";
import { PlayCircleIcon, PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ClientTopNav } from "Components/ClientHeader";
import ReactPlayer from 'react-player';
import 'video-react/dist/video-react.css';
import { Player } from "video-react";
import VideoThumbnail from "react-video-thumbnail";
import { Modal } from "Components/Modal";
import { OrderModal } from "Components/OrderModal/OrderModal";

let sdk = new MkdSDK();

const ViewPagesPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});
    const [loading, setLoading] = React.useState(true)
    const [errorM, setErrorM] = React.useState(null)
    const [type, setType] = React.useState()
    const [orderValue, setOrderValue] = React.useState()
    const [showOfferModal, setShowOfferModal] = React.useState(false)

    const offerModal = (orderType) => {
        if ((Number(orderValue) < 1 || orderValue === 0 || orderValue === undefined) && orderType === "order") {
            setErrorM("Please enter a valid price");
            return;
        } else {
            setErrorM("")
        }
        if (orderType === "buy") {
            setType("buy")
        } else {
            setType("order")
        }
        try {
            setShowOfferModal(true)

        } catch (error) {

        }
    }

    const params = useParams();

    // React.useEffect(function () {
    //     (async function () {
    //         try {
    //             setLoading(true)
    //             sdk.setTable("pages");
    //             const result = await sdk.callRestAPI({ id: Number(params?.id), join: "", }, "GET");
    //             if (!result.error) {

    //                 setViewModel(result.model);
    //                 setLoading(false)

    //             }
    //         } catch (error) {
    //             setLoading(false)
    //             console.log("error", error);
    //             tokenExpireError(dispatch, error.message);
    //         }
    //         setLoading(false)
    //     })();
    // }, []);
    return (
        <div className="">
            {/* {loading ? (<SkeletonLoader />) : ( */}
            <ClientTopNav />
            <div className="bg-black flex flex-col items-stretch pt-">
                <div className="bg-neutral-900 flex w-full flex-col items-stretch pt-8 pb-12 px-20 max-md:max-w-full max-md:px-5">
                    {/* <div className="flex w-full items-center justify-between gap-5 mt- max-md:max-w-full max-md:flex-wrap max-md:mr-1.5">
                        <div className="flex items-stretch gap-2.5 my-auto">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce56949-7839-4b77-a1f9-b0435cd17105?"
                                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                            />
                            <div className="text-zinc-100 text-xl font-medium leading-7 self-center grow whitespace-nowrap my-auto">
                                Live
                            </div>
                        </div>
                        <div className="self-stretch flex items-start justify-between gap-2.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9566430b-7ec5-449b-9c9f-1c3b3ed03247?"
                                className="aspect-square object-contain object-center w-[25px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                            />
                            <div className="text-zinc-100 text-xl font-medium leading-7 self-center my-auto">
                                Recent
                            </div>
                            <div className="bg-white self-stretch flex items-stretch justify-between gap-5 pl-6 pr-7 py-5 rounded-lg max-md:px-5">
                                <div className="text-black text-lg leading-6">Globel</div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fdd95ac-7457-4b4b-9b21-a29df9aaea25?"
                                    className="aspect-[1.7] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full self-start"
                                />
                            </div>
                            <div className="bg-white self-stretch flex items-stretch justify-between gap-5 pl-4 pr-20 py-3 rounded-lg max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0426a003-0408-47d9-b441-b53c43237a4f?"
                                    className="aspect-square object-contain object-center w-[26px] overflow-hidden shrink-0 max-w-full"
                                />
                                <div className="text-stone-300 text-lg leading-5 self-center grow whitespace-nowrap my-auto">
                                    Recent
                                </div>
                            </div>
                            <div className="text-zinc-100 text-xl font-medium leading-7 self-center my-auto">
                                Confirmed
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1477ffaf-05c3-4322-b256-f2be811604ad?"
                                className="aspect-square object-contain object-center w-[21px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca22be8-cc7e-4862-9ba8-76617b36c4a2?"
                                className="aspect-square object-contain object-center w-[25px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                            />
                            <div className="text-zinc-100 text-xl font-medium leading-7 self-center whitespace-nowrap my-auto">
                                History
                            </div>
                        </div>
                    </div> */}
                    <div className="mt-8 max-md:max-w-full max-md:mr-1.5">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                            <div className="flex flex-col items-stretch w-[76%] max-md:w-full max-md:ml-0">
                                <div className="relative fle min-h-[523px w-full bg-red-500 gro items-star ">
                                    {/* <div style={{
                                        width: '300px',
                                        height: '300px',
                                        overflow: 'hidden',
                                    }}>
                                        <VideoCover videoOptions={{ src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }} />
                                    </div> */}
                                    <Player>
                                        <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" className="w-full h-full" />
                                    </Player>
                                    {/* <ReactPlayer url="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1" controls playsinline width="100%" /> */}
                                    {/* <img
                                        loading="lazy"
                                    srcSet="..."
                                    className="absolute h-full w-full object-cover object-center inset-0"
                                    /> */}
                                    <div className="text-white rounded-md font-bold opacity-80 bg-black text-sm absolute bottom-10 left-4 p-2">
                                        Bombing in downtown, France. 05-23-202
                                    </div>
                                    {/* <div className="relative bg-black self-stretch flex flex-col items-stretch mt-6 pb-3 rounded-none max-md:max-w-full">
                                        <div className="bg-white flex flex-col items-stretch max-md:max-w-full">
                                            <div className="bg-red-500 flex shrink-0 h-[3px] flex-col max-md:max-w-full" />
                                        </div>
                                        <div className="flex w-full items-stretch justify-between gap-5 mt-2.5 pr-11 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                                            <div className="flex items-center justify-between gap-4 max-md:justify-center">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1b2c1ca-dfdf-4247-b722-c99fd458fa02?"
                                                    className="aspect-[0.87] object-contain object-center w-[13px] overflow-hidden self-stretch shrink-0 max-w-full"
                                                />
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e48ba5c-fecc-4098-9b82-90e7246594b7?"
                                                    className="aspect-[0.73] object-contain object-center w-[11px] overflow-hidden self-stretch shrink-0 max-w-full"
                                                />
                                                <div className="text-zinc-100 text-sm leading-4 grow whitespace-nowrap my-auto">
                                                    0:00/5:14:00
                                                </div>
                                            </div>
                                            <div className="flex items-stretch justify-between gap-3">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a180534-6d52-4402-9dc8-66f255b02bf5?"
                                                    className="aspect-[1.14] object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
                                                />
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f2cb24-3c47-47ff-9417-20040b88df91?"
                                                    className="aspect-square object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full"
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex flex-col items-stretch w-[24%] ml-5 max-md:w-full max-md:ml-0">
                                <div className="flex grow flex-col gap-3 items-stretch max-md:mt-5">
                                    <div className="flex-col flex max:w-[302px] border items-center px-">
                                        <div style={{
                                            position: 'relative',
                                        }}>
                                            <video onContextMenu={handleContextMenu} controlsList="nodownload" oncontextmenu="return false;" playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}`} />
                                            <Link to={`/client/view-video/2`}>
                                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                                            </Link>

                                        </div>
                                    </div>
                                    <div className="flex-col flex max:w-[302px] border items-center px-">
                                        <div style={{
                                            position: 'relative',
                                        }}>
                                            <video onContextMenu={handleContextMenu} controlsList="nodownload" oncontextmenu="return false;" playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}#t=1.5`} />
                                            {/* <VideoThumbnail
                                                videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
                                            /> */}
                                            <Link to={`/client/view-video/2`}>
                                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                                            </Link>

                                        </div>
                                    </div>
                                    <div className="flex-col flex max:w-[302px] border items-center px-">
                                        <div style={{
                                            position: 'relative',
                                        }}>
                                            <video onContextMenu={handleContextMenu} controlsList="nodownload" oncontextmenu="return false;" playsInline controls src={`${"https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"}#t=1.5`} />
                                            <Link to={`/client/view-video/2`}>
                                                <PlayCircleIcon className="text-white absolute w-12 top-[35%] bottom-0 left-[40%] cursor-pointer" />
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!localStorage.getItem('token') ?
                        <div className="mt-5 mb-12 max-md:max-w-full max-md:mr-1.5 max-md:mb-10">
                            <div className="gap-5 justify-between w-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                                <div className="flex flex-col md:flex-row items-stretch w-ful max-md:w-full max-md:ml-0">
                                    <div className="flex flex-col w-[350px] items-stretch max-md:mt-9">
                                        <div className="flex justify-between  items-start gap-4">
                                            <div className="">
                                                <UserCircleIcon className="text-white w-16" />
                                            </div>
                                            <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
                                                <div className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap">
                                                    BigMadWatch
                                                </div>
                                                <div className="text-zinc-100 text-sm leading-4 whitespace-nowrap mt-2.5">
                                                    Creator
                                                </div>
                                                <div className="text-zinc-100 text-base leading-5 mt-8">
                                                    Bombing in downtown France
                                                    <br />
                                                    <span className="mt-4 block">May 23, 2021</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-20">
                                            <div className="self-center flex max-w-full flex-c text-start o justify-start mt-9">
                                                <div className="text-zinc-100 flex gap-1 text-base font-bold leading-5 whitespace-nowrap justify-start">
                                                    <span>Views</span>
                                                    <span>:</span>
                                                    <span>500</span>
                                                </div>
                                            </div>
                                            <div className="self-center flex max-w-full flex-co justify-start mt-2">
                                                <div className="text-zinc-100 flex gap-1 text-base font-bold leading-5 whitespace-nowrap justify-start">
                                                    <span>Downloads</span>
                                                    <span>:</span>
                                                    <span>50</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-stretch w-ful ml-5 max-md:w-full max-md:ml-0">
                                        <div className="border flex grow flex-col px-7 max-md:px-5 items-stretch w-full mt-1.5 mx-auto pt-6 pb-3 rounded-md border-solid border-white max-md:max-w-full max-md:mt-10">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="self-stretch flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-lg font-bold leading-6">
                                                        Video #20AB
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex w-full items-stretch justify-between gap-5 mt-3 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="flex items-stretch justify-between gap-3 max-md:justify-center">
                                                        <div className="">
                                                            <UserCircleIcon className="text-white w-16" />
                                                        </div>
                                                        <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                                                            <div className="text-zinc-100 text-base font-bold leading-5 whitespace-nowrap">
                                                                Ryan Wong
                                                            </div>
                                                            <div className="text-zinc-100 text-sm leading-4 whitespace-nowrap mt-3">
                                                                Owner
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inline-grid md:flex space-x-4">
                                                    <div className="mt-10">
                                                        <span className="text-white font-bold">Set asking price</span>
                                                        <div className="text-stone-300 text-base leading-5 whitespace-nowrap bg-white self-center w-full max-w-full mt-1 rounded-md items-start max-md:pl-0.5">
                                                            <input type="text" value={orderValue} onChange={(e) => setOrderValue(e.target.value)} className="w-full text-black" placeholder="0.00" />
                                                        </div>
                                                        <div onClick={() => offerModal("order")} className="text-zinc-100 cursor-pointer text-lg font-bold leading-6 mt-1 space-x-2 whitespace-nowrap w-full max-w-full items-center">
                                                            <input type="checkbox" />
                                                            <span className="text-xs">Not for sale</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-10">
                                                        <span className="text-white font-bold">Set minimum offer</span>
                                                        <div className="text-stone-300 text-base leading-5 whitespace-nowrap bg-white self-center w-full max-w-full mt-1 rounded-md items-start max-md:pl-0.5">
                                                            <input type="text" value={orderValue} onChange={(e) => setOrderValue(e.target.value)} className="w-full text-black" placeholder="0.00" />
                                                        </div>
                                                        <div onClick={() => offerModal("order")} className="text-zinc-100 cursor-pointer text-lg font-bold leading-6 mt-1 space-x-2 whitespace-nowrap w-full max-w-full items-center">
                                                            <input type="checkbox" />
                                                            <span className="text-xs">Not accepting offer</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div onClick={() => offerModal("buy")} className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap bg-red-500 hover:cursor-pointer self-stretch items-center text-center mt-8 px-5 py-4 rounded-md max-md:max-w-full">
                                                    Update
                                                </div>
                                                <div className="text-zinc-100 text-lg font-bold leading-6 self-stretch whitespace-nowrap mt-10 max-md:max-w-full max-md:mt-10">
                                                    Latest Offers
                                                </div>
                                                <div className="self-stretch flex w-full items-center justify-between gap-5 mt-7 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-base leading-5 my-auto">
                                                        From: John Fresh
                                                    </div>
                                                    <div>
                                                        <div className="self-stretch flex items-stretch justify-between gap-4">
                                                            <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                                                <span className=" text-white">R</span>
                                                            </div>
                                                            <div className="text-zinc-100 text-base font-bold leading-5 self-center grow whitespace-nowrap my-auto">
                                                                223.323
                                                            </div>
                                                        </div>
                                                        <button></button>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex w-full items-center justify-between gap-5 mt-7 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-base leading-5 my-auto">
                                                        From: Tony Fred
                                                    </div>
                                                    <div className="self-stretch flex items-stretch justify-between gap-4">
                                                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                                            <span className=" text-white">R</span>
                                                        </div>
                                                        <div className="text-zinc-100 text-base font-bold leading-5 self-center grow whitespace-nowrap my-auto">
                                                            223.323
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-stretch w-[22%] ml-5 max-md:w-full max-md:ml-0">
                                    <div className="flex flex-col items-stretch mt-5 max-md:mt-10">
                                        <div className="flex gap-4 pr-5 items-start">
                                            {/* <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c6a5f34-aa57-44e1-b784-b4051d224a17?"
                                        className="aspect-square object-contain object-center w-5 overflow-hidden self-stretch shrink-0 max-w-full"
                                    /> */}
                                            <PlusCircleIcon className="text-white w-8" />
                                            <div className="text-zinc-100 text-2xl font-bold leading-7">
                                                Confirmed
                                            </div>
                                        </div>

                                        <div className="bg-white flex items-stretch justify-between gap-5 mt-7 pl-5 pr-14 py-4 rounded-lg max-md:pr-5">
                                            <div className="text-black text-lg leading-6">Promote to</div>
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33e2d0e-fa6d-4889-b501-3664f78794fd?"
                                                className="aspect-[1.7] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
                                            />
                                        </div>
                                        <div className="bg-white flex flex-col mt-2 pl-5 pr-20 py-5 rounded-md items-start max-md:pr-5">
                                            <div className="text-black text-lg leading-6 whitespace-nowrap">
                                                Global
                                            </div>
                                            <div className="text-black text-lg leading-6 whitespace-nowrap mt-4">
                                                Asia
                                            </div>
                                            <div className="text-black text-lg leading-6 whitespace-nowrap mt-4">
                                                Europe
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :

                        <div className="mt-5 mb-12 max-md:max-w-full max-md:mr-1.5 max-md:mb-10">
                            <div className="gap-5 justify-between w-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                                <div className="flex flex-col md:flex-row items-stretch w-ful max-md:w-full max-md:ml-0">
                                    <div className="flex flex-col w-[350px] items-stretch max-md:mt-9">
                                        <div className="flex justify-between  items-start gap-4">
                                            <div className="">
                                                <UserCircleIcon className="text-white w-16" />
                                            </div>
                                            <div className="flex grow basis-[0%] flex-col items-stretch mt-5">
                                                <div className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap">
                                                    BigMadWatch
                                                </div>
                                                <div className="text-zinc-100 text-sm leading-4 whitespace-nowrap mt-2.5">
                                                    Creator
                                                </div>
                                                <div className="text-zinc-100 text-base leading-5 mt-8">
                                                    Bombing in downtown France
                                                    <br />
                                                    <span className="mt-4 block">May 23, 2021</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-20">
                                            <div className="self-center flex max-w-full flex-c text-start o justify-start mt-9">
                                                <div className="text-zinc-100 flex gap-1 text-base font-bold leading-5 whitespace-nowrap justify-start">
                                                    <span>Views</span>
                                                    <span>:</span>
                                                    <span>500</span>
                                                </div>
                                            </div>
                                            <div className="self-center flex max-w-full flex-co justify-start mt-2">
                                                <div className="text-zinc-100 flex gap-1 text-base font-bold leading-5 whitespace-nowrap justify-start">
                                                    <span>Downloads</span>
                                                    <span>:</span>
                                                    <span>50</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-stretch w-ful ml-5 max-md:w-full max-md:ml-0">
                                        <div className="border flex grow flex-col px-7 max-md:px-5 items-stretch w-full mt-1.5 mx-auto pt-6 pb-3 rounded-md border-solid border-white max-md:max-w-full max-md:mt-10">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="self-stretch flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-lg font-bold leading-6">
                                                        Video #20AB
                                                    </div>
                                                    <div className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap">
                                                        Asking Price
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex w-full items-stretch justify-between gap-5 mt-3 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="flex items-stretch justify-between gap-3 max-md:justify-center">
                                                        <div className="">
                                                            <UserCircleIcon className="text-white w-16" />
                                                        </div>
                                                        <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                                                            <div className="text-zinc-100 text-base font-bold leading-5 whitespace-nowrap">
                                                                Ryan Wong
                                                            </div>
                                                            <div className="text-zinc-100 text-sm leading-4 whitespace-nowrap mt-3">
                                                                Owner
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-stretch gap-4 mt-1.5 self-start">
                                                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                                            <span className=" text-white">R</span>
                                                        </div>
                                                        <div className="text-zinc-100 text-base font-bold leading-5 self-center grow whitespace-nowrap my-auto">
                                                            200.00 coins
                                                        </div>
                                                    </div>
                                                </div>
                                                <div onClick={() => offerModal("buy")} className="text-zinc-100 text-lg font-bold leading-6 whitespace-nowrap bg-red-500 hover:cursor-pointer self-stretch items-center text-center mt-8 px-5 py-4 rounded-md max-md:max-w-full">
                                                    Buy Now
                                                </div>
                                                <div className="text-zinc-100 text-lg font-bold leading-6 self-stretch whitespace-nowrap mt-10 max-md:max-w-full max-md:mt-10">
                                                    Latest Offers
                                                </div>
                                                <div className="self-stretch flex w-full items-center justify-between gap-5 mt-7 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-base leading-5 my-auto">
                                                        From: John Fresh
                                                    </div>
                                                    <div className="self-stretch flex items-stretch justify-between gap-4">
                                                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                                            <span className=" text-white">R</span>
                                                        </div>
                                                        <div className="text-zinc-100 text-base font-bold leading-5 self-center grow whitespace-nowrap my-auto">
                                                            223.323
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex w-full items-center justify-between gap-5 mt-7 pr-0.5 max-md:max-w-full max-md:flex-wrap">
                                                    <div className="text-zinc-100 text-base leading-5 my-auto">
                                                        From: Tony Fred
                                                    </div>
                                                    <div className="self-stretch flex items-stretch justify-between gap-4">
                                                        <div className="w-8 h-8 rounded-[50%] bg-red-600 flex justify-center items-center">
                                                            <span className=" text-white">R</span>
                                                        </div>
                                                        <div className="text-zinc-100 text-base font-bold leading-5 self-center grow whitespace-nowrap my-auto">
                                                            223.323
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-stone-300 text-base leading-5 whitespace-nowrap bg-white self-center w-full max-w-full mt-10 rounded-md items-start max-md:pl-0.5">
                                                <input type="text" value={orderValue} onChange={(e) => setOrderValue(e.target.value)} className="w-full text-black" placeholder="0.00" />
                                            </div>
                                            {errorM !== "" &&
                                                <p className="pt-1 italic text-red-500">{errorM}</p>
                                            }
                                            <div onClick={() => offerModal("order")} className="text-zinc-100 cursor-pointer text-lg font-bold leading-6 text-center whitespace-nowrap bg-black self-center w-full max-w-full items-center mt-5 px-5 py-4 rounded-md">
                                                Make an offer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-stretch w-[22%] ml-5 max-md:w-full max-md:ml-0">
                                    <div className="flex flex-col items-stretch mt-5 max-md:mt-10">
                                        <div className="flex gap-4 pr-5 items-start">
                                            {/* <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c6a5f34-aa57-44e1-b784-b4051d224a17?"
                                            className="aspect-square object-contain object-center w-5 overflow-hidden self-stretch shrink-0 max-w-full"
                                        /> */}
                                            <PlusCircleIcon className="text-white w-8" />
                                            <div className="text-zinc-100 text-2xl font-bold leading-7">
                                                Confirmed
                                            </div>
                                        </div>

                                        <div className="bg-white flex items-stretch justify-between gap-5 mt-7 pl-5 pr-14 py-4 rounded-lg max-md:pr-5">
                                            <div className="text-black text-lg leading-6">Promote to</div>
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33e2d0e-fa6d-4889-b501-3664f78794fd?"
                                                className="aspect-[1.7] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
                                            />
                                        </div>
                                        <div className="bg-white flex flex-col mt-2 pl-5 pr-20 py-5 rounded-md items-start max-md:pr-5">
                                            <div className="text-black text-lg leading-6 whitespace-nowrap">
                                                Global
                                            </div>
                                            <div className="text-black text-lg leading-6 whitespace-nowrap mt-4">
                                                Asia
                                            </div>
                                            <div className="text-black text-lg leading-6 whitespace-nowrap mt-4">
                                                Europe
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Offer Modal  */}
            {showOfferModal &&
                <OrderModal showOfferModal={showOfferModal} setShowOfferModal={setShowOfferModal} orderValue={orderValue} type={type} />
            }
        </div>

    )
};
export default ViewPagesPage;

