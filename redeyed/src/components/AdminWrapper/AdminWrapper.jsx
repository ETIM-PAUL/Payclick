
  

import React, { Suspense, memo } from "react";

import {AdminHeader} from "Components/AdminHeader";
import {TopHeader} from "Components/TopHeader";
import { Spinner } from "Assets/svgs";
const  navigation = []
const AdminWrapper = ({ children }) => {
  return (
    <div id="admin_wrapper" className={`flex w-full max-w-full flex-col`}>
      <div className={`flex min-h-screen w-full max-w-full `}>
        <AdminHeader
        
        />
        <div className={`mb-20 w-full overflow-hidden`}>
        <TopHeader />
          <Suspense
            fallback={
              <div
                className={`flex h-screen w-full items-center justify-center`}
              >
                <Spinner size={100} color="#2CC9D5" />
              </div>
            }
          >
            <div className="w-full overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminWrapper);

