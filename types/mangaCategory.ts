import { Category } from "./catrgory";

export type MangaCategory = {
  id: string;
  mangaId: string;
  categoryId: string;
  category: Category[];
};

export interface mangaCategorySlice {
  mangaCategories: MangaCategory[];
  mangaCategoryLoading: boolean;
}
