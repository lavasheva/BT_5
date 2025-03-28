import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", // По умолчанию светлая тема
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;