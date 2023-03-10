import { legacy_createStore as createStore } from "redux";

// Interface
export interface IState {
  data: {
    budgetBook: {
      [key: string]: IBudget[];
    };
    diary: {
      [key: string]: IDiary;
    };
    schedule: {
      [key: string]: ISchdule[];
    };
  };
}

export interface IBudget {
  time: string;
  title: string;
  date: string;
  amount: number;
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

export interface ISchdule {
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  id: string;
  memo: string;
}

interface IAction {
  type: IType;
  data: IBudget | IDiary;
}

// State
export const initialState: IState = {
  data: {
    budgetBook: {
      "2023-03-09": [
        {
          time: "12:30",
          title: "편의점",
          date: "2023-03-09",
          amount: -1200,
          id: "2023-03-02-12-30-5",
          category: "식비",
          pay: "신용카드",
          memo: "과자 냠냠",
        },
        {
          time: "12:30",
          title: "편의점",
          date: "2023-03-09",
          amount: -1200,
          id: "2023-03-02-12-30-5",
          category: "식비",
          pay: "신용카드",
          memo: "과자 냠냠",
        },
      ],
      "2023-03-08": [
        {
          time: "12:30",
          title: "편의점",
          date: "2023-03-09",
          amount: 1200,
          id: "2023-03-02-12-30-5",
          category: "식비",
          pay: "신용카드",
          memo: "과자 냠냠",
        },
      ],
    },
    diary: {},
    schedule: {
      "2023-03-10": [
        {
          title: "코딩",
          date: "2023-03-10",
          startDate: "",
          endDate: "2023-03-12",
          id: "",
          memo: "코딩하기",
        },
      ],
    },
  },
};

// Type
export const ADD_BUDGET = "ADD_BUDGET";
export const ADD_DIARY = "ADD_DIARY";
export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const REMOVE_BUDGET = "REMOVE_BUDGET";

type IType = "ADD_BUDGET" | "ADD_DIARY" | "REMOVE_BUDGET" | "ADD_SCHEDULE";

// Reducer
export function reducer(
  state: IState = initialState,
  action: { type: IType; data: any }
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
    case REMOVE_BUDGET:
      return state;

    case ADD_DIARY:
      return {
        data: {
          diary: {
            ...state.data.diary,
            [date]: action.data,
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

    // case EDIT_DIARY: {
    //   const { title, content, date } = action.data;

    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       [date]: {
    //         diary: { title, content },
    //         budgetBook: [...state.data[date].budgetBook],
    //       },
    //     },
    //   };
    // }
    default:
      return state;
  }
}

export const store = createStore(reducer);
