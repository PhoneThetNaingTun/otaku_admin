"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeletePage, GetPages } from "@/store/Slices/PageSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NewPageDialog } from "./NewPageDialog";
import Image from "next/image";
import { TrashIconDeleteDialog } from "@/components/TrashIconDeleteDialog";
import { useToast } from "@/hooks/use-toast";

export const MangaSeasonChapterDetailPageClient = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { mangaSeasonChapterId } = param;
  const { pages, pageLoading } = useAppSelector((state) => state.Page);
  const [selectedImage, setSelectedImage] = useState<string | null>("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      dispatch(
        GetPages({
          mangaSeasonChapterId: mangaSeasonChapterId as string,
          onSuccess: () => {
            setIsLoaded(true);
          },
        })
      );
    }
  }, [isLoaded, dispatch, mangaSeasonChapterId]);
  const handleDeletePage = (id: string) => {
    dispatch(
      DeletePage({
        id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

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
      <div className="sticky top-5 z-10">
        <NewPageDialog mangaSeasonChapterId={mangaSeasonChapterId as string} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {pages.length > 0 ? (
          pages.map((page, index) => (
            <div key={page.id} className="relative">
              <Image
                src={page.imgUrl}
                alt={page.imgUrl}
                width={1000}
                height={1000}
                onClick={() => {
                  setSelectedImage(page.imgUrl);
                }}
                className=" h-[500px] md:h-[400px] rounded-md object-cover cursor-pointer"
              />
              <div className="absolute -top-1 -right-1">
                <TrashIconDeleteDialog
                  loading={pageLoading}
                  onDelete={() => {
                    handleDeletePage(page.id);
                  }}
                  description=""
                />
              </div>
              <div className="mt-3">
                <p className="font-bold text-center">Page No. {index + 1}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No pages</div>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close when clicking the background
        >
          <Image
            src={selectedImage}
            alt="Selected"
            width={1000}
            height={1000}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
