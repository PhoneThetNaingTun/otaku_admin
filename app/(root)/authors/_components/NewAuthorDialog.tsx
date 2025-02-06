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
import { CreateAuthor } from "@/store/Slices/AuthorSlice";
import { CreateCategory } from "@/store/Slices/CategorySlice";
import { NewAuthorPayload } from "@/types/author";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const NewAuthorDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newAuthor, setNewAuthor] = useState<NewAuthorPayload>({
    author_name: "",
  });
  const { authorLoading } = useAppSelector((state) => state.Author);
  const handleAuthorCreate = () => {
    if (!newAuthor.author_name) {
      toast({ title: "Category name is required", variant: "destructive" });
      return;
    }
    dispatch(
      CreateAuthor({
        ...newAuthor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewAuthor({ author_name: "" });
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
        <Button className="bg-red-500">Create New Author</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Author</DialogTitle>
        </DialogHeader>
        <Label>Author Name </Label>
        <Input
          placeholder="eg. Fuji"
          disabled={authorLoading}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, author_name: e.target.value })
          }
        />
        <Button className="bg-red-500" onClick={handleAuthorCreate}>
          {authorLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
