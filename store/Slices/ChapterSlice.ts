import {
  Chapter,
  chapterSlice,
  DeleteChapterPayload,
  getChapterPayload,
  NewChapterPayload,
  UpdateChapterPayload,
} from "@/types/chapter";
import { BaseOption } from "@/types/option";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chapterSlice = {
  chapters: [],
  chapterLoading: false,
  getChapterLoading: false,
};

// get all chapters
export const GetChapters = createAsyncThunk(
  "ChapterSlice/GetChapters",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/chapter/get-chapters`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { chapters, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setChapters(chapters));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetChapterLoading(false));
    }
  }
);

export const GetChapter = createAsyncThunk(
  "ChapterSice/GetChapter",
  async (payload: getChapterPayload, thunkapi) => {
    const { id, onSuccess, onError } = payload;
    thunkapi.dispatch(setGetChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/chapter/get-chapter?id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { chapter, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(addChapter(chapter));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetChapterLoading(false));
    }
  }
);

export const CreateChapter = createAsyncThunk(
  "ChapterSlice/CreateChapter",
  async (payload: NewChapterPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/chapter/create-chapter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { newChapter, error, message } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addChapter(newChapter));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setChapterLoading(false));
    }
  }
);

export const UpdateChapter = createAsyncThunk(
  "ChapterSlice/UpdateChapter",
  async (payload: UpdateChapterPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/chapter/update-chapter`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { updatedChapter, error, message } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(editChapter(updatedChapter));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setChapterLoading(false));
    }
  }
);

export const DeleteChapter = createAsyncThunk(
  "ChapterSlice/DeleteChapter",
  async (payload: DeleteChapterPayload, thunkapi) => {
    const { id, onSuccess, onError } = payload;
    thunkapi.dispatch(setChapterLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/chapter/delete-chapter`,
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
        thunkapi.dispatch(removeChapter(id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setChapterLoading(false));
    }
  }
);
const ChapterSlice = createSlice({
  name: "ChapterSlice",
  initialState,
  reducers: {
    setChapters: (state, action: PayloadAction<Chapter[]>) => {
      state.chapters = action.payload;
    },
    setChapterLoading: (state, action: PayloadAction<boolean>) => {
      state.chapterLoading = action.payload;
    },
    setGetChapterLoading: (state, action: PayloadAction<boolean>) => {
      state.getChapterLoading = action.payload;
    },
    addChapter: (state, action: PayloadAction<Chapter>) => {
      state.chapters.push(action.payload);
    },
    editChapter: (state, action: PayloadAction<Chapter>) => {
      state.chapters = state.chapters.map((chapter) =>
        chapter.id === action.payload.id ? action.payload : chapter
      );
    },
    removeChapter: (state, action: PayloadAction<string>) => {
      state.chapters = state.chapters.filter(
        (chapter) => chapter.id !== action.payload
      );
    },
  },
});

export const {
  setChapters,
  setChapterLoading,
  setGetChapterLoading,
  addChapter,
  editChapter,
  removeChapter,
} = ChapterSlice.actions;
export default ChapterSlice.reducer;
