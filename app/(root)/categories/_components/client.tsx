"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { categoryColumn } from "./columns";
import { NewCategoryDialog } from "./NewCategoryDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCategories } from "@/store/Slices/CategorySlice";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Heading } from "@/components/Heading";

export const CategoryPageClient = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.Category);
  const [isloaded, setIsLoaded] = useState<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {
    dispatch(
      getCategories({
        onSuccess: () => {
          setIsLoaded(true);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  }, [dispatch]);

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
        <Heading heading="Categories" />
        <NewCategoryDialog />
      </div>
      <DataTable
        columns={categoryColumn}
        data={categories}
        filterKey="category_name"
      />
    </div>
  );
};
