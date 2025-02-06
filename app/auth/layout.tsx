"use client";

import Image from "next/image";
import React, { useEffect } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Image
          src="/gif/loadingRimuru.gif"
          alt="loading"
          width={1000}
          height={1000}
          className="w-40 h-40"
        />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default MainLayout;
