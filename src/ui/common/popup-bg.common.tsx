import { ReactNode } from "react";

const Popup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/70 z-50 flex justify-center items-center px-5">
      {children}
    </div>
  );
};

export default Popup;
