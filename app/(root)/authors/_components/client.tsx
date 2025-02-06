"use client";
import { Heading } from "@/components/Heading";
import React, { useEffect, useState } from "react";
import { NewAuthorDialog } from "./NewAuthorDialog";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAuthors } from "@/store/Slices/AuthorSlice";
import { DataTable } from "@/components/ui/data-table";
import { authroColumn } from "./column";

export const AuthorPageClient = () => {
  const dispatch = useAppDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const { authors } = useAppSelector((state) => state.Author);
  useEffect(() => {
    dispatch(
      getAuthors({
        onSuccess: () => {
          setIsLoaded(true);
        },
        onError: () => {},
      })
    );
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src="/gif/loadingRimuru.gif"
          alt="loading"
          width={1000}
          height={1000}
          className="w-20 h-20"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading heading="Authors" />
        <NewAuthorDialog />
      </div>
      <DataTable
        columns={authroColumn}
        data={authors}
        filterKey="author_name"
      />
    </div>
  );
};
