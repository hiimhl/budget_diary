// Interface

export interface IState {
  user: {
    theme: string;
    todayView: boolean;
  };
  data: {
    budgetBook: {
      [key: string]: IData[];
    };
    diary: {
      [key: string]: IData;
    };
    schedule: {
      [key: string]: IData[];
    };
  };
}

export interface IData {
  id: string;
  title?: string;
  date: string;
  memo?: string;
  type?: string;
  amount?: number; // BudgetBook
  category?: string; // BudgetBook
  pay?: string; // BudgetBook
  time?: string; // Diary, BudgetBook
  emoji?: string; // Diary
  startDate?: string; // Schedule
  endDate?: string; // Schedule
  theme?: string; // Theme
  todayView?: boolean; // view today or month
}

export const ADD_BUDGET = "ADD_BUDGET";
export const ADD_DIARY = "ADD_DIARY";
export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const EDIT_BUDGET = "EDIT_BUDGET";
export const EDIT_DIARY = "EDIT_DIARY";
export const EDIT_SCHEDULE = "EDIT_SCHEDULE";
export const REMOVE_BUDGET = "REMOVE_BUDGET";
export const REMOVE_DIARY = "REMOVE_DIARY";
export const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";
export const SET_THEME = "SET_THEME";
export const GET_DATA = "GET_DATA";
export const RESET_DATA = "RESET_DATA";
export const SET_VIEW = "SET_VIEW";

export type IType =
  | "ADD_BUDGET"
  | "ADD_DIARY"
  | "ADD_SCHEDULE"
  | "EDIT_BUDGET"
  | "EDIT_DIARY"
  | "EDIT_SCHEDULE"
  | "REMOVE_BUDGET"
  | "REMOVE_DIARY"
  | "REMOVE_SCHEDULE"
  | "SET_THEME"
  | "GET_DATA"
  | "RESET_DATA"
  | "SET_VIEW";
