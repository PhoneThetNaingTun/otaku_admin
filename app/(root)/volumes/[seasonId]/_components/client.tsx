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
  DeleteSeason,
  getSeason,
  UpdateSeason,
} from "@/store/Slices/SeasonSlice";
import { UpdateSeasonPayload } from "@/types/season";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const SeasonDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { seasonId } = param;
  const { toast } = useToast();
  const { seasons, seasonLoading } = useAppSelector((state) => state.Season);

  const [updateSeason, setUpdateSeason] = useState<UpdateSeasonPayload>({
    season: "",
    id: "",
  });

  const season = seasons.find((season) => season.id === seasonId);

  useEffect(() => {
    dispatch(getSeason({ id: seasonId as string }));
    if (season) {
      setUpdateSeason({
        season: season.season,
        id: season.id,
      });
    }
  }, [dispatch, seasonId, season]);

  const handleUpdateSeason = () => {
    if (!season?.season || !season.id) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      UpdateSeason({
        ...updateSeason,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/volumes");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteSeason = () => {
    dispatch(
      DeleteSeason({
        id: seasonId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/volumes");
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
          <CardTitle> Update Season</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            defaultValue={updateSeason.season}
            onChange={(e) =>
              setUpdateSeason({
                ...updateSeason,
                season: e.target.value,
              })
            }
          />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between mt-5 w-full">
            <UpdateButton
              onClick={handleUpdateSeason}
              loading={seasonLoading}
            />
            <DeleteButtonDialog
              onDelete={handleDeleteSeason}
              loading={seasonLoading}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
