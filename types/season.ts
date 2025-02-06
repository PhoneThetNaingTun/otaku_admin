import { BaseOption } from "./option";

export type Season = {
  id: string;
  season: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface seasonSlice {
  seasons: Season[];
  seasonLoading: boolean;
  getSeasonLoading: boolean;
}
export interface GetSeasonPayload extends BaseOption {
  id: string;
}

export interface NewSeasonPayload extends BaseOption {
  season: string;
}
export interface UpdateSeasonPayload extends BaseOption {
  season: string;
  id: string;
}
export interface DeleteSeasonPayload extends GetSeasonPayload {}
