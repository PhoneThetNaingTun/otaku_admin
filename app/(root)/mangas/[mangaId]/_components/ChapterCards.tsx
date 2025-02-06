import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import React from "react";
import { TrashIconDeleteDialog } from "@/components/TrashIconDeleteDialog";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Prop {
  chapter?: string;
  onDelete: () => void;
  loading: boolean;
  mangaSeasonChapterId: string;
}
export const ChapterCards = ({
  chapter,
  onDelete,
  loading,
  mangaSeasonChapterId,
}: Prop) => {
  const pathname = usePathname();
  return (
    <Card className="relative">
      <div className="absolute -top-2 -right-2">
        <TrashIconDeleteDialog
          onDelete={onDelete}
          loading={loading}
          description="This action cannot be undone!Deleting this will also delete all the season data! eg(Chapters)!"
        />
      </div>
      <Link href={`${pathname}/${mangaSeasonChapterId}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark fill="yellow" strokeWidth={1} /> {chapter && chapter}
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  );
};
