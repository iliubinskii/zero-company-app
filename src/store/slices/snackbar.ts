import type { AppState, SnackbarVariant } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState["snackbar"] = {
  isOpen: false,
  message: "",
  variant: "info"
};

const snackbarSlice = createSlice({
  initialState,
  name: "snackbar",
  reducers: {
    hideSnackbar: state => {
      // Do not reset the message and variant to let snackbar fade out
      state.isOpen = false;
    },
    showSnackbar: (
      state,
      action: PayloadAction<{
        readonly message: string;
        readonly variant?: SnackbarVariant;
      }>
    ) => {
      const { message, variant = "info" } = action.payload;

      state.isOpen = true;
      state.message = message;
      state.variant = variant;
    }
  }
});

export const snackbarReducer = snackbarSlice.reducer;

export const { hideSnackbar, showSnackbar } = snackbarSlice.actions;

/**
 * Select the snackbar active state.
 * @param state - The app state.
 * @returns The snackbar active state.
 */
export const selectSnackbarIsOpen = (state: AppState): boolean =>
  state.snackbar.isOpen;

/**
 * Select the snackbar message.
 * @param state - The app state.
 * @returns The snackbar message.
 */
export const selectSnackbarMessage = (state: AppState): string =>
  state.snackbar.message;

/**
 * Select the snackbar variant.
 * @param state - The app state.
 * @returns The snackbar variant.
 */
export const selectSnackbarVariant = (state: AppState): SnackbarVariant =>
  state.snackbar.variant;

export type SnackbarActions =
  | ReturnType<typeof hideSnackbar>
  | ReturnType<typeof showSnackbar>;
