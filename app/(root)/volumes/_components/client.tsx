"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { seasonColumns } from "./columns";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { getSeasons } from "@/store/Slices/SeasonSlice";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { NewSeasonDialog } from "./NewSeasonDialog";

export const SeasonPageClient = () => {
  const dispatch = useAppDispatch();
  const { seasons } = useAppSelector((state) => state.Season);
  const [isloaded, setIsLoaded] = useState<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {
    dispatch(
      getSeasons({
        onSuccess: () => {
          setIsLoaded(true);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  }, [dispatch, toast]);
  if (!isloaded) {
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
        <Heading heading="Volumes" />
        <NewSeasonDialog />
      </div>
      <DataTable data={seasons} columns={seasonColumns} filterKey="season" />
    </div>
  );
};
