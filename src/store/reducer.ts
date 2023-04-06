import { legacy_createStore as createStore } from "redux";

import {
  ADD_BUDGET,
  ADD_DIARY,
  ADD_SCHEDULE,
  EDIT_BUDGET,
  EDIT_DIARY,
  EDIT_SCHEDULE,
  REMOVE_BUDGET,
  REMOVE_DIARY,
  REMOVE_SCHEDULE,
  SET_THEME,
  IData,
  IState,
  IType,
} from "./actions";
import { initialState } from "./initialState";

// Reducer
export function reducer(
  state: IState = initialState,
  action: { type: IType; data: IData }
) {
  switch (action.type) {
    case ADD_BUDGET:
      const { date } = action.data;
      return {
        ...state,
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
        ...state,
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
        ...state,
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
      const { [date]: toRemove, ...otherData } = state.data.diary;
      // [date]의 key값을 toRemove라는 변수에 저장

      return {
        ...state,
        data: {
          ...state.data,
          diary: otherData,
        },
      };
    }

    case REMOVE_SCHEDULE: {
      const { date, id } = action.data;
      return {
        ...state,
        data: {
          ...state.data,
          schedule: {
            [date]: state.data.schedule[date].filter((list) => list.id !== id),
          },
        },
      };
    }

    case SET_THEME: {
      return {
        ...state,
        user: {
          theme: action.data.theme!,
        },
      };
    }

    default:
      return state;
  }
}

export const store = createStore(reducer);
