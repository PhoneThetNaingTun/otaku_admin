import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

interface Prop {
  onDelete: () => void;
  loading: boolean;
}
export const DeleteButtonDialog = ({ onDelete, loading }: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 ">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this category?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your data
            and associated data.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <Button className="bg-red-500" disabled={loading} onClick={onDelete}>
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
