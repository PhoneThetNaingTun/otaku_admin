"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeleteManga, GetManga, UpdateManga } from "@/store/Slices/MangaSlice";
import { UpdateMangaPayload } from "@/types/manga";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UpdateButton } from "@/components/UpdateButton";
import { DeleteButtonDialog } from "@/components/DeleteButtonDialog";
import { getAuthors } from "@/store/Slices/AuthorSlice";
import { getCategories } from "@/store/Slices/CategorySlice";
import { Separator } from "@/components/ui/separator";
import { NewMangaSeasonDialog } from "./NewMangaSeasonDialog";
import { getSeasons } from "@/store/Slices/SeasonSlice";
import {
  DeleteMangaSeason,
  getMangaSeasonByManga,
} from "@/store/Slices/MangaSeasonSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabContents } from "./TabContents";
import { GetMangaSeasonChapters } from "@/store/Slices/MangaSeasonChapterSlice";
import { GetChapters } from "@/store/Slices/ChapterSlice";
import { TrashIconDeleteDialog } from "@/components/TrashIconDeleteDialog";
import { Textarea } from "@/components/ui/textarea";

export const MangaDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mangaId } = param;
  const { toast } = useToast();
  const { mangas, mangaLoading, getMangaLoading } = useAppSelector(
    (state) => state.Manga
  );
  const { mangaCategories } = useAppSelector((state) => state.MangaCategory);
  const { mangaSeasons, mangaSeasonLoading } = useAppSelector(
    (state) => state.MangaSeason
  );
  const { authors, getAuthorLoading } = useAppSelector((state) => state.Author);
  const { categories, getCategoryLoading } = useAppSelector(
    (state) => state.Category
  );
  const manga = mangas.find((manga) => manga.id === mangaId);
  const [updateManga, setUpdateManga] = React.useState<UpdateMangaPayload>({
    id: mangaId as string,
    manga_description: "",
    manga_image: "",
    manga_name: "",
    authorId: "",
    categoryIds: [],
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const categorySelect = categories.map((item) => {
    const value = item.id;
    const label = item.category_name;
    return {
      value,
      label,
    };
  });
  useEffect(() => {
    dispatch(
      GetManga({
        id: mangaId as string,
      })
    );
    dispatch(getAuthors({}));
    dispatch(getCategories({}));
    dispatch(getSeasons({}));
    dispatch(getMangaSeasonByManga({ mangaId: mangaId as string }));
    dispatch(GetMangaSeasonChapters({}));
    dispatch(GetChapters({}));
  }, [dispatch, mangaId]);
  const findCategory = mangaCategories.filter(
    (mangaCategory) => mangaCategory.mangaId === mangaId
  );
  const categoryIds = findCategory.map((item) => item.categoryId);
  useEffect(() => {
    if (manga) {
      setUpdateManga({
        ...manga,
        categoryIds,
      });
      setIsLoaded(true);
    }
  }, [manga, categoryIds]);

  if (!isLoaded || getAuthorLoading || getCategoryLoading || getMangaLoading) {
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

  const handleUpdateManga = () => {
    if (
      !updateManga.manga_name ||
      !updateManga.manga_image ||
      !updateManga.manga_description ||
      !updateManga.categoryIds ||
      !updateManga.authorId
    ) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      UpdateManga({
        ...updateManga,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/mangas");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteManga = () => {
    dispatch(
      DeleteManga({
        id: mangaId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/mangas");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const handleDeleteMangaSeason = (id: string) => {
    dispatch(
      DeleteMangaSeason({
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
  return (
    <div>
      <div className="mb-5">
        <Heading heading="Manga Detail" />
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="MangaName">Manga Name</Label>
              <Input
                id="MangaName"
                placeholder="eg. Naruto"
                value={updateManga.manga_name}
                onChange={(e) =>
                  setUpdateManga({ ...updateManga, manga_name: e.target.value })
                }
                disabled={mangaLoading}
              />
            </div>
            <div>
              <Label>Author</Label>
              <Select
                disabled={mangaLoading}
                value={updateManga.authorId}
                onValueChange={(value: string) =>
                  setUpdateManga({ ...updateManga, authorId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Authors</SelectLabel>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.author_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categories</Label>
              <MultiSelect
                options={categorySelect}
                onValueChange={(e) => {
                  setUpdateManga({ ...updateManga, categoryIds: e });
                }}
                placeholder="Select Categories"
                animation={2}
                disabled={mangaLoading}
                defaultValue={updateManga.categoryIds}
              />
            </div>
            <div>
              <Label htmlFor="MangaDescription">Manga Description</Label>
              <Textarea
                id="MangaDescription"
                placeholder="eg. Yesss"
                onChange={(e) =>
                  setUpdateManga({
                    ...updateManga,
                    manga_description: e.target.value,
                  })
                }
                disabled={mangaLoading}
                value={updateManga.manga_description}
              />
            </div>
          </div>
          <div className="w-full  ">
            <Label>Image</Label>
            <div className="flex flex-col lg:flex-row justify-around gap-5 items-center">
              {updateManga.manga_image ? (
                <Image
                  src={updateManga.manga_image}
                  alt="image"
                  className="flex-1 h-[400px] object-cover rounded-md"
                  width={1000}
                  height={1000}
                />
              ) : (
                <div className="flex-1 h-[400px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
              <CldUploadWidget
                uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
                options={{ folder: "manga-images" }}
                onSuccess={(result: any) => {
                  const secureUrl = result?.info?.secure_url;
                  if (secureUrl) {
                    setUpdateManga((prev) => ({
                      ...prev,
                      manga_image: secureUrl,
                    }));
                  }
                }}
              >
                {({ open }) => {
                  function handleOnClick() {
                    open();
                  }
                  return (
                    <Button
                      variant="outline"
                      onClick={handleOnClick}
                      disabled={mangaLoading}
                      className="flex-1 mt-4"
                    >
                      <ImagePlusIcon /> Update an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <div className="flex justify-between mt-5 items-center">
            <UpdateButton onClick={handleUpdateManga} loading={mangaLoading} />
            <DeleteButtonDialog
              onDelete={handleDeleteManga}
              loading={mangaLoading}
            />
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Heading heading="Add Volume" />
        <NewMangaSeasonDialog
          mangaId={mangaId as string}
          loading={mangaSeasonLoading}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>

      <div>
        <Tabs defaultValue={mangaSeasons[0]?.id}>
          <TabsList className="w-full flex flex-wrap h-full justify-start gap-y-2">
            {mangaSeasons.map((item) => (
              <TabsTrigger
                value={item.id}
                key={item.id}
                className="relative px-10 cursor-pointer mx-4"
                asChild
              >
                <div>
                  {item.season.season}
                  <div className="absolute -top-2 -right-2">
                    <TrashIconDeleteDialog
                      onDelete={() => {
                        handleDeleteMangaSeason(item.id);
                      }}
                      loading={mangaSeasonLoading}
                      description="This action cannot be undone!Deleting this will also delete all the season data! eg(Chapters)!"
                    />
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {mangaSeasons.map((item) => (
            <TabsContent
              key={item.id}
              value={item.id}
              className="min-h-[500px]"
            >
              <TabContents mangaSeasonId={item.id} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
