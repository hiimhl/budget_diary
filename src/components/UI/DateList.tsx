import {
  faNoteSticky,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  borderRadius,
  colorSet,
  fontSize,
  fontWeight,
  space,
} from "../../style-root";

// Style
const Card = styled.li`
  list-style: none;
  width: 100%;
  padding: ${space.small};
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: ${space.micro};
  border-radius: ${borderRadius.micro};

  /* icons */
  i {
    cursor: pointer;
  }

  h5 {
    font-weight: ${fontWeight.small};
    margin-bottom: ${space.micro};
  }
`;

const ScheduleContent = styled.div<{ isClicked: boolean }>`
  text-decoration: ${(props) => (props.isClicked ? "line-through" : "none")};
  color: ${(props) => (props.isClicked ? colorSet.gray : "")};

  p {
    margin-left: ${space.middle};
    font-size: ${fontSize.small};
    color: ${colorSet.gray};
  }
`;

const Todo = styled.div`
  display: flex;
  position: relative;
  i {
    margin-right: ${space.micro};
  }
`;

const GoDetailIcon = styled.i`
  color: ${colorSet.gray};
  position: absolute;
  right: 0;
`;

const DiaryContent = styled.div`
  cursor: pointer;
  position: relative;

  span {
    color: ${colorSet.gray};
    font-size: ${fontSize.small};
  }
  p {
    margin: ${space.micro};
  }
`;

const Emoji = styled.i`
  position: absolute;
  right: 0;
`;

const BudgetContent = styled(DiaryContent)`
  display: flex;
  i {
    margin: 0 ${space.small};
    font-size: ${fontSize.title};
    svg {
      margin-top: ${space.micro};
    }
  }
`;

// Component
function DateList({ data, type }: any) {
  const navigation = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const onGoDetail = (type: string) =>
    navigation(`/${data.date}/${type}/${data.id}`);
  const onScheduleClick = () => setIsClicked((prev) => !prev);
  return (
    <Card>
      {type === "schedule" && (
        <ScheduleContent isClicked={isClicked}>
          <Todo>
            <i onClick={onScheduleClick}>
              <FontAwesomeIcon icon={isClicked ? faSquareCheck : faSquare} />
            </i>
            <h5>{data.title}</h5>
            <GoDetailIcon onClick={() => onGoDetail("schedule")}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </GoDetailIcon>
          </Todo>
          <p>
            {dayjs(data.startDate).format("A h:mm")}
            {data.startDate === data.endDate
              ? ""
              : " ~ " + dayjs(data.endDate).format("M월 D일 A h:mm")}
          </p>
        </ScheduleContent>
      )}
      {type === "budget" && (
        <BudgetContent onClick={() => onGoDetail("budgetBook")}>
          <i>
            <FontAwesomeIcon icon={data.amount > 0 ? faPlus : faMinus} />
          </i>
          <div>
            <h5>{data.title}</h5>
            <span>
              {data.amount}
              {"원 | "}
              {data.pay}
              {" | "}
              {dayjs(data.time).format("A h:mm")}
            </span>
          </div>
        </BudgetContent>
      )}
      {type === "diary" && (
        <DiaryContent onClick={() => onGoDetail("diary")}>
          <h5>{data.title}</h5>
          <Emoji>{data.emoji}</Emoji>
          <p>{data.memo.slice(30)}...</p>
          <span>{dayjs(data.time).format("A H:mm")}</span>
        </DiaryContent>
      )}
    </Card>
  );
}

export default DateList;
