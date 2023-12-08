import React from 'react'
import SignUpComp from '../components/SignUpComp'

const SignIn = () => {
  return (
    <main>
      <div className="items-stretch flex w-[217px] max-w-full gap-5 ml-4 mt-2.5 self-start max-md:ml-2.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f39065ba-b0c5-4e01-8582-24c3a73fd8bf?"
            className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full" />
          <div className="text-white text-3xl font-semibold leading-10 grow whitespace-nowrap">
            Payclick
          </div>
          </div>
          <SignUpComp/>
    </main>
  )
}

export default SignIn