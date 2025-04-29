import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 360);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return isMobile;
};
export default useIsMobile;
