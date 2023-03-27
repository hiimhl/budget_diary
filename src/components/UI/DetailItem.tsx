import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import Header from "../Header";
import dayjs from "dayjs";
import { VerticalLine } from "../CreateAmount";

// Style
const Card = styled.section`
  width: 80%;
  height: 70vh;
  background-color: ${(props) => props.theme.weekColor.week_0};
  margin: auto;
  margin-top: ${space.middle};
  padding: ${space.middle};
  box-sizing: border-box;
  border-radius: ${borderRadius.small};

  h2 {
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.small};
    margin-bottom: ${space.basic};
    text-align: center;
  }

  ul {
    background-color: ${colorSet.white};
    height: 90%;
    border-radius: ${borderRadius.small};
    padding: ${space.middle};
    position: relative;
  }
`;

const List = styled.li`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: ${space.small};
  margin-bottom: 15px;
  border-bottom: 1px solid ${colorSet.lightGray};
  &:last-child {
    border: none;
  }
`;

const LoadingText = styled.h4`
  font-size: ${fontSize.title};
  font-family: ${font.eng};
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

// Interface
interface IProps {
  data: IData;
  type: string;
}

// Component
function DetailItem({ data, type }: IProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  // Go daily list
  const onGoDetailList = () => navigation(-1);

  const [pageData, setPageData] = useState({});

  // Put data into Object to be Rendered
  useEffect(() => {
    const lastDay =
      data.endDate && dayjs(data.endDate).format("YYYY년 M월 D일 A h시 mm분");
    if (data) {
      setPageData({
        날짜: dayjs(data.time).format("YYYY년 M월 D일 A h시 mm분"),
        마지막날: lastDay,
        출입금: data.amount,
        카테고리: data.category,
        지불수단: data.pay,
        내용: data.memo,
      });
    }
  }, [data]);

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
          <Header
            leftBtn={<button onClick={onGoDetailList}>돌아가기</button>}
            middleBtn={<button onClick={() => onEdit(data)}>수정</button>}
            rightBtn={<button onClick={() => onRemove(data)}>삭제</button>}
          />
          <Card>
            <h2>{data.title}</h2>
            <ul>
              <VerticalLine as={"li"} />
              {pageData &&
                Object.entries(pageData)
                  .filter(([_, value]) => value !== undefined)
                  .map(([objetKey, value]) => (
                    <List key={objetKey}>
                      <h3>{objetKey}</h3> <p>{String(value)}</p>
                    </List>
                  ))}
            </ul>
          </Card>
        </>
      ) : (
        <LoadingText>loading...</LoadingText>
      )}
    </>
  );
}

export default DetailItem;
