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
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateChapter } from "@/store/Slices/ChapterSlice";
import { NewChapterPayload } from "@/types/chapter";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const NewChapterDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newChapter, setNewChapter] = useState<NewChapterPayload>({
    chapter: "",
  });
  const { chapterLoading } = useAppSelector((state) => state.Chapter);
  const handleCreateChapter = () => {
    if (!newChapter.chapter) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      CreateChapter({
        ...newChapter,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setOpen(false);
          setNewChapter({ chapter: "" });
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
        <Button className="bg-red-500">Create New Chapter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chapter</DialogTitle>
        </DialogHeader>
        <Label>Chapter </Label>
        <Input
          placeholder="eg. Chapter 1"
          disabled={chapterLoading}
          onChange={(e) =>
            setNewChapter({ ...newChapter, chapter: e.target.value })
          }
        />
        <Button className="bg-red-500" onClick={handleCreateChapter}>
          {chapterLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
