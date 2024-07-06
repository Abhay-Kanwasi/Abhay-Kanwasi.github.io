import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light', // Retrieve mode from local storage
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      localStorage.setItem('themeMode', newMode); // Store mode in local storage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
