import React from 'react'
import Layout from '../components/Layout'
import TopNav from '../components/TopNav'

const Members = () => {
  return (
    <Layout>
      <div className="bg-stone block pb-20">
        <div className="gap-5  max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch ml- max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
              <TopNav heading="Members" />

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Members