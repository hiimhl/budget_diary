import { IState } from "./actions-type";

// State
export const initialState: IState = {
  user: {
    theme: "",
    todayView: true,
  },
  data: {
    budgetBook: {},
    diary: {
      "2023-04-16": {
        id: "012333333333",
        type: "diary",
        title: "편의점가기",
        date: "2023-04-16",
        memo: "과자 구매",
        time: "2023-04-16T09:00",
        emoji: "emoji_1",
      },
      "2023-04-17": {
        id: "012333333333",
        type: "diary",
        title: "편의점가기",
        date: "2023-04-16",
        memo: "과자 구매",
        time: "2023-04-19T09:00",
        emoji: "emoji_1",
      },
      "2023-04-19": {
        id: "012333333333",
        type: "diary",
        title: "편의점가기",
        date: "2023-04-16",
        memo: "과자 구매",
        time: "2023-04-196T09:00",
        emoji: "emoji_1",
      },
    },
    schedule: {
      "2023-04-16": [
        {
          id: "0123333",
          type: "schedule",
          title: "편의점가기",
          date: "2023-04-16",
          memo: "과자 구매",
          time: "2023-04-16T09:00",
          endDate: "2023-04-16T09:00",
        },
        {
          id: "015444444",
          type: "schedule",
          title: "과자사기",
          date: "2023-04-16",
          memo: "과자 구매",
          time: "2023-04-16T09:00",
          endDate: "2023-04-18T09:00",
        },
      ],
      "2023-04-17": [
        {
          id: "0123333",
          type: "schedule",
          title: "편의점가기",
          date: "2023-04-167",
          memo: "과자 구매",
          time: "2023-04-16T09:00",
          endDate: "2023-04-16T09:00",
        },
        {
          id: "015444444",
          type: "schedule",
          title: "과자사기",
          date: "2023-04-18",
          memo: "과자 구매",
          time: "2023-04-28T09:00",
          endDate: "2023-04-18T09:00",
        },
      ],
      "2023-04-18": [
        {
          id: "0123333",
          type: "schedule",
          title: "편의점가기",
          date: "2023-04-26",
          memo: "과자 구매",
          time: "2023-04-26T09:00",
          endDate: "2023-04-28T09:00",
        },
        {
          id: "015444444",
          type: "schedule",
          title: "과자사기",
          date: "2023-04-22",
          memo: "과자 구매",
          time: "2023-04-22T09:00",
          endDate: "2023-04-24T09:00",
        },
      ],
    },
  },
};
