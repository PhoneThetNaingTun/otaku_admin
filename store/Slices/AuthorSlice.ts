import {
  Author,
  authorSlice,
  DeleteAuthorPayload,
  GetAuthorPayload,
  NewAuthorPayload,
  UpdateAuthorPayload,
} from "@/types/author";
import { BaseOption } from "@/types/option";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: authorSlice = {
  authorLoading: false,
  authors: [],
  getAuthorLoading: false,
};

// Get All Author

export const getAuthors = createAsyncThunk(
  "AuthorSlice/getAuthors",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetAuthorLoading(true));
    try {
      const ressponse = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/author/get-authors`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await ressponse.json();
      const { authors, error, message } = dataFromServer;

      if (ressponse.ok) {
        thunkapi.dispatch(setAuthors(authors));
        onSuccess && onSuccess(message);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetAuthorLoading(false));
    }
  }
);
// Get Author
export const getAuthor = createAsyncThunk(
  "AuthorSlice/getAuthor",
  async (payload: GetAuthorPayload, thunkapi) => {
    const { id, onSuccess, onError } = payload;
    thunkapi.dispatch(setAuthorLoading(true));
    try {
      const ressponse = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/author/get-author?id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await ressponse.json();
      const { author, error, message } = dataFromServer;
      if (ressponse.ok) {
        thunkapi.dispatch(addAuthor(author));
        onSuccess && onSuccess(message);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setAuthorLoading(false));
    }
  }
);

// create author

export const CreateAuthor = createAsyncThunk(
  "AuthorSlice/createAuthor",
  async (payload: NewAuthorPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setAuthorLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/author/create-author`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { newAuthor, error, message } = dataFromServer;
      if (response.ok) {
        thunkapi.dispatch(addAuthor(newAuthor));
        onSuccess && onSuccess(message);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setAuthorLoading(false));
    }
  }
);

// update author

export const UpdateAuthor = createAsyncThunk(
  "AuthorSlice/updateAuthor",
  async (payload: UpdateAuthorPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setAuthorLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/author/update-author`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { updatedAuthor, error, message } = dataFromServer;
      if (response.ok) {
        thunkapi.dispatch(editAuthor(updatedAuthor));
        onSuccess && onSuccess(message);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setAuthorLoading(false));
    }
  }
);

// delete author
export const DeleteAuthor = createAsyncThunk(
  "AuthorSlice/deleteAuthor",
  async (payload: DeleteAuthorPayload, thunkapi) => {
    const { id, onSuccess, onError } = payload;
    thunkapi.dispatch(setAuthorLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/author/delete-author`,
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
        thunkapi.dispatch(deleteAuthor(id));
        onSuccess && onSuccess(message);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setAuthorLoading(false));
    }
  }
);

const AuthorSlice = createSlice({
  name: "AuthroSlice",
  initialState,
  reducers: {
    setAuthors: (state, action: PayloadAction<Author[]>) => {
      state.authors = action.payload;
    },
    setAuthorLoading: (state, action: PayloadAction<boolean>) => {
      state.authorLoading = action.payload;
    },
    setGetAuthorLoading: (state, action: PayloadAction<boolean>) => {
      state.getAuthorLoading = action.payload;
    },
    addAuthor: (state, action: PayloadAction<Author>) => {
      state.authors.push(action.payload);
    },
    editAuthor: (state, action: PayloadAction<Author>) => {
      state.authors = state.authors.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
    },
    deleteAuthor: (state, action: PayloadAction<string>) => {
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload
      );
    },
  },
});

export const {
  setAuthors,
  setAuthorLoading,
  setGetAuthorLoading,
  addAuthor,
  editAuthor,
  deleteAuthor,
} = AuthorSlice.actions;
export default AuthorSlice.reducer;
