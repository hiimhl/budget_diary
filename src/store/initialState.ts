import { IState } from "./actions-type";

// State
export const initialState: IState = {
  user: {
    theme: "",
    todayView: true,
  },
  data: {
    budgetBook: {},
    diary: {},
    schedule: {},
  },
};
