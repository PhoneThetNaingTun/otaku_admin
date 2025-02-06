import { BaseOption } from "./option";

export type Page = {
  id: string;
  imgUrl: string;
  mangaSeasonChapterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface pageSlice {
  pages: Page[];
  getPageLoading: boolean;
  pageLoading: boolean;
}

export interface getPagePayload extends BaseOption {
  mangaSeasonChapterId: string;
}

export interface NewPagePayload extends BaseOption {
  imgUrl: string;
  mangaSeasonChapterId: string;
}

export interface DeletePagePayload extends BaseOption {
  id: string;
}
