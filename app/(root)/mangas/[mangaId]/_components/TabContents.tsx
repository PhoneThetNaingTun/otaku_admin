import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import React from "react";
import { NewMangaSeasonChapterDialog } from "./NewMangaSeasonChapterDialog";
import { ChapterCards } from "./ChapterCards";
import { DeleteMangaSeasonChapter } from "@/store/Slices/MangaSeasonChapterSlice";
import { useToast } from "@/hooks/use-toast";

interface Prop {
  mangaSeasonId: string;
}

export const TabContents = ({ mangaSeasonId }: Prop) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { mangaSeasonChapters, mangaSeasonChapterLoading } = useAppSelector(
    (state) => state.MangaSeasonChapter
  );
  const { chapters } = useAppSelector((state) => state.Chapter);
  const MangaSeasonChapter = mangaSeasonChapters.filter(
    (item) => item.mangaSeasonId === mangaSeasonId
  );
  const chapterCards = MangaSeasonChapter.map((item) => {
    const chapter = chapters.find((chapter) => chapter.id === item.chapterId);
    return {
      id: item.id,
      mangaSeasonId: item.mangaSeasonId,
      chapter: chapter?.chapter,
    };
  });
  const handleDeleteMangaSeasonchapter = (id: string) => {
    dispatch(
      DeleteMangaSeasonChapter({
        id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div>
      <div>
        <NewMangaSeasonChapterDialog
          mangaSeasonId={mangaSeasonId}
          loading={mangaSeasonChapterLoading}
          chapters={chapters}
        />
      </div>
      <div className="mt-4">
        {chapterCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {chapterCards.map((chapterCard) => (
              <ChapterCards
                key={chapterCard?.id}
                chapter={chapterCard?.chapter}
                onDelete={() => {
                  handleDeleteMangaSeasonchapter(chapterCard.id);
                }}
                loading={mangaSeasonChapterLoading}
                mangaSeasonChapterId={chapterCard.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="font-semibold text-xl">No Chapters</p>
          </div>
        )}
      </div>
    </div>
  );
};
