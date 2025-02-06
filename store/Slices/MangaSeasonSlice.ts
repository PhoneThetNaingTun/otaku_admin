import {
  DeleteMangaSeasonPayload,
  getMangaSeasonPayload,
  MangaSeason,
  mangaSeasonSlice,
  newMangaSeasonPayload,
} from "@/types/mangaSeason";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setGetMangaLoading } from "./MangaSlice";

const initialState: mangaSeasonSlice = {
  mangaSeasons: [],
  mangaSeasonLoading: false,
  getMangaSeasonLoading: false,
};

// get Manga season by manga id
export const getMangaSeasonByManga = createAsyncThunk(
  "MangaSeasonSlice/getmangaSeasonByManga",
  async (payload: getMangaSeasonPayload, thunkapi) => {
    const { onError, onSuccess, mangaId } = payload;
    thunkapi.dispatch(setGetMangaLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season/get-manga-seasons?mangaId=${mangaId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { mangaSeasons, message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setMangaSeasons(mangaSeasons));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetMangaLoading(false));
    }
  }
);

// create manga season
export const CreateMangaSeason = createAsyncThunk(
  "MangaSeasonSlice/CreateMangaSeason",
  async (payload: newMangaSeasonPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setMangaSeasonLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season/create-manga-season`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error, newMangaSeason } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addMangaSeason(newMangaSeason));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setMangaSeasonLoading(false));
    }
  }
);

// delete manga season
export const DeleteMangaSeason = createAsyncThunk(
  "MangaSeasonSlice/DeleteMangaSeason",
  async (payload: DeleteMangaSeasonPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setMangaSeasonLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga-season/delete-manga-season`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(deleteMangaSeasons(id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setMangaSeasonLoading(false));
    }
  }
);

const MangaSeasonSlice = createSlice({
  name: "MangaSeasonSlice",
  initialState,
  reducers: {
    setMangaSeasons: (state, action: PayloadAction<MangaSeason[]>) => {
      state.mangaSeasons = action.payload;
    },
    deleteMangaSeasons: (state, action: PayloadAction<string>) => {
      state.mangaSeasons = state.mangaSeasons.filter(
        (mangaSeason) => mangaSeason.id !== action.payload
      );
    },
    addMangaSeason: (state, action: PayloadAction<MangaSeason>) => {
      state.mangaSeasons.push(action.payload);
    },
    setMangaSeasonLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaSeasonLoading = action.payload;
    },
    setGetMangaSeasonLoading: (state, action: PayloadAction<boolean>) => {
      state.getMangaSeasonLoading = action.payload;
    },
  },
});

export const {
  setMangaSeasons,
  deleteMangaSeasons,
  addMangaSeason,
  setMangaSeasonLoading,
  setGetMangaSeasonLoading,
} = MangaSeasonSlice.actions;
export default MangaSeasonSlice.reducer;
