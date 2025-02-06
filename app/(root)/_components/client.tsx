"use client";
import React, { useEffect } from "react";
import { LatestUserCard } from "./latestUserCard";
import { DetailCard } from "./DetailCard";
import { BookImageIcon, MessagesSquare, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetLandingPageData } from "@/store/Slices/LandingSlice";

export const LandingPageClient = () => {
  const dispatch = useAppDispatch();
  const { users, totalMangas, totalUsers } = useAppSelector(
    (state) => state.Landing
  );
  useEffect(() => {
    dispatch(GetLandingPageData({}));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <DetailCard icon={BookImageIcon} title="Mangas" number={totalMangas} />
        <DetailCard icon={Users} title="Users" number={totalUsers} />
        <DetailCard icon={MessagesSquare} title="Messages" number={10} />
      </div>
      <LatestUserCard users={users} />
    </div>
  );
};
