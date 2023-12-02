
  import { lazy } from "react";

  export const Modal = lazy(() => import("./Modal").then((module) => ({ default: module.Modal })));
  export const ModalPrompt = lazy(() => import("./ModalPrompt"));
  export const ModalAlert = lazy(() => import("./ModalAlert"));
  
    