import { BaseOption } from "@/types/option";
import {
  DeletePagePayload,
  getPagePayload,
  NewPagePayload,
  Page,
  pageSlice,
} from "@/types/page";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState: pageSlice = {
  pages: [],
  getPageLoading: false,
  pageLoading: false,
};

// get pages

export const GetPages = createAsyncThunk(
  "PageSlice/GetPages",
  async (payload: getPagePayload, thunkapi) => {
    const { onSuccess, onError, mangaSeasonChapterId } = payload;
    thunkapi.dispatch(setGetPageLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/page/get-pages?mangaSeasonChapterId=${mangaSeasonChapterId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { error, pages } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setPages(pages));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setGetPageLoading(false));
    }
  }
);

// add page

export const CreatePage = createAsyncThunk(
  "PageSlice/CreatePage",
  async (payload: NewPagePayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setPageLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/page/create-page`,
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
      const { error, newPage, message } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addPage(newPage));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setPageLoading(false));
    }
  }
);

// delete page
export const DeletePage = createAsyncThunk(
  "PageSlice/DeletePage",
  async (payload: DeletePagePayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setPageLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/page/delete-page`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { error, message } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(removePage(id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thunkapi.dispatch(setPageLoading(false));
    }
  }
);

const PageSlice = createSlice({
  name: "PageSlice",
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload;
    },
    setGetPageLoading: (state, action: PayloadAction<boolean>) => {
      state.getPageLoading = action.payload;
    },
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
    addPage: (state, action: PayloadAction<Page>) => {
      state.pages.push(action.payload);
    },
    removePage: (state, action: PayloadAction<string>) => {
      state.pages = state.pages.filter((page) => page.id !== action.payload);
    },
  },
});

export const {
  setPages,
  setGetPageLoading,
  setPageLoading,
  addPage,
  removePage,
} = PageSlice.actions;
export default PageSlice.reducer;
