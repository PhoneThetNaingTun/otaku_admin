import { Author } from "./author";
import { Category } from "./catrgory";
import { BaseOption } from "./option";

export type Manga = {
  id: string;
  manga_name: string;
  manga_image: string;
  manga_description: string;
  authorId: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
};

export interface mangaSlice {
  mangas: Manga[];
  getMangaLoading: boolean;
  mangaLoading: boolean;
}
export interface getManga extends BaseOption {
  id: string;
}

export interface NewMangaPayload extends BaseOption {
  manga_name: string;
  manga_image: string;
  manga_description: string;
  categoryIds: string[];
  authorId: string;
}

export interface UpdateMangaPayload extends BaseOption {
  id: string;
  manga_name: string;
  manga_image: string;
  manga_description: string;
  categoryIds: string[];
  authorId: string;
}
export interface DeleteMangaPayload extends getManga {}
