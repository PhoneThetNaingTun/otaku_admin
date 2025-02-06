import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Prop {
  title: string;
  icon: LucideIcon;
  number: number;
}

export const DetailCard = ({ title, icon: Icon, number }: Prop) => {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-8 h-8" />}
          <div>
            <p className="text-lg font-semibold text-red-500"> {title}</p>
          </div>
        </div>
        <p className="text-lg font-semibold mt-1 text-start ">
          Total : {number}
        </p>
      </CardContent>
    </Card>
  );
};
