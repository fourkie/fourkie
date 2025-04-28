"use client";

import { useEffect } from "react";

const ScrollZero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollZero;
