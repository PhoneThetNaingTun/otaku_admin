"use client";
import { DeleteButtonDialog } from "@/components/DeleteButtonDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateButton } from "@/components/UpdateButton";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DeleteChapter,
  GetChapter,
  UpdateChapter,
} from "@/store/Slices/ChapterSlice";
import { UpdateChapterPayload } from "@/types/chapter";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ChapterDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { chapterId } = param;
  const { toast } = useToast();
  const { chapters, chapterLoading } = useAppSelector((state) => state.Chapter);

  const [updateChapter, setUpdateChapter] = useState<UpdateChapterPayload>({
    chapter: "",
    id: "",
  });

  const chapter = chapters.find((category) => category.id === chapterId);

  useEffect(() => {
    if (chapter) {
      setUpdateChapter({
        chapter: chapter.chapter,
        id: chapter.id,
      });
    }
  }, [chapter]);
  useEffect(() => {
    dispatch(GetChapter({ id: chapterId as string }));
  }, [dispatch, chapterId]);

  const handleUpdateChapter = () => {
    if (!updateChapter.chapter || !updateChapter.id) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      UpdateChapter({
        ...updateChapter,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/chapters");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteChapter = () => {
    dispatch(
      DeleteChapter({
        id: chapterId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/chapters");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle> Update Chapter</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            defaultValue={updateChapter.chapter}
            onChange={(e) =>
              setUpdateChapter({
                ...updateChapter,
                chapter: e.target.value,
              })
            }
          />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between mt-5 w-full">
            <UpdateButton
              onClick={handleUpdateChapter}
              loading={chapterLoading}
            />
            <DeleteButtonDialog
              onDelete={handleDeleteChapter}
              loading={chapterLoading}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
