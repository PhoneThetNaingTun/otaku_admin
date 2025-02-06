"use client";

import { Heading } from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { chapterColumn } from "./column";
import { NewChapterDialog } from "./NewChapterDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetChapters } from "@/store/Slices/ChapterSlice";
import Image from "next/image";

export const ChapterPageClient = () => {
  const dispatch = useAppDispatch();
  const { chapters } = useAppSelector((state) => state.Chapter);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(
      GetChapters({
        onSuccess: () => {
          setIsLoaded(true);
        },
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
      <div className="flex items-center justify-between">
        <Heading heading="Chapters" />
        <NewChapterDialog />
      </div>
      <DataTable columns={chapterColumn} data={chapters} filterKey="chapter" />
    </div>
  );
};
