import { MangaCategory, mangaCategorySlice } from "@/types/mangaCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: mangaCategorySlice = {
  mangaCategories: [],
  mangaCategoryLoading: false,
};

const MangaCategorySlice = createSlice({
  name: "MangaCategorySlice",
  initialState,
  reducers: {
    setMangaCategories: (state, action: PayloadAction<MangaCategory[]>) => {
      state.mangaCategories = action.payload;
    },
    addMangaCategory: (state, action: PayloadAction<MangaCategory>) => {
      state.mangaCategories = [...state.mangaCategories, action.payload];
    },
  },
});

export const { setMangaCategories, addMangaCategory } =
  MangaCategorySlice.actions;
export default MangaCategorySlice.reducer;
