
    import Skeleton from "react-loading-skeleton";

import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex max-h-screen w-full flex-col gap-5 overflow-hidden p-4">
      {/* <Skeleton circle width={60} height={60} /> */}
      <Skeleton count={2} height={25} style={{ marginBottom: "0.6rem" }} />
      <Skeleton count={1} height={60} style={{ marginBottom: "0.6rem" }} />
      <Skeleton count={3} height={25} style={{ marginBottom: "0.6rem" }} />
      <Skeleton count={1} height={80} style={{ marginBottom: "0.6rem" }} />
      <Skeleton count={1} height={25} style={{ marginBottom: "0.6rem" }} />
    </div>
  );
};

export default SkeletonLoader;

