import { BaseOption } from "./option";

export type Category = {
  id: string;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface categorySlice {
  categories: Category[];
  categoryLoading: boolean;
  getCategoryLoading: boolean;
}

export interface GetCategory extends BaseOption {
  id: string;
}

export interface NewCategoryPayload extends BaseOption {
  category_name: string;
}
export interface UpdateCategoryPayload extends BaseOption {
  id: string;
  category_name: string;
}
export interface DeleteCategoryPayload extends GetCategory {}
