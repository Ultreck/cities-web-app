import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  details: {[key:string]:number|string|boolean|null} | null;
  isLoading: boolean;
};

const initialState: UserState = {
  details: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        details: {[key:string]:number|string|boolean|null};
      }>
    ) => {
      state.details = action.payload.details;
    },
    clearUser: (state) => {
      state.details = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
