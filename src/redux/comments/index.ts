import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserComment, Language } from "./types";

interface FetchCommentsResponse {
  ru: { [key: string]: UserComment };
  en: { [key: string]: UserComment };
}
export const fetchComments = createAsyncThunk<
  FetchCommentsResponse,
  void,
  { rejectValue: string }
>("comments/fetchComments", async (_arg, thunkAPI) => {
  try {
    const response = await axios.get<FetchCommentsResponse>("/data/data.json");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch comments");
  }
});

interface CommentsState {
  data: FetchCommentsResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: CommentsState = {
  data: { ru: {}, en: {} },
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Экспорт редьюсеров и типа состояния комментариев

export const commentsReducer = commentsSlice.reducer;
export type { CommentsState };
