import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import { useSelector } from "react-redux";
import { IState } from "../store/actions-type";
import { IData } from "../store/actions-type";
import DetailItem from "./UI/DetailItem";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { colorSet, fontSize } from "../style-root";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../util/image";

// style
const MonthWrapper = styled.section`
  width: 95%;
  height: 75vh;
  margin: auto;
  position: relative;

  /* Today */
  .rbc-today {
    background-color: ${(props) => props.theme.weekColor.week_1};
  }
  /* day number */
  .rbc-button-link {
    float: left;
    margin: 1px 2px;
  }
  /* Event */
  .rbc-event {
    background-color: ${(props) => props.theme.weekColor.week_4};
    border-radius: 0;
    color: black;
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

// Event icon box
const EventBox = styled.div`
  width: 20px;
  text-align: end;
  width: 13%;
  position: absolute;
  transform: translate(0, -18px);

  img {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${colorSet.emoji};
  }
`;

// Localizer
const localizer = dayjsLocalizer(dayjs);

function MyCalendar() {
  const [isClicked, setISClicked] = useState(false);
  const [itemType, setItemType] = useState("");
  const [events, setEvents] = useState<IData[]>([]);
  const [clickEvent, setClickEvent] = useState<IData>();
  const data = useSelector((state: IState) => state.data);

  const navigation = useNavigate();

  useEffect(() => {
    const schedule = Object.values(data.schedule).flatMap((data) => data);
    const diary = Object.values(data.diary).flatMap((data) => data);
    // make total amount
    const budgetBook = Object.values(data.budgetBook).flatMap((arr) => {
      const data = arr.reduce((acc, { amount }) => acc + amount!, 0);
      return {
        id: "",
        date: "",
        title: data + "원",
        time: arr[0].time,
        endDate: arr[0].time,
        type: data > 0 ? "positive" : "negative",
      };
    });
    const array = [...diary, ...schedule, ...budgetBook];
    setEvents(array);
  }, [isClicked]);

  // Styled to type
  const eventPropGetter = (event: any) => {
    let style = { backgroundColor: "", color: "black" };
    if (event.type === "diary") {
      style.backgroundColor = "transparent";
    } else if (event.type === "positive") {
      style.backgroundColor = "transparent";
      style.color = "blue";
    } else if (event.type === "negative") {
      style.backgroundColor = "transparent";
      style.color = "red";
    }
    return { style };
  };

  const EventIcon = ({ event }: any) => {
    if (event.type === "diary") {
      return (
        <EventBox>
          <img src={`${imageUrl}${event.emoji}.svg`} />
        </EventBox>
      );
    } else {
      return <>{event.title}</>;
    }
  };

  // Show clicked event
  const onDayclick = (event: IData) => {
    setISClicked(true);
    setClickEvent(event);
    setItemType(event.type!);
  };

  // show today events
  const onShowMoreEvents = (events: IData[]) => {
    const clickDate = events[0].date;
    navigation(`/${clickDate}`);
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
        style={{ height: "750px" }}
        eventPropGetter={eventPropGetter}
        components={{ event: EventIcon }}
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
