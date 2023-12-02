import { WalletButton } from '@rainbow-me/rainbowkit';
import metamaskjpg from '../assets/MetaMask .png'
import coinbase from '../assets/Coinbasepng .png'
import wallectCon from '../assets/WalletConnect jpeg.png'
import fortmaticP from '../assets/Fortmatic.png'

export default function CustomWallet() {
  return (
        <div className="mt-10">
        <WalletButton.Custom wallet="metamask">
        {({ ready, connect }) => {
          return (
            <button
              type="button"
              disabled={!ready}
              onClick={connect}
              className="border-[1px] w-[100%]  border-[#F1F1F1] bg-[#4E4E4E] flex justify-between items-center px-[10px] rounded-lg h-[48px]">
                <h2 className="text-[#F1F1F1]">MetaMask</h2>
                <img src={metamaskjpg} alt="" className='w-[24px] h-[24px]'/>

            </button>
          );
        }}
      </WalletButton.Custom>
        <WalletButton.Custom wallet="coinbase">
        {({ ready, connect }) => {
          return (
            <button
              type="button"
              disabled={!ready}
              onClick={connect}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg h-[48px] bg-[#4E4E4E] mt-8">
                <h2 className="text-[#F1F1F1]">Coinbase Wallet</h2>
                <img src={coinbase} alt="" className='w-[24px] h-[24px]'/>

            </button>
          );
        }}
      </WalletButton.Custom>

        <WalletButton.Custom wallet="walletconnect">
        {({ ready, connect }) => {
          return (
            <button
              type="button"
              disabled={!ready}
              onClick={connect}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">Wallet Connect</h2>
                <img src={wallectCon} alt="" className='w-[24px] h-[24px]'/>

            </button>
          );
        }}
      </WalletButton.Custom>
        <WalletButton.Custom wallet="walletconnect">
        {({ ready, connect }) => {
          return (
            <button
              type="button"
              disabled={!ready}
              onClick={connect}
              className="border-[1px] w-[100%]  border-[#F1F1F1] flex justify-between items-center px-[10px] rounded-lg bg-[#4E4E4E] h-[48px] mt-8">
                <h2 className="text-[#F1F1F1]">Fortmatic</h2>
                <img src={fortmaticP} alt="" className='w-[24px] h-[24px]'/>

            </button>
          );
        }}
      </WalletButton.Custom>

        </div>
  )
}
