import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { useSelector } from "react-redux";
import { IState } from "../store/actions-type";
import { IData } from "../store/actions-type";
import DetailItem from "./UI/DetailItem";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";

// style
const MonthWrapper = styled.section`
  width: 95%;
  height: 75vh;
  margin: auto;
  position: relative;

  /* Today */
  .rbc-today {
    background-color: ${(props) => props.theme.weekColor.week_0};
  }

  /* Event */
  .rbc-event {
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 0;
  }
`;

// Pop up - event detail card
const PopUpCard = styled.div`
  width: 90%;
  height: 80vh;
  z-index: 1;
  position: absolute;
  top: 0;
`;

const localizer = dayjsLocalizer(dayjs);

function MyCalendar() {
  const [isClicked, setISClicked] = useState(false);
  const [events, setEvents] = useState<IData[]>([]);
  const [clickEvent, setClickEvent] = useState<IData>();
  const data = useSelector((state: IState) => state.data);

  useEffect(() => {
    const schedule = Object.values(data.schedule).flatMap((data) => data);
    const budgetBook = Object.values(data.budgetBook).flatMap((data) => data);
    const diary = Object.values(data.diary).flatMap((data) => data);
    const array = [...schedule, ...budgetBook, ...diary];
    setEvents(array);
  }, []);

  // Show clicked event
  const onDayclick = (event: IData) => {
    setISClicked(true);
    console.log(event);
    setClickEvent(event);
  };

  // show today events
  const onShowMoreEvents = (events: IData[], date: Date) => {
    console.log(events, date);
  };
  return (
    <MonthWrapper>
      <Calendar
        events={events}
        localizer={localizer}
        onSelectEvent={onDayclick}
        onShowMore={onShowMoreEvents}
        views={[Views.MONTH]}
        startAccessor="time"
        endAccessor="endDate"
        style={{ height: "500px" }}
      />
      {isClicked && (
        <PopUpCard onClick={() => setISClicked(false)}>
          <DetailItem type="" data={clickEvent!} hiddenLogo={true} />
        </PopUpCard>
      )}
    </MonthWrapper>
  );
}
export default MyCalendar;
