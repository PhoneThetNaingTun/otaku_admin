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
import { createSeason } from "@/store/Slices/SeasonSlice";
import { NewCategoryPayload } from "@/types/catrgory";
import { NewSeasonPayload } from "@/types/season";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export const NewSeasonDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newSeason, setNewSeason] = useState<NewSeasonPayload>({
    season: "",
  });
  const { seasonLoading } = useAppSelector((state) => state.Season);
  const handleCreateSeason = () => {
    if (!newSeason.season) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      createSeason({
        ...newSeason,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setOpen(false);
          setNewSeason({ season: "" });
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
          <DialogTitle>New Season</DialogTitle>
        </DialogHeader>
        <Label>Season </Label>
        <Input
          placeholder="eg. season 1"
          disabled={seasonLoading}
          onChange={(e) =>
            setNewSeason({ ...newSeason, season: e.target.value })
          }
        />
        <Button className="bg-red-500" onClick={handleCreateSeason}>
          {seasonLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
