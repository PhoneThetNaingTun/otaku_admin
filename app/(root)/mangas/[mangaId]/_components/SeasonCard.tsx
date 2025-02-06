import { Card, CardHeader } from "@/components/ui/card";
import { BookImageIcon } from "lucide-react";
import React from "react";

interface Prop {
  season: string;
}

export const SeasonCard = ({ season }: Prop) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 ">
        <BookImageIcon />
        <span className="text-lg  p-0 font-bold">{season}</span>
      </CardHeader>
    </Card>
  );
};
