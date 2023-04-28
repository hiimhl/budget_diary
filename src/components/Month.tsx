import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Calendar,
  dayjsLocalizer,
  Views,
  EventPropGetter,
} from "react-big-calendar";
import { useSelector } from "react-redux";
import { IState } from "../store/actions-type";
import { IData } from "../store/actions-type";
import DetailItem from "./UI/DetailItem";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { colorSet, fontSize } from "../style-root";

// style
const MonthWrapper = styled.section`
  width: 95%;
  height: 75vh;
  margin: auto;
  position: relative;

  /* Today */
  .rbc-today {
    background-color: ${(props) => props.theme.weekColor.week_2};
  }

  /* Event */
  .rbc-event {
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 0;
  }
`;

// Pop up - event detail card
const PopUpCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colorSet.white};
  z-index: 10;
  position: absolute;
  top: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: ${fontSize.week};
  position: absolute;
  z-index: 11;
  top: 4%;
  right: 12%;
  color: ${colorSet.red};
`;

// Localizer
const localizer = dayjsLocalizer(dayjs);

function MyCalendar() {
  const [isClicked, setISClicked] = useState(false);
  const [itemType, setItemType] = useState("");
  const [events, setEvents] = useState<IData[]>([]);
  const [clickEvent, setClickEvent] = useState<IData>();
  const data = useSelector((state: IState) => state.data);

  useEffect(() => {
    const schedule = Object.values(data.schedule).flatMap((data) => data);
    const budgetBook = Object.values(data.budgetBook).flatMap((data) => data);
    const diary = Object.values(data.diary).flatMap((data) => data);
    const array = [...schedule, ...budgetBook, ...diary];
    setEvents(array);
  }, [isClicked]);

  // Show clicked event
  const onDayclick = (event: IData) => {
    setISClicked(true);
    setClickEvent(event);
    setItemType(event.type!);
  };

  // show today events
  const onShowMoreEvents = (events: IData[], date: Date) => {
    console.log(events, date);
  };

  const onClosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetTagName = (e.target as HTMLDivElement).nodeName;

    // Click X icon or Buttons
    if (targetTagName === "path" || "BUTTON") {
      setISClicked(false);
    }
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
        style={{ height: "550px" }}
        // eventPropGetter={eventPropGetter}
        messages={{ showMore: (total) => `+${total} 더보기` }}
      />
      {isClicked && (
        <PopUpCard onClick={onClosePopUp}>
          <Icon icon={faSquareXmark} />
          <DetailItem
            type={itemType}
            cardShadow={true}
            data={clickEvent!}
            hiddenHeader={true}
          />
        </PopUpCard>
      )}
    </MonthWrapper>
  );
}
export default MyCalendar;
