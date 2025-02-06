import {
  Category,
  categorySlice,
  DeleteCategoryPayload,
  GetCategory,
  NewCategoryPayload,
  UpdateCategoryPayload,
} from "@/types/catrgory";
import { BaseOption } from "@/types/option";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: categorySlice = {
  categories: [],
  categoryLoading: false,
  getCategoryLoading: false,
};

export const getCategory = createAsyncThunk(
  "CategorySlice/getCategory",
  async (payload: GetCategory, thunkapi) => {
    thunkapi.dispatch(setGetCategoryLoading(true));
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/category/get-category?id=${payload.id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, category } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setCategory(category));
      } else {
        onError && onError(error);
      }
      thunkapi.dispatch(setGetCategoryLoading(false));
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Something went wrong";
      thunkapi.dispatch(setGetCategoryLoading(false));
    }
  }
);

export const getCategories = createAsyncThunk(
  "CategorySlice/getCategories",
  async (payload: BaseOption, thunkapi) => {
    thunkapi.dispatch(setGetCategoryLoading(true));
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/category/get-categories`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, categories } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setCategories(categories));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetCategoryLoading(false));
    }
  }
);

export const CreateCategory = createAsyncThunk(
  "CategorySlice/CreateCategory",
  async (payload: NewCategoryPayload, thunkapi) => {
    thunkapi.dispatch(setCategoryLoading(true));
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/category/create-category`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, newCategory } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addCategory(newCategory));
      } else {
        onError && onError(error);
      }
      thunkapi.dispatch(setCategoryLoading(false));
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Something went wrong";
      onError && onError(errorMessage);
      thunkapi.dispatch(setCategoryLoading(false));
    }
  }
);

export const UpdateCategory = createAsyncThunk(
  "CaegorySlice/UpdateCategory",
  async (payload: UpdateCategoryPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setCategoryLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/category/update-category`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { message, error, updatedCategory } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(updateCategory(updatedCategory));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setCategoryLoading(false));
    }
  }
);

export const DeleteCategory = createAsyncThunk(
  "CategorySlice/DeleteCategory",
  async (payload: DeleteCategoryPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setCategoryLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/category/delete-category`,
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
        thunkapi.dispatch(deleteCategory(payload.id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setCategoryLoading(false));
    }
  }
);

const CategorySlice = createSlice({
  name: "CategorySLice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.categoryLoading = action.payload;
    },
    setGetCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.getCategoryLoading = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

export const {
  setCategories,
  setCategoryLoading,
  addCategory,
  updateCategory,
  deleteCategory,
  setGetCategoryLoading,
  setCategory,
} = CategorySlice.actions;
export default CategorySlice.reducer;
