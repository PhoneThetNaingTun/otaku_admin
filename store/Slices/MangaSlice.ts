import {
  DeleteMangaPayload,
  getManga,
  Manga,
  mangaSlice,
  NewMangaPayload,
  UpdateMangaPayload,
} from "@/types/manga";
import { BaseOption } from "@/types/option";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMangaCategory, setMangaCategories } from "./MangaCategorySlice";
import { addAuthor, setAuthors } from "./AuthorSlice";
import { setCategories } from "./CategorySlice";

const initialState: mangaSlice = {
  mangas: [],
  getMangaLoading: false,
  mangaLoading: false,
};

// get Mangas

export const GetMangas = createAsyncThunk(
  "MangaSlice/getMangas",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetMangaLoading(true));
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/manga/get-mangas",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, mangas, mangaCategories } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);

        thunkapi.dispatch(setMangas(mangas));
        thunkapi.dispatch(setMangaCategories(mangaCategories));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
      console.log(error);
    } finally {
      thunkapi.dispatch(setGetMangaLoading(false));
    }
  }
);

// get Manga
export const GetManga = createAsyncThunk(
  "MangaSlice/getManga",
  async (payload: getManga, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setGetMangaLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga/get-manga?id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { error, manga, mangaCategories } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});

        thunkapi.dispatch(addManga(manga));
        thunkapi.dispatch(setMangaCategories(mangaCategories));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
      console.log(error);
    } finally {
      thunkapi.dispatch(setGetMangaLoading(false));
    }
  }
);
// create Manga
export const CreateManga = createAsyncThunk(
  "MangaSlice/createManga",
  async (payload: NewMangaPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga/create-manga`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error, newManga, mangaCategories } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        mangaCategories.map((mangaCategory: any) =>
          thunkapi.dispatch(addMangaCategory(mangaCategory))
        );
        thunkapi.dispatch(addManga(newManga));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
      console.log(error);
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

// update Manga
export const UpdateManga = createAsyncThunk(
  "MangaSlice/updateManga",
  async (payload: UpdateMangaPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga/update-manga`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error, updatedManga } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(editManga(updatedManga));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
      console.log(error);
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

// delete Manga
export const DeleteManga = createAsyncThunk(
  "MangaSlice/deleteManga",
  async (payload: DeleteMangaPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/manga/delete-manga`,
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
        thunkapi.dispatch(removeManga(id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
      console.log(error);
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);
const MangaSlice = createSlice({
  name: "MangaSlice",
  initialState,
  reducers: {
    setMangas: (state, action: PayloadAction<Manga[]>) => {
      state.mangas = action.payload;
    },
    addManga: (state, action: PayloadAction<Manga>) => {
      state.mangas.push(action.payload);
    },
    editManga: (state, action: PayloadAction<Manga>) => {
      state.mangas = state.mangas.map((manga) =>
        manga.id === action.payload.id ? action.payload : manga
      );
    },
    removeManga: (state, action: PayloadAction<string>) => {
      state.mangas = state.mangas.filter(
        (manga) => manga.id !== action.payload
      );
    },
    setMangaLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaLoading = action.payload;
    },
    setGetMangaLoading: (state, action: PayloadAction<boolean>) => {
      state.getMangaLoading = action.payload;
    },
  },
});

export const {
  setMangaLoading,
  setMangas,
  setGetMangaLoading,
  addManga,
  editManga,
  removeManga,
} = MangaSlice.actions;

export default MangaSlice.reducer;
