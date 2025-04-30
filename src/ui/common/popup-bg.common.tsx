import { motion } from "framer-motion";
import { ReactNode } from "react";

const Popup = ({
  children,
  isPopup = true,
}: {
  children: ReactNode;
  isPopup?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-5"
    >
      {isPopup ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", duration: 0.4, bounce: 0.35 },
            opacity: { duration: 0.2 },
          }}
          className="flex w-full justify-center"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default Popup;
