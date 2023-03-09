import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";

// Get day of the week with number
export function getWeek(data: number) {
  const list = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return list[data];
}

// Today's time infomation
export const day = dayjs();
day.locale("ko");
export const today = day.format("YYYY-MM-DD");
export const month = day.format("MM");
export const dayOfWeek = day.format("ddd");
export const dayOfWeekFull = day.format("dddd"); // Full day

// Get Week list
export function getWeekList(data: Dayjs) {
  const fisrtWeek = data.startOf("week");
  const endWeek = data.endOf("week");

  const dayList = [];
  let day = fisrtWeek;

  while (day <= endWeek) {
    dayList.push(day.format("YYYY-MM-DD"));
    day = day.add(1, "day");
  }
  return dayList;
}
