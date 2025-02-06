import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RefreshCcw, Trash } from "lucide-react";
import React from "react";

interface Prop {
  onDelete: () => void;
  loading: boolean;
}
export const MangaSeasonChapterDeleteDialog = ({ onDelete, loading }: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 w-4 h-4 p-3 rounded-md flex items-center justify-center">
          <Trash size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delte this?</DialogTitle>
          <DialogDescription>
            This action cannot be undone! This will aslo delet associated data
            with this Chapter? (eg All Pages)
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <Button className="bg-red-500" onClick={onDelete} disabled={loading}>
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
