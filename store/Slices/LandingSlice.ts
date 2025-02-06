import { BaseOption } from "@/types/option";
import { User, landingSlice } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: landingSlice = {
  users: [],
  userLoading: false,
  totalMangas: 0,
  totalUsers: 0,
};

export const GetLandingPageData = createAsyncThunk(
  "LandingSlice/GetLandingPageData",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/users/latest-users`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { latestUsers, error, totalMangas, totalUsers } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(latestUsers);
        thunkapi.dispatch(setUsers(latestUsers));
        thunkapi.dispatch(setTotalMangas(totalMangas));
        thunkapi.dispatch(setTotalUsers(totalUsers));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      throw new Error("Error fetching data from server");
    }
  }
);

const LandingSlice = createSlice({
  name: "LandingSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setTotalMangas: (state, action: PayloadAction<number>) => {
      state.totalMangas = action.payload;
    },
    setTotalUsers: (state, action: PayloadAction<number>) => {
      state.totalUsers = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setUsers, setUserLoading, setTotalMangas, setTotalUsers } =
  LandingSlice.actions;
export default LandingSlice.reducer;
