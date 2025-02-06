"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { NewMangaPayload } from "@/types/manga";
import { useToast } from "@/hooks/use-toast";
import { CreateManga } from "@/store/Slices/MangaSlice";
import { RefreshCcw } from "lucide-react";
import { getAuthors } from "@/store/Slices/AuthorSlice";
import { getCategories } from "@/store/Slices/CategorySlice";
import { Textarea } from "@/components/ui/textarea";

export const NewMangaDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { categories } = useAppSelector((state) => state.Category);
  const { authors } = useAppSelector((state) => state.Author);
  const { mangaLoading } = useAppSelector((state) => state.Manga);
  const [open, setOpen] = useState(false);
  const [newManga, setNewManga] = useState<NewMangaPayload>({
    manga_name: "",
    manga_image: "",
    manga_description: "",
    categoryIds: [],
    authorId: "",
  });

  const categorySelect = categories.map((item) => {
    const value = item.id;
    const label = item.category_name;
    return {
      value,
      label,
    };
  });

  const handleCreateManga = () => {
    if (
      !newManga.manga_name ||
      !newManga.manga_image ||
      !newManga.manga_description ||
      !newManga.categoryIds ||
      !newManga.authorId
    ) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      CreateManga({
        ...newManga,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setOpen(false);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getAuthors({}));
    dispatch(getCategories({}));
  }, []);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500">Add New Manga</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle>New Manga</DialogTitle>
          <DialogDescription>Add new manga here</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="MangaName">Manga Name</Label>
                <Input
                  id="MangaName"
                  placeholder="eg. Naruto"
                  onChange={(e) =>
                    setNewManga({ ...newManga, manga_name: e.target.value })
                  }
                  disabled={mangaLoading}
                />
              </div>
              <div>
                <Label>Author</Label>
                <Select
                  disabled={mangaLoading}
                  onValueChange={(value: string) =>
                    setNewManga({ ...newManga, authorId: value })
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
                    setNewManga({ ...newManga, categoryIds: e });
                  }}
                  placeholder="Select Categories"
                  animation={2}
                  disabled={mangaLoading}
                />
              </div>
            </div>

            <div>
              <Label>Image</Label>
              {newManga.manga_image ? (
                <Image
                  src={newManga.manga_image}
                  alt="image"
                  className="w-full h-40 object-cover"
                  width={1000}
                  height={1000}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
              <CldUploadWidget
                uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
                options={{ folder: "manga-images" }}
                onSuccess={(result) => {
                  //@ts-expect-error
                  const secureUrl = result?.info?.secure_url;
                  if (secureUrl) {
                    setNewManga((prev) => ({
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
                      className="w-full"
                      disabled={mangaLoading}
                    >
                      Upload an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor="MangaDescription">Manga Description</Label>
            <Textarea
              id="MangaDescription"
              placeholder="eg. Yesss"
              onChange={(e) =>
                setNewManga({ ...newManga, manga_description: e.target.value })
              }
              disabled={mangaLoading}
              className="max-h-52"
            />
          </div>
        </div>

        <Button
          className="bg-red-500 w-full"
          disabled={mangaLoading}
          onClick={handleCreateManga}
        >
          {mangaLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Add New Manga"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
