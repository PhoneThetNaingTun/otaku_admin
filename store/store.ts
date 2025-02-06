import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import CategorySliceReducer from "./Slices/CategorySlice";
import SeasonSliceReducer from "./Slices/SeasonSlice";
import AuthorSliceReducer from "./Slices/AuthorSlice";
import MangaSliceReducer from "./Slices/MangaSlice";
import MangaCategorySliceReducer from "./Slices/MangaCategorySlice";
import MangaSeasonSliceReducer from "./Slices/MangaSeasonSlice";
import ChapterSliceReducer from "./Slices/ChapterSlice";
import MangaSeasonChapterSliceReducer from "./Slices/MangaSeasonChapterSlice";
import PageSliceReducer from "./Slices/PageSlice";
import LandingSliceReducer from "./Slices/LandingSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
    Category: CategorySliceReducer,
    Season: SeasonSliceReducer,
    Author: AuthorSliceReducer,
    Manga: MangaSliceReducer,
    MangaCategory: MangaCategorySliceReducer,
    MangaSeason: MangaSeasonSliceReducer,
    Chapter: ChapterSliceReducer,
    MangaSeasonChapter: MangaSeasonChapterSliceReducer,
    Page: PageSliceReducer,
    Landing: LandingSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
