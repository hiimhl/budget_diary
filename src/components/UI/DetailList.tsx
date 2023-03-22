import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IData,
  REMOVE_BUDGET,
  REMOVE_DIARY,
  REMOVE_SCHEDULE,
} from "../../store";
import {
  borderRadius,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../../style-root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Card = styled.li`
  list-style: none;
  width: 100%;
  padding: ${space.micro};
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: ${space.micro};
  border-radius: ${borderRadius.micro};
`;

const Content = styled.div`
  /* title */
  h5 {
    font-weight: ${fontWeight.small};
  }
`;

const RemoveBtn = styled.button`
  font-size: ${fontSize.small};
  box-sizing: border-box;
  border-radius: ${borderRadius.small};
  /* padding: ${space.micro} ${space.basic}; */
  width: 50px;
  height: 30px;
  margin: 0 ${space.micro};
  border: 2px solid ${colorSet.gray};
  color: ${colorSet.red};
`;

const EditBtn = styled(RemoveBtn)`
  font-family: ${font.kor};
  /* background-color: ${(props) => props.theme.weekColor.week_6}; */
  background-color: #52b788;
  /* border: 2px solid ${(props) => props.theme.pointColor}; */
  color: white;
`;

function DetailList({ data, type }: any) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  // Go to Edit page with Data
  const onEdit = (data: IData) => {
    if (type === "budget") {
      navigation("/new", { state: data });
    } else if (type === "schedule") {
      navigation("/new/schedule", { state: data });
    } else if (type === "diary") {
      navigation("/new/diary", { state: data });
    }
  };

  // Delete the Data
  const onRemove = (data: IData) => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (type === "budget") {
        dispatch({ type: REMOVE_BUDGET, data });
      } else if (type === "schedule") {
        dispatch({ type: REMOVE_SCHEDULE, data });
      } else if (type === "diary") {
        dispatch({ type: REMOVE_DIARY, data });
      }
    }
  };

  const onGoDetail = (type: string) =>
    navigation(`/${data.date}/${type}/${data.id}`);

  return (
    <Card>
      {type === "budget" && (
        <Content onClick={() => onGoDetail("budgetBook")}>
          <h5>{data.title}</h5>
          <span>{data.date}</span>
          <p>지출 :{data.amount}원</p>
        </Content>
      )}
      {type === "schedule" && (
        <Content onClick={() => onGoDetail("schedule")}>
          <h5>{data.title}</h5>
          <span>
            {data.startDate} ~ {data.endDate}
          </span>
        </Content>
      )}
      {type === "diary" && (
        <Content onClick={() => onGoDetail("diary")}>
          <h5>{data.title}</h5>
          <span>{data.date}</span>
        </Content>
      )}
      <EditBtn onClick={() => onEdit(data)}>수정</EditBtn>
      <RemoveBtn onClick={() => onRemove(data)}>
        <FontAwesomeIcon icon={faTrashCan} />
      </RemoveBtn>
    </Card>
  );
}

export default DetailList;
