import React from "react";
import { Wrapper } from "./Home";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/ko"; // 로케일 설정

function Detail() {
  dayjs.locale("ko");
  const localizer = dayjsLocalizer(dayjs);
  console.log(dayjs);
  return (
    <Wrapper>
      <Calendar
        localizer={localizer}
        //  events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: true }}
        defaultView={Views.WEEK}
      />
    </Wrapper>
  );
}

export default Detail;
