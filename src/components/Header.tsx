import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorSet, font, fontSize, fontWeight, space } from "../style-root";

const Wrapper = styled.header`
  width: 650px;
  margin: auto;
  height: 11vh;
  font-family: ${font.eng};

  /* Tablet */
  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  nav {
    border-bottom: 2px dashed ${(props) => props.theme.pointColor};
    display: flex;
    align-items: center;
    padding: ${space.basic} ${space.middle};
    justify-content: space-between;
    font-size: 25px;
    span {
      cursor: pointer;
    }

    /* User Menu */
    button {
      font-size: ${fontSize.large};
    }
  }
`;

const Children = styled.div`
  padding: 15px 10%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  button {
    font-weight: ${fontWeight.title};
    font-size: ${fontSize.basic};
  }

  /* Previous and Next button */
  .leftRightBtn {
    color: ${colorSet.darkGray};
    font-size: ${fontSize.large};
  }
`;

// Interface
interface IProps {
  leftBtn?: ReactNode | string;
  middleBtn?: ReactNode | string;
  rightBtn?: ReactNode | string;
}

// Component
function Header({ leftBtn, middleBtn, rightBtn }: IProps) {
  const navigation = useNavigate();

  // Go to Home
  const onLogo = () => navigation("/");
  const onUserPage = () => navigation("/user");
  return (
    <Wrapper>
      <nav>
        <span onClick={onLogo}>logo</span>
        <button onClick={onUserPage}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </nav>
      <Children>
        <span>{leftBtn}</span>
        <span>{middleBtn}</span>
        <span>{rightBtn}</span>
      </Children>
    </Wrapper>
  );
}

export default Header;
