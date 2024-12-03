import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  type?: "error" | "info";
  open: boolean;
  data?: any;
}
export interface IOpenPayload {
  type: "error" | "info";
  data: Record<string, any>;
}
const initialState: IInitialState = {
  open: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IOpenPayload>) => {
      state.open = true;
      if (action.payload) {
        state.data = { ...action.payload.data };
        state.type = action.payload.type;
      }
    },
    closeModal: (state) => {
      state.open = initialState.open;
      state.data = initialState.data;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
