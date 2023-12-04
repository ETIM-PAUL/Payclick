

import React from "react";

import { motion } from "framer-motion";

const containerVariant = {
  start: {
    transition: { staggerChildren: 0.2 }
  },
  end: {
    transition: { staggerChildren: 0.2 }
  }
};

const dotsVariants = {
  start: {
    y: "0%"
  },
  end: {
    y: "100%"
  }
};

const loadingTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeIn"
};

export default function Indicator({ dotsClasses, size, style }) {
  const dotsStyles = "block w-[9px] h-[9px] bg-slate-900 rounded-md shrink-0 " + dotsClasses;
  return (
    <motion.div
      variants={containerVariant}
      className={`flex justify-between items-center w-[40px] pb-[10px]`}
      initial="start"
      animate="end"
      style={{ ...style }}
    >
      <motion.span
        className={dotsStyles}
        variants={dotsVariants}
        transition={loadingTransition}
      />
      <motion.span
        className={dotsStyles}
        variants={dotsVariants}
        transition={loadingTransition}
      />
      <motion.span
        className={dotsStyles}
        variants={dotsVariants}
        transition={loadingTransition}
      />
    </motion.div>
  );
}
