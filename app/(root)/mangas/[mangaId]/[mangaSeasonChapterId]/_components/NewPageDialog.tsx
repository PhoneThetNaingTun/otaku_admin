import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreatePage } from "@/store/Slices/PageSlice";
import { NewPagePayload } from "@/types/page";
import { ImagePlusIcon, RefreshCcw } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

interface Prop {
  mangaSeasonChapterId: string;
}

export const NewPageDialog = ({ mangaSeasonChapterId }: Prop) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newPage, setNewPage] = useState<NewPagePayload>({
    imgUrl: "",
    mangaSeasonChapterId,
  });
  const { pageLoading } = useAppSelector((state) => state.Page);
  const handleCreatePage = () => {
    if (!newPage.imgUrl) {
      toast({ title: "Image url is required", variant: "destructive" });
      return;
    }
    dispatch(
      CreatePage({
        ...newPage,
        onSuccess: (message) => {
          toast({ title: message });
          setNewPage({
            imgUrl: "",
            mangaSeasonChapterId,
          });
          setDialogOpen(false);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal={false}>
      <DialogTrigger asChild>
        <Button className="bg-red-500">Create New Page</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>New Page</DialogTitle>
        </DialogHeader>
        <Label>ImgURl </Label>
        {newPage.imgUrl ? (
          <Image
            src={newPage.imgUrl || "/images/no-image.png"}
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
          options={{ folder: "page", maxFiles: 1 }}
          onSuccess={(result: any) => {
            const secureUrl = result?.info?.secure_url;
            if (secureUrl) {
              setNewPage((prev) => ({
                ...prev,
                imgUrl: secureUrl,
              }));
            }
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            if (!open) {
              console.error("open function is undefined");
              return null;
            }
            return (
              <Button
                variant="outline"
                onClick={() => open()}
                disabled={pageLoading}
                className="flex-1 mt-4"
              >
                <ImagePlusIcon /> Update an Image
              </Button>
            );
          }}
        </CldUploadWidget>

        <Button className="bg-red-500" onClick={handleCreatePage}>
          {pageLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
