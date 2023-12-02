
  import { lazy } from "react";

  export const CloseIcon = lazy(() => import("./CloseIcon").then((module) => ({ default: module.CloseIcon })));
  export const DangerIcon = lazy(() => import("./DangerIcon").then((module) => ({ default: module.DangerIcon })));
  export const Spinner = lazy(() => import("./Spinner").then((module) => ({ default: module.Spinner })));
  
    