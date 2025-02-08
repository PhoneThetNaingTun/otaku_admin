import {
  DeleteMangaSeasonChapterPayload,
  MangaSeasonChapter,
  mangaSeasonChapterSlice,
  NewMangaSeasonChapterPayload,
} from "@/types/mangaSeasonChapter";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseOption } from "@/types/option";

const initialState: mangaSeasonChapterSlice = {
  mangaSeasonChapters: [],
  mangaSeasonChapterLoading: false,
  getMangaSeasonChaptersLoading: false,
};

// get manga season chapters
export const GetMangaSeasonChapters = createAsyncThunk(
  "MangaSeasonChapterSlice/GetMangaSeasonChapters",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetMangaSeasonChaptersLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season-chapter/get-manga-season-chapters`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, mangaSeasonChapters } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setMangaSeasonChapters(mangaSeasonChapters));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setGetMangaSeasonChaptersLoading(false));
    }
  }
);

// create manga season chapter
export const CreateMangaSeasonChapter = createAsyncThunk(
  "MangaSeasonChapterSlice/CreateMangaSeasonChapter",
  async (payload: NewMangaSeasonChapterPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setMangaSeasonChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season-chapter/create-manga-season-chapter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error, newMangaSeasonChapter } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addMangaSeasonChapter(newMangaSeasonChapter));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setMangaSeasonChapterLoading(false));
    }
  }
);

// delete manga season chapter
export const DeleteMangaSeasonChapter = createAsyncThunk(
  "MangaSeasonChapterSlice/DeleteMangaSeasonChapter",
  async (payload: DeleteMangaSeasonChapterPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setMangaSeasonChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season-chapter/delete-manga-season-chapter`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(removeMangaSeasonChapter(id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setMangaSeasonChapterLoading(false));
    }
  }
);

const MangaSeasonChapterSlice = createSlice({
  name: "MangaSeasonChapterSlice",
  initialState,
  reducers: {
    setMangaSeasonChapters: (
      state,
      action: PayloadAction<MangaSeasonChapter[]>
    ) => {
      state.mangaSeasonChapters = action.payload;
    },
    addMangaSeasonChapter: (
      state,
      action: PayloadAction<MangaSeasonChapter>
    ) => {
      state.mangaSeasonChapters = [
        ...state.mangaSeasonChapters,
        action.payload,
      ];
    },
    removeMangaSeasonChapter: (state, action: PayloadAction<string>) => {
      state.mangaSeasonChapters = state.mangaSeasonChapters.filter(
        (mangaSeasonChapter) => mangaSeasonChapter.id !== action.payload
      );
    },
    setMangaSeasonChapterLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaSeasonChapterLoading = action.payload;
    },
    setGetMangaSeasonChaptersLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.getMangaSeasonChaptersLoading = action.payload;
    },
  },
});

export const {
  setMangaSeasonChapters,
  addMangaSeasonChapter,
  removeMangaSeasonChapter,
  setMangaSeasonChapterLoading,
  setGetMangaSeasonChaptersLoading,
} = MangaSeasonChapterSlice.actions;
export default MangaSeasonChapterSlice.reducer;
