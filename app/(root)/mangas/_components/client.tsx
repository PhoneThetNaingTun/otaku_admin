"use client";

import { Heading } from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { mangaColumn } from "./column";
import { NewMangaDialog } from "./NewMangaDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetMangas } from "@/store/Slices/MangaSlice";
import Image from "next/image";

export const MangaPageClient = () => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state.Author);
  const { categories } = useAppSelector((state) => state.Category);
  const { mangas } = useAppSelector((state) => state.Manga);
  const { mangaCategories } = useAppSelector((state) => state.MangaCategory);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    dispatch(
      GetMangas({
        onSuccess: () => {
          setIsLoaded(true);
        },
      })
    );
  }, []);

  const mangaData = mangas.map((manga) => {
    const id = manga.id;
    const manga_name = manga.manga_name;

    const author = authors.find(
      (author) => author.id === manga.author.id
    )?.author_name;

    const categoryIds = mangaCategories
      .filter((mangaCategory) => mangaCategory.mangaId === manga.id)
      .map((item) => item.categoryId);

    const findCategory = categories.filter((item) =>
      categoryIds.includes(item.id)
    );
    const category = findCategory.map((item) => item.category_name);
    const createdAt = manga.createdAt;
    return { id, manga_name, author, category, createdAt };
  });
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
        <Heading heading="Mangas" />
        <NewMangaDialog />
      </div>
      <DataTable
        columns={mangaColumn}
        data={mangaData}
        filterKey="manga_name"
      />
    </div>
  );
};
