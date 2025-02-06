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
  description: string;
}
export const TrashIconDeleteDialog = ({
  onDelete,
  loading,
  description,
}: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 w-4 h-4 p-3 rounded-md flex items-center justify-center">
          <Trash size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
