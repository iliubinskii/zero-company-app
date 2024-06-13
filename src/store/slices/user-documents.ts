import type { AppState } from "../types";
import type { ExistingDocument } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["userDocuments"] = {
  documents: [],
  documentsError: false,
  documentsLoading: true
};

const useDocumentsSlice = createSlice({
  initialState,
  name: "documents",
  reducers: {
    addDocument: (state, action: PayloadAction<ExistingDocument>) => {
      state.documents = [
        ...state.documents.filter(
          document => document._id !== action.payload._id
        ),
        dangerouslyAssumeWritable(action.payload)
      ];
    },
    clearDocuments: state => {
      state.documents = [];
      state.documentsError = false;
      state.documentsLoading = true;
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(
        document => document._id !== action.payload
      );
    },
    setDocuments: (
      state,
      action: PayloadAction<readonly ExistingDocument[]>
    ) => {
      state.documents = dangerouslyAssumeWritable(action.payload);
      state.documentsError = false;
      state.documentsLoading = false;
    },
    setDocumentsError: state => {
      state.documents = [];
      state.documentsError = true;
      state.documentsLoading = false;
    }
  }
});

export const userDocumentsReducer = useDocumentsSlice.reducer;

export const {
  addDocument,
  clearDocuments,
  removeDocument,
  setDocuments,
  setDocumentsError
} = useDocumentsSlice.actions;

/**
 * Selects the documents from the state.
 * @param state - The state of the app.
 * @returns The documents.
 */
export const selectDocuments = (state: AppState): readonly ExistingDocument[] =>
  state.userDocuments.documents;

/**
 * Selects whether the documents have been loaded.
 * @param state - The state of the app.
 * @returns Whether the documents have been loaded.
 */
export const selectDocumentsLoading = (state: AppState): boolean =>
  state.userDocuments.documentsLoading;

export type UserDocumentsActions =
  | ReturnType<typeof addDocument>
  | ReturnType<typeof clearDocuments>
  | ReturnType<typeof removeDocument>
  | ReturnType<typeof setDocuments>
  | ReturnType<typeof setDocumentsError>;
