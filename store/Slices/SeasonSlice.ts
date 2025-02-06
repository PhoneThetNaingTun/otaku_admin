import { BaseOption } from "@/types/option";
import {
  DeleteSeasonPayload,
  GetSeasonPayload,
  NewSeasonPayload,
  Season,
  seasonSlice,
  UpdateSeasonPayload,
} from "@/types/season";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: seasonSlice = {
  seasons: [],
  seasonLoading: false,
  getSeasonLoading: false,
};
// get all seasons
export const getSeasons = createAsyncThunk(
  "SeasonSlice/getSeasons",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetSeasonLoading(true));
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/season/get-seasons",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { seasons, message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setSeasons(seasons));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetSeasonLoading(false));
    }
  }
);

// get one season
export const getSeason = createAsyncThunk(
  "SeasonSlice/getSeason",
  async (payload: GetSeasonPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setGetSeasonLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/season/get-season?id=${payload.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const dataFromServer = await response.json();
      const { season, message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addSeason(season));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setGetSeasonLoading(false));
    }
  }
);

// crete season
export const createSeason = createAsyncThunk(
  "SeasonSlice/createSeason",
  async (payload: NewSeasonPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setSeasonLoading(true));
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/season/create-season",
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
      const { message, error, newSeason } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addSeason(newSeason));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setSeasonLoading(false));
    }
  }
);

// update season
export const UpdateSeason = createAsyncThunk(
  "SeasonSlice/updateSeason",
  async (payload: UpdateSeasonPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setSeasonLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/season/update-season`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error, updatedSeason } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(updateSeason(updatedSeason));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setSeasonLoading(false));
    }
  }
);

// delete season
export const DeleteSeason = createAsyncThunk(
  "SeasonSlice/deleteSeason",
  async (payload: DeleteSeasonPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setSeasonLoading(true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/season/delete-season`,
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
        thunkapi.dispatch(deleteSeason(payload.id));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      onError && onError(error);
    } finally {
      thunkapi.dispatch(setSeasonLoading(false));
    }
  }
);

const SeasonSlice = createSlice({
  name: "SeasonSlice",
  initialState,
  reducers: {
    setSeasons: (state, actin: PayloadAction<Season[]>) => {
      state.seasons = actin.payload;
    },
    setSeasonLoading: (state, action: PayloadAction<boolean>) => {
      state.seasonLoading = action.payload;
    },
    setGetSeasonLoading: (state, action: PayloadAction<boolean>) => {
      state.getSeasonLoading = action.payload;
    },
    addSeason: (state, action: PayloadAction<Season>) => {
      state.seasons = [...state.seasons, action.payload];
    },
    updateSeason: (state, action: PayloadAction<Season>) => {
      state.seasons = state.seasons.map((season) =>
        season.id === action.payload.id ? action.payload : season
      );
    },
    deleteSeason: (state, action: PayloadAction<string>) => {
      state.seasons = state.seasons.filter(
        (season) => season.id !== action.payload
      );
    },
  },
});

export const {
  setSeasonLoading,
  setGetSeasonLoading,
  setSeasons,
  addSeason,
  updateSeason,
  deleteSeason,
} = SeasonSlice.actions;
export default SeasonSlice.reducer;
