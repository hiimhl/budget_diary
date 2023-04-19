import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./actions-type";

// State
export const initialState: IState = {
  user: {
    theme: "",
  },
  data: {
    budgetBook: {},
    diary: {},
    schedule: {},
  },
};
