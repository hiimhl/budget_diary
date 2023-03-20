import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IData, REMOVE_BUDGET, REMOVE_DIARY, REMOVE_SCHEDULE } from "../store";
import { borderRadius, colorSet, fontSize, space } from "../style-root";

const Card = styled.li`
  list-style: none;
  width: 100%;
  padding: ${space.micro};
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: ${space.micro};
  border-radius: ${borderRadius.micro};
`;

const RemoveBtn = styled.button`
  font-size: ${fontSize.micro};
  box-sizing: border-box;
  border-radius: ${borderRadius.small};
  padding: ${space.micro} ${space.basic};
  margin: 0 ${space.micro};
  border: 2px solid ${colorSet.gray};
  color: ${colorSet.gray};
`;
const EditBtn = styled(RemoveBtn)`
  background-color: ${(props) => props.theme.weekColor.week_6};
  border: 2px solid ${(props) => props.theme.pointColor};
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
