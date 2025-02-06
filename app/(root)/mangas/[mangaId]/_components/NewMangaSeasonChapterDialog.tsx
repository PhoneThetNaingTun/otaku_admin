import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateCategory } from "@/store/Slices/CategorySlice";
import { CreateMangaSeasonChapter } from "@/store/Slices/MangaSeasonChapterSlice";
import { CreateMangaSeason } from "@/store/Slices/MangaSeasonSlice";
import { NewCategoryPayload } from "@/types/catrgory";
import { Chapter } from "@/types/chapter";
import { newMangaSeasonPayload } from "@/types/mangaSeason";
import { NewMangaSeasonChapterPayload } from "@/types/mangaSeasonChapter";
import { Bookmark, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

interface Prop {
  mangaSeasonId: string;
  loading: boolean;
  chapters: Chapter[];
}

export const NewMangaSeasonChapterDialog = ({
  mangaSeasonId,
  loading,
  chapters,
}: Prop) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newMangaSeasonChapter, setNewMangaSeasonChapter] =
    useState<NewMangaSeasonChapterPayload>({
      mangaSeasonId,
      chapterId: "",
    });
  const { seasons } = useAppSelector((state) => state.Season);
  const handleMangaSeasonChapterCreate = () => {
    if (!newMangaSeasonChapter.chapterId) {
      toast({ title: "Season is required", variant: "destructive" });
      return;
    }
    dispatch(
      CreateMangaSeasonChapter({
        ...newMangaSeasonChapter,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewMangaSeasonChapter({ chapterId: "", mangaSeasonId });
          setOpen(false);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500">
          <Bookmark fill="yellow" />
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chapter</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Chapter</Label>
          <Select
            disabled={loading}
            onValueChange={(value: string) =>
              setNewMangaSeasonChapter({
                ...newMangaSeasonChapter,
                chapterId: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chapters</SelectLabel>
                {chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id}>
                    {chapter.chapter}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-red-500" onClick={handleMangaSeasonChapterCreate}>
          {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
