import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CreateMangaSeason } from "@/store/Slices/MangaSeasonSlice";
import { newMangaSeasonPayload } from "@/types/mangaSeason";
import { Earth, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

interface Prop {
  mangaId: string;
  loading: boolean;
}

export const NewMangaSeasonDialog = ({ mangaId, loading }: Prop) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [newMangaSeason, setNewMangaSeason] = useState<newMangaSeasonPayload>({
    mangaId,
    seasonId: "",
  });
  const { seasons } = useAppSelector((state) => state.Season);
  const handleCreateangaSeason = () => {
    if (!newMangaSeason.seasonId) {
      toast({ title: "Season is required", variant: "destructive" });
      return;
    }
    dispatch(
      CreateMangaSeason({
        ...newMangaSeason,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewMangaSeason({ seasonId: "", mangaId });
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
          <Earth />
          Add Volume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Volume</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Volume</Label>
          <Select
            disabled={loading}
            onValueChange={(value: string) =>
              setNewMangaSeason({ ...newMangaSeason, seasonId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Seasons</SelectLabel>
                {seasons.map((season) => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.season}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-red-500" onClick={handleCreateangaSeason}>
          {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
