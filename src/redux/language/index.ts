import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../comments/types";

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: Language.RU,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { actions } = languageSlice;
export const languageReducer = languageSlice.reducer;
export type { LanguageState };
export const { setLanguage } = actions;
