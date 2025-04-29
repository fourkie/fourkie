import { ReactNode } from "react";

const Popup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 px-5">
      {children}
    </div>
  );
};

export default Popup;
