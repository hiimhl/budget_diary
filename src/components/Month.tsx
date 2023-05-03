import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Calendar,
  dayjsLocalizer,
  ToolbarProps,
  Views,
} from "react-big-calendar";
import { useSelector } from "react-redux";
import { IState } from "../store/actions-type";
import { IData } from "../store/actions-type";
import DetailItem from "./UI/DetailItem";
import styled, { useTheme } from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { colorSet, fontSize, fontWeight, space } from "../style-root";
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
    background-color: ${(props) => props.theme.weekColor.week_0};
  }

  /* Event */
  .rbc-event {
    background-color: ${(props) => props.theme.weekColor.week_3};
    border-radius: 0;
    color: ${colorSet.black};
  }

  /* Toolbar wrapper */
  .rbc-toolbar {
    margin-bottom: ${space.middle};
  }

  /* Toolbar heading */
  .rbc-toolbar-label {
    font-size: ${fontSize.week};
    font-weight: ${fontWeight.small};
  }
`;

// Popup - event detail card
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
  display: flex;

  img {
    margin-right: 3px;
    width: ${space.basic};
    height: ${space.basic};
    border-radius: 50%;
    background-color: ${colorSet.emoji};
  }
`;

// Localizer
const localizer = dayjsLocalizer(dayjs);

function MyCalendar() {
  const [isClicked, setISClicked] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [itemType, setItemType] = useState("");
  const [events, setEvents] = useState<IData[]>([]);
  const [clickEvent, setClickEvent] = useState<IData>();
  const data = useSelector((state: IState) => state.data);

  const navigation = useNavigate();
  const theme = useTheme();

  // Set Events - and filtering data
  useEffect(() => {
    const schedule = Object.values(data.schedule).flatMap((data) => data);
    const diary = Object.values(data.diary).flatMap((data) => data);
    // make total amount
    const budgetBook = Object.values(data.budgetBook).flatMap((arr) => {
      const data = arr.reduce((acc, { amount }) => acc + amount!, 0);
      return {
        id: "budgetBook",
        date: "",
        title: data.toLocaleString() + "원",
        time: arr[0].time,
        endDate: arr[0].time,
        type: data > 0 ? "positive" : "negative",
      };
    });
    const array = [...diary, ...schedule, ...budgetBook];

    // Filter Button
    if (filterType === "all") {
      return setEvents(array);
    } else if (filterType === "budgetBook") {
      return setEvents(budgetBook);
    } else if (filterType === "schedule") {
      return setEvents(schedule);
    } else if (filterType === "diary") {
      return setEvents(diary);
    }
  }, [isClicked, filterType]);

  // Styled to type
  const eventPropGetter = (event: any) => {
    let style = { backgroundColor: "", color: "black", fontSize: "" };
    if (event.type === "diary") {
      style.backgroundColor = theme.pointColor;
      style.color = "white";
    } else if (event.type === "positive") {
      style.backgroundColor = "transparent";
      style.color = colorSet.blue;
      style.fontSize = fontSize.small;
    } else if (event.type === "negative") {
      style.backgroundColor = "transparent";
      style.color = colorSet.red;
      style.fontSize = fontSize.small;
    }
    return { style }; //
  };

  // Style diary events - add emoji
  const EventIcon = ({ event }: any) => {
    if (event.type === "diary") {
      return (
        <EventBox>
          <img src={`${imageUrl}${event.emoji}.svg`} />
          {event.title.slice(0, 5)}
          {event.title.length > 5 && "..."}
        </EventBox>
      );
    } else {
      return <>{event.title}</>;
    }
  };

  // Tool bar - header and buttons - prev, next and filter buttons
  const MyToolbar = (props: ToolbarProps) => {
    const onGoToToday = () => {
      props.onNavigate("TODAY", new Date());
    };

    const calendarDate = props.label.slice(3) + "년 " + props.label.slice(0, 2);

    const onFilter = (type: string) =>
      setFilterType(filterType === type ? "all" : type);

    // Style the Filter button when it is clicked  - inline style -
    const styleFilterBtn = (type: string) => {
      let style = {
        backgroundColor: "",
        boxShadow: "",
      };
      style.backgroundColor =
        filterType === type ? theme.weekColor.week_0 : colorSet.white;
      style.boxShadow =
        filterType === type ? "inset 2px 2px 3px 0px rgba(0,0,0,0.08)" : "";

      return style;
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => props.onNavigate("PREV")}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button type="button" onClick={onGoToToday}>
            Today
          </button>
          <button type="button" onClick={() => props.onNavigate("NEXT")}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </span>
        <span className="rbc-toolbar-label">{calendarDate}</span>
        <span className="rbc-btn-group">
          <button
            style={styleFilterBtn("schedule")}
            onClick={() => onFilter("schedule")}
          >
            할일
          </button>
          <button
            style={styleFilterBtn("budgetBook")}
            onClick={() => onFilter("budgetBook")}
          >
            가계부
          </button>
          <button
            style={styleFilterBtn("diary")}
            onClick={() => onFilter("diary")}
          >
            일기
          </button>
        </span>
      </div>
    );
  };

  // Show clicked event
  const onDayclick = (event: IData) => {
    // When click total amount
    if (event.id === "budgetBook") {
      const path = event.time!.slice(0, 10);
      return navigation(`/${path}`);
    }
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

    // Click 'X' icon or Buttons
    if (targetTagName === "path" || "BUTTON") {
      return setISClicked(false);
    }
  };

  return (
    <MonthWrapper>
      <Calendar
        events={events}
        localizer={localizer}
        onSelectEvent={onDayclick} //onClick day event
        onShowMore={onShowMoreEvents}
        views={[Views.MONTH]}
        startAccessor="time"
        endAccessor="endDate"
        style={{ height: "700px", marginTop: "20px" }}
        eventPropGetter={eventPropGetter} //style
        components={{ event: EventIcon, toolbar: MyToolbar }} // custom
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
