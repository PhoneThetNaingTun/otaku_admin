import { BaseOption } from "./option";

export type MangaSeasonChapter = {
  id: string;
  mangaSeasonId: string;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface mangaSeasonChapterSlice {
  mangaSeasonChapters: MangaSeasonChapter[];
  getMangaSeasonChaptersLoading: boolean;
  mangaSeasonChapterLoading: boolean;
}

export interface NewMangaSeasonChapterPayload extends BaseOption {
  mangaSeasonId: string;
  chapterId: string;
}

export interface DeleteMangaSeasonChapterPayload extends BaseOption {
  id: string;
}
