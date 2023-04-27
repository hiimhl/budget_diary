// Render the detail data for the item
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IData,
  REMOVE_BUDGET,
  REMOVE_DIARY,
  REMOVE_SCHEDULE,
} from "../../store/actions-type";
import Header, { LeftRightBtn } from "../Header";
import dayjs from "dayjs";
import {
  borderRadius,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../../style-root";
import { VerticalLine } from "../CreateAmount";
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { imageUrl } from "../../util/image";

// Style
const Card = styled.section`
  width: 80%;
  height: 70vh;
  background-color: ${(props) => props.theme.weekColor.week_1};
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
  grid-template-columns: 27% 73%;
  padding: ${space.small} 0;
  margin-bottom: ${space.basic};
  border-bottom: 1px solid ${colorSet.lightGray};
  align-items: center;

  &:last-child {
    border: none;
  }

  h3 {
    text-align: center;
    font-weight: ${fontWeight.small};
  }
  p {
    margin-left: ${space.large};
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;

    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Emoji = styled.div`
  background-color: ${colorSet.emoji};
  border-radius: 50%;
  width: ${space.mark};
  height: ${space.mark};
  margin-left: ${space.large};

  img {
    width: ${space.mark};
    filter: invert(47%) sepia(7%) saturate(0%) hue-rotate(192deg)
      brightness(94%) contrast(89%);
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
  hiddenLogo?: boolean;
}

// Component
function DetailItem({ data, type, hiddenLogo }: IProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  // Go daily list
  const onGoDetailList = () => navigation(-1);

  const [pageData, setPageData] = useState({});

  // Put data into Object to be Rendered
  useEffect(() => {
    if (data) {
      const lastDay = //
        data.endDate && dayjs(data.endDate).format("YYYY년 M월 D일 A h:mm");
      const amountKey = data.amount! > 0 ? "수입금" : "지출금";
      const positiveAndLocalize =
        Math.abs(data.amount!).toLocaleString("ko-KR") + "원";

      setPageData({
        날짜: dayjs(data.time).format("YYYY년 M월 D일 A h:mm"),
        마지막날: lastDay,
        [amountKey]: data.amount && positiveAndLocalize,
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
            leftBtn={
              <LeftRightBtn onClick={onGoDetailList}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LeftRightBtn>
            }
            middleBtn={<button onClick={() => onEdit(data)}>수정</button>}
            rightBtn={<button onClick={() => onRemove(data)}>삭제</button>}
            hiddenLogo={hiddenLogo}
          />
          <Card>
            <h2>{data.title}</h2>
            <ul>
              <VerticalLine as={"li"} />
              {data.emoji && (
                <List>
                  <h3>오늘의 기분</h3>
                  <Emoji>
                    <img src={`${imageUrl}${data.emoji}.svg`} />
                  </Emoji>
                </List>
              )}
              {pageData &&
                Object.entries(pageData)
                  .filter(([_, value]) => value !== undefined) // _ = not used
                  .map(([objetKey, value]) => (
                    <List key={objetKey}>
                      <h3>{objetKey}</h3>
                      <p>{String(value)}</p>
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
