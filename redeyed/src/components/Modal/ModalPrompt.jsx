
  import React from "react";
  import { InteractiveButton } from "Components/InteractiveButton";
  import { CloseIcon, DangerIcon } from "Assets/svgs";


// type Props = {
//   closeModalFunction: () => void
//   actionHandler: any
//   message?: string
//   title?: string
//   rejectText?: string
//   acceptText?: string
//   titleClasses?: string
//   messageClasses?: string
// }

const ModalPrompt = ( { closeModalFunction, actionHandler, message, title, messageClasses, titleClasses, acceptText = "YES", rejectText = "NO", loading = false } ) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={ {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      } }
    >
      <section className='bg-white min-w-[25rem] w-[25rem]  rounded-[.5rem] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>
            <DangerIcon className={ `w-5 h-5` } />
            {/* <img src={danger} width={30} height={30} alt='danger' /> */ }
          </div>
          <button disabled={ loading } onClick={ closeModalFunction }>
            <CloseIcon />
            {/* <img src={Close} width={30} height={30} alt='close' /> */ }
          </button>
        </div>
        {
          title ?
            <div className={ ` ${ titleClasses }` }>
              { title }
              {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */ }
            </div> : null
        }
        {
          message ?
            <div className={ `text-[#667085] ${ messageClasses }` }>
              { message }
              {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */ }
            </div> : null
        }

        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button
            disabled={ loading }
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={ {
              width: '10.375rem',
              height: '2.75rem',
            } }
            onClick={ closeModalFunction }
          >
            { rejectText }
          </button>
          <InteractiveButton
            disabled={ loading }
            loading={ loading }
            className='border border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center gap-x-5 text-white'
            // style={ {
            //   width: '10.375rem',
            //   height: '2.75rem',
            // } }
            onClick={ actionHandler }
          >
            { acceptText }
          </InteractiveButton>
        </div>
      </section>
    </aside>
  )
}

export default ModalPrompt
