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
import { CreateCategory } from "@/store/Slices/CategorySlice";
import { NewCategoryPayload } from "@/types/catrgory";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const NewCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newCategory, setNewCategory] = useState<NewCategoryPayload>({
    category_name: "",
  });
  const { categoryLoading } = useAppSelector((state) => state.Category);
  const handleCategoryCreate = () => {
    if (!newCategory.category_name) {
      toast({ title: "Category name is required", variant: "destructive" });
      return;
    }
    dispatch(
      CreateCategory({
        ...newCategory,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewCategory({ category_name: "" });
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
        <Button className="bg-red-500">Create New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <Label>Category </Label>
        <Input
          placeholder="eg. Action"
          disabled={categoryLoading}
          onChange={(e) =>
            setNewCategory({ ...newCategory, category_name: e.target.value })
          }
        />
        <Button className="bg-red-500" onClick={handleCategoryCreate}>
          {categoryLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
