import { BaseOption } from "./option";

export type Author = {
  id: string;
  author_name: string;
  createdAt: Date;
  updatedAt: Date;
};
export interface authorSlice {
  authors: Author[];
  getAuthorLoading: boolean;
  authorLoading: boolean;
}

export interface GetAuthorPayload extends BaseOption {
  id: string;
}

export interface NewAuthorPayload extends BaseOption {
  author_name: string;
}

export interface UpdateAuthorPayload extends BaseOption {
  id: string;
  author_name: string;
}

export interface DeleteAuthorPayload extends BaseOption {
  id: string;
}
