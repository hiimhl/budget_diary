import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IData,
  REMOVE_BUDGET,
  REMOVE_DIARY,
  REMOVE_SCHEDULE,
} from "../../store";
import { fontSize, space } from "../../style-root";
import Header from "../Header";

// Style
const Card = styled.section`
  width: 80%;
  height: 70vh;
  background-color: ${(props) => props.theme.pointColor};
  margin: auto;
  margin-top: ${space.middle};

  h2 {
    font-size: ${fontSize.large};
  }
`;

interface IProps {
  data: IData;
  type: string;
}

function DetailItem({ data, type }: IProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  // Go daily list
  const onGoDetailList = () => navigation(-1);

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
    navigation(-1);
  };

  return (
    <>
      {data ? (
        <>
          {" "}
          <Header
            leftBtn={<button onClick={onGoDetailList}>돌아가기</button>}
            middleBtn={<button onClick={() => onEdit(data)}>수정</button>}
            rightBtn={<button onClick={() => onRemove(data)}>삭제</button>}
          />
          <Card>
            <h2>{data.title}</h2>
            <ul>
              <li>
                <h3>날짜 : </h3>
                <p>{data.date}</p>
              </li>
              <li>
                <h3>내용 : </h3>
                <p>{data.memo}</p>
              </li>
              <li>
                <h3>카테고리 : </h3>
                <p>{data.category}</p>
              </li>
            </ul>
          </Card>
        </>
      ) : (
        <span>loading..</span>
      )}
    </>
  );
}

export default DetailItem;
