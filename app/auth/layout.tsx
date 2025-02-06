"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminData } from "@/store/Slices/AuthSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { admin } = useAppSelector((state) => state.Auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
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
