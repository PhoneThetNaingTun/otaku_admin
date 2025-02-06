import { BaseOption } from "./option";

export type Chapter = {
  id: string;
  chapter: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface chapterSlice {
  chapters: Chapter[];
  chapterLoading: boolean;
  getChapterLoading: boolean;
}

export interface getChapterPayload extends BaseOption {
  id: string;
}
export interface NewChapterPayload extends BaseOption {
  chapter: string;
}
export interface UpdateChapterPayload extends BaseOption {
  chapter: string;
  id: string;
}
export interface DeleteChapterPayload extends BaseOption {
  id: string;
}
