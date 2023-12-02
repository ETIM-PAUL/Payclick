
// import { Close, danger, warning } from 'Assets/svgs'
import React from 'react'


const ModalAlert = ( { closeModalFunction, message, title, messageClasses, titleClasses, buttonText = "OK" } ) => {
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
            {/* <img src={danger} width={30} height={30} alt='danger' /> */ }
          </div>
          <button onClick={ closeModalFunction }>
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
            <div className={ `text-[1.5rem] leading-[1.5rem] text-[#667085] font-normal ${ messageClasses }` }>
              { message }
              {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */ }
            </div> : null
        }

        <div className='w-full flex justify-center items-center font-medium text-[base] leading-[1.5rem]'>
          <button
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={ {
              width: '10.375rem',
              height: '2.75rem',
            } }
            onClick={ closeModalFunction }
          >
            { buttonText }
          </button>
        </div>
      </section>
    </aside>
  )
}

export default ModalAlert
