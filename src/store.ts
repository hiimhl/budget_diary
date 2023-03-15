import { legacy_createStore as createStore } from "redux";

// Interface
export interface IState {
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
  title: string;
  date: string;
  memo: string;
  amount?: number; // BudgetBook
  category?: string; // BudgetBook
  pay?: string; // BudgetBook
  time?: string; // Diary, BudgetBook
  emoji?: string; // Diary
  startDate?: string; // Schedule
  endDate?: string; // Schedule
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

type IType =
  | "ADD_BUDGET"
  | "ADD_DIARY"
  | "ADD_SCHEDULE"
  | "EDIT_BUDGET"
  | "EDIT_DIARY"
  | "EDIT_SCHEDULE"
  | "REMOVE_BUDGET"
  | "REMOVE_DIARY"
  | "REMOVE_SCHEDULE";

// State
export const initialState: IState = {
  data: {
    budgetBook: {},
    diary: {},
    schedule: {},
  },
};

// Reducer
export function reducer(
  state: IState = initialState,
  action: { type: IType; data: IData }
) {
  switch (action.type) {
    case ADD_BUDGET:
      const { date } = action.data;
      return {
        data: {
          budgetBook: {
            ...state.data.budgetBook,
            [date]: [...(state.data.budgetBook[date] ?? []), action.data],
          },
          diary: state.data.diary,
          schedule: state.data.schedule,
        },
      };

    case ADD_DIARY:
      return {
        data: {
          diary: {
            ...state.data.diary,
            [action.data.date]: action.data,
          },
          budgetBook: state.data.budgetBook,
          schedule: state.data.schedule,
        },
      };

    case ADD_SCHEDULE:
      return {
        data: {
          budgetBook: state.data.budgetBook,
          diary: state.data.diary,
          schedule: {
            ...state.data.schedule,
            [action.data.date]: [
              ...(state.data.schedule[action.data.date] ?? []),
              action.data,
            ],
          },
        },
      };

    // Updata data
    case EDIT_BUDGET: {
      const { date, id } = action.data;
      return {
        ...state,
        data: {
          ...state.data,
          budgetBook: {
            ...state.data.budgetBook,
            [date]: state.data.budgetBook[date].map((list) =>
              list.id === id ? { ...action.data } : list
            ),
          },
        },
      };
    }

    case EDIT_DIARY: {
      const { date } = action.data;
      return {
        ...state,
        data: {
          ...state.data,
          diary: {
            ...state.data.diary,
            [date]: action.data,
          },
        },
      };
      break;
    }

    case EDIT_SCHEDULE: {
      const { date, id } = action.data;
      return {
        ...state,
        data: {
          ...state.data,
          schedule: {
            ...state.data.schedule,
            [date]: state.data.schedule[date].map((list) =>
              list.id === id ? { ...action.data } : list
            ),
          },
        },
      };
      break;
    }

    // Remove data
    case REMOVE_BUDGET: {
      const { date, id } = action.data;

      return {
        ...state,
        data: {
          ...state.data,
          budgetBook: {
            [date]: state.data.budgetBook[date].filter(
              (list) => list.id !== id
            ),
          },
        },
      };
    }
    case REMOVE_DIARY: {
      const { date } = action.data;

      return {
        ...state,
        date: {
          ...state.data,
          diary: delete state.data.diary[date],
        },
      };
    }
    case REMOVE_SCHEDULE: {
      return state;
    }

    default:
      return state;
  }
}

export const store = createStore(reducer);
