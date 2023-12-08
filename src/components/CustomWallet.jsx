import { WalletButton } from '@rainbow-me/rainbowkit';
import metamaskjpg from '../assets/MetaMask .png'
import coinbase from '../assets/Coinbasepng .png'
import wallectCon from '../assets/WalletConnect jpeg.png'
import fortmaticP from '../assets/Fortmatic.png'
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function CustomWallet() {
  const {address}= useAccount()
  const [connected, setConnected]=useState(false)
  const [mMask, setMMask]=useState(false)
  const [coin, setCoin] = useState(false)
  const [walcon, setWalCon] = useState(false)
  const [fort, setFort] = useState(false)
  // console.log(mMask);
  return (
        <div className="mt-10">
        <WalletButton.Custom wallet="metamask">
        {({ ready, connect,disconnect }) => {
          return (
            <>
            {!mMask ? 

            <button
              type="button"
              disabled={!ready}
              // onClick={()=>{connect(); setMMask(true); setConnected(true)}}
              onClick={connect}
              className="border-[1px] w-[100%]  border-[#F1F1F1] bg-[#4E4E4E] flex justify-between items-center px-[10px] rounded-lg h-[48px] cursor-pointer">
                <h2 className="text-[#F1F1F1]">{"MetaMask"}</h2>
                <img src={metamaskjpg} alt="" className='w-[24px] h-[24px]'/>

            </button>
            :
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{disconnect; setMMask(false); setConnected(false)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] bg-[#4E4E4E] flex justify-between items-center px-[10px] rounded-lg h-[48px] cursor-pointer">
                <h2 className="text-[#F1F1F1]">{` Connected`}</h2>
                <img src={metamaskjpg} alt="" className='w-[24px] h-[24px]'/>

            </button>
            }
            </>
          );
        }}
      </WalletButton.Custom>
        <WalletButton.Custom wallet="coinbase">
        {({ ready, connect,disconnect }) => {
          return (
            <>
            {!coin && !connected ?
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{connect(); setCoin(true); setConnected(true)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg h-[48px] bg-[#4E4E4E] mt-8">
                <h2 className="text-[#F1F1F1]">{"Coinbase Wallet"}</h2>
                <img src={coinbase} alt="" className='w-[24px] h-[24px]'/>

            </button>
            :
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{disconnect; setCoin(false);setConnected(false)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg h-[48px] bg-[#4E4E4E] mt-8">
                <h2 className="text-[#F1F1F1]">{'Connected'}</h2>
                <img src={coinbase} alt="" className='w-[24px] h-[24px]'/>

            </button>
        }
            </>
          );
        }}
      </WalletButton.Custom>

        <WalletButton.Custom wallet="walletconnect">
        {({ ready, connect, disconnect }) => {
          return (
            <>
            {!walcon && !connected ?
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{connect(); setWalCon(true); setConnected(true)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">{"Wallet Connect" }</h2>
                <img src={wallectCon} alt="" className='w-[24px] h-[24px]'/>

            </button>
            :
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{disconnect(); setWalCon(fasle); setConnected(false)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">{ 'Connected'}</h2>
                <img src={wallectCon} alt="" className='w-[24px] h-[24px]'/>

            </button>
            
          }
            </>
          );
        }}
      </WalletButton.Custom>
        <WalletButton.Custom wallet="walletconnect">
        {({ ready, connect, disconnect }) => {
          return (
            <>
            {
              !fort && !connected  ?
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{connect(); setFort(true); setConnected(true)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">{"Fortmatic"}</h2>
                <img src={fortmaticP} alt="" className='w-[24px] h-[24px]'/>

            </button>
            :
            <button
              type="button"
              disabled={!ready}
              onClick={()=>{disconnect(); setFort(false); setConnected(false)}}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">{'Connected'}</h2>
                <img src={fortmaticP} alt="" className='w-[24px] h-[24px]'/>

            </button>
            }
            </>
          );
        }}
      </WalletButton.Custom>

        </div>
  )
}
