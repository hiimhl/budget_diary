import { legacy_createStore as createStore } from "redux";

// Interface
export interface IState {
  data: {
    budgetBook: {
      [key: string]: IBudget[];
    };
    diary: {
      [key: string]: IDiary[];
    };
  };
}

interface IBudget {
  time: string;
  title: string;
  date: string;
  amount: string;
  id: string;
  category: string;
  pay: string;
  memo: string;
}

interface IDiary {
  time: string;
  title: string;
  date: string;
  id: string;
  memo: string;
  emoji: string;
}

interface IAction {
  type: IType;
  data: IBudget | IDiary;
}

// State
export const initialState: IState = {
  data: {
    budgetBook: {},
    diary: {},
  },
};

// Type
export const ADD_BUDGET = "ADD_BUDGET";
export const ADD_DIARY = "ADD_DIARY";
export const REMOVE_BUDGET = "REMOVE_BUDGET";

type IType = "ADD_BUDGET" | "ADD_DIARY" | "REMOVE_BUDGET";

// Reducer
export function reducer(
  state: IState = initialState,
  action: { type: IType; data: any }
) {
  switch (action.type) {
    case ADD_BUDGET:
      return {
        data: {
          budgetBook: {
            ...state.data.budgetBook,
            [action.data.date]: [
              ...(state.data.budgetBook[action.data.date] ?? []),
              action.data,
            ],
          },
          diary: state.data.diary,
        },
      };
    case REMOVE_BUDGET:
      return state;

    case ADD_DIARY:
      return {
        data: {
          diary: {
            ...state.data.diary,
            [action.data.date]: [
              ...(state.data.diary[action.data.date] ?? []),
              action.data,
            ],
          },
          budgetBook: state.data.budgetBook,
        },
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);
