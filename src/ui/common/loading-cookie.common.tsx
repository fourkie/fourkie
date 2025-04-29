"use client";

import { motion, Variants } from "framer-motion";

const LoadingCookie = () => {
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex items-center justify-center gap-2"
    >
      <motion.div
        className="h-10 w-10 bg-[url('/images/Fluffy.png')] bg-cover"
        variants={dotVariants}
      />
      <motion.div
        className="h-10 w-10 bg-[url('/images/Fluffy.png')] bg-cover"
        variants={dotVariants}
      />
      <motion.div
        className="h-10 w-10 bg-[url('/images/Fluffy.png')] bg-cover"
        variants={dotVariants}
      />
    </motion.div>
  );
};

export default LoadingCookie;
