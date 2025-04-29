import { motion } from "framer-motion";
import { ReactNode } from "react";

const Popup = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/70 px-5"
    >
      {children}
    </motion.div>
  );
};

export default Popup;
