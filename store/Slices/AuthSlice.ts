"use client";
import { LoginPayload } from "@/types/auth";
import { BaseOption } from "@/types/option";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Admin = {
  name: String;
  email: String;
};

interface authSlice {
  admin: Admin;
  loginLoading: boolean;
  getAdminDataLoading: boolean;
}

const initialState: authSlice = {
  admin: {
    name: "",
    email: "",
  },
  loginLoading: false,
  getAdminDataLoading: false,
};

export const Login = createAsyncThunk(
  "AuthSlice/Login",
  async (payload: LoginPayload, thunkapi) => {
    thunkapi.dispatch(setLoginLoading(true));
    const { onSuccess, onError } = payload;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/admin/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const dataFromServer = await response.json();
      const { message, error, admin } = dataFromServer;

      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setAdmin(admin));
      } else {
        onError && onError(error);
      }
    } catch (error: any) {
      console.error(error);

      const errorMessage = error.message || "Something went wrong";
      onError && onError(errorMessage);
    } finally {
      thunkapi.dispatch(setLoginLoading(false));
    }
  }
);

export const getAdminData = createAsyncThunk(
  "AuthSlice/getAdminData",
  async (payload: BaseOption, thunkapi) => {
    thunkapi.dispatch(setAdminLoading(true));
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/getAdmin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { admin, error } = dataFromServer;
      if (response.status == 401) {
        onError && onError(error);
        return;
      }

      if (response.ok) {
        onSuccess && onSuccess(admin);
        thunkapi.dispatch(setAdmin(admin));
      }
    } catch (error) {
      console.log(error);
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setAdminLoading(false));
    }
  }
);

const AuthSLice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loginLoading = action.payload;
    },
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.getAdminDataLoading = action.payload;
    },
  },
});

export const { setAdmin, setLoginLoading, setAdminLoading } = AuthSLice.actions;
export default AuthSLice.reducer;
