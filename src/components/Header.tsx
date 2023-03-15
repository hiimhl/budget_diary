import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { font, fontWeight } from "../style-root";

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
    padding: 15px;
    justify-content: space-between;
    font-size: 25px;
    span {
      cursor: pointer;
    }
  }
  div {
    padding: 15px 10%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    button {
      font-size: 16px;
      font-weight: ${fontWeight.title};
    }
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
  return (
    <Wrapper>
      <nav>
        <span onClick={onLogo}>logo</span>
        <button>Menu</button>
      </nav>
      <div>
        <span>{leftBtn}</span>
        <span>{middleBtn}</span>
        <span>{rightBtn}</span>
      </div>
    </Wrapper>
  );
}

export default Header;
