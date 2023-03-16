import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IData, REMOVE_BUDGET, REMOVE_DIARY, REMOVE_SCHEDULE } from "../store";
import { fontSize, space } from "../style-root";

const Card = styled.li`
  list-style: none;
  padding: ${space.micro};
`;
const RemoveBtn = styled.button`
  font-size: ${fontSize.small};
  box-sizing: border-box;
  padding: ${space.micro} ${space.basic};
  border: 1px solid red;
`;
const EditBtn = styled(RemoveBtn)`
  background-color: ${(props) => props.theme.pointColor};
  border: none;
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

  return (
    <Card>
      {type === "budget" && (
        <>
          <h5>{data.title}</h5>
          <span>{data.date}</span>
          <span>지출 :{data.amount}원</span>
        </>
      )}
      {type === "schedule" && (
        <>
          <h5>{data.title}</h5>
          <b>{data.id}</b>
          <span>
            {data.startDate} ~ {data.endDate}
          </span>
        </>
      )}
      {type === "diary" && (
        <>
          <h5>{data.title}</h5>
          <span>{data.date}</span>
        </>
      )}
      <EditBtn onClick={() => onEdit(data)}>수정</EditBtn>
      <RemoveBtn onClick={() => onRemove(data)}>삭제</RemoveBtn>
    </Card>
  );
}

export default DetailList;
