import { BaseOption } from "./option";
import { Season } from "./season";

export type MangaSeason = {
  id: string;
  seasonId: string;
  mangaId: string;
  createdAt: Date;
  updatedAt: Date;
  season: Season;
};

export interface mangaSeasonSlice {
  mangaSeasons: MangaSeason[];
  mangaSeasonLoading: boolean;
  getMangaSeasonLoading: boolean;
}

export interface getMangaSeasonPayload extends BaseOption {
  mangaId: string;
}

export interface newMangaSeasonPayload extends BaseOption {
  mangaId: string;
  seasonId: string;
}

export interface DeleteMangaSeasonPayload extends BaseOption {
  id: string;
}
