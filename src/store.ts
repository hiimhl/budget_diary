import { legacy_createStore as createStore } from "redux";

export interface IState {
  data: {
    budgetBook: {};
    diary: {};
  };
}

const initialState: IState = {
  data: {
    budgetBook: {},
    diary: {},
  },
};

// Type
export const ADD_BUDGET = "ADD_BUDGET";

// export function setState(data: any) {
//   return { type: "ADD", data: data };
// }

interface IBudget {
  time: string;
  title: string;
  amount: string;
  id: string;
  category: string;
  pay: string;
  memo: string;
}

export function reducer(
  state: IState = initialState,
  action: { type: string; data: IBudget }
) {
  switch (action.type) {
    case ADD_BUDGET:
      return { ...state, budgetBook: action.data };
    case "REMOVE":
      return state;
    default:
      return state;
  }
}

export const store = createStore(reducer);
