import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SET_THEME } from "../store";
import {
  boxShadow,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../style-root";

const Wrapper = styled.header`
  width: 650px;
  margin: auto;
  height: 11vh;
  font-family: ${font.eng};

  /* Tablet */
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Navbar = styled.nav`
  border-bottom: 2px dashed ${(props) => props.theme.pointColor};
  display: flex;
  align-items: center;
  padding: ${space.basic} ${space.middle};
  justify-content: space-between;
  font-size: ${fontSize.title};
  position: relative;

  span {
    cursor: pointer;
  }

  /* User Menu */
  button {
    font-size: ${fontSize.week};
  }
`;

const Children = styled.div`
  padding: ${space.basic} 10%;
  display: flex;
  justify-content: space-between;
  font-size: ${fontSize.large};

  button {
    font-weight: ${fontWeight.title};
    font-size: ${fontSize.basic};
  }
`;

const Menu = styled.aside<{ toggleMenu: boolean }>`
  position: absolute;
  display: ${(props) => (props.toggleMenu ? "block" : "none")};
  top: 5vh;
  right: 0;
  height: 95vh;
  width: 25%;
  background-color: ${colorSet.white};
  font-size: ${fontSize.large};
  z-index: 1;
  box-shadow: ${boxShadow.small};
  font-family: ${font.kor};
  font-weight: ${fontWeight.small};

  div {
    cursor: pointer;
    padding: 5px;
    margin: 10px;
    margin-left: 20px;
  }
  div:hover {
    text-decoration: underline;
  }
`;

const Theme = styled.ul<{ isThemeClicked: boolean }>`
  display: ${(props) => (props.isThemeClicked ? "block" : "none")};
  background-color: ${colorSet.veryLightGray};
  padding: 3px 0;

  li {
    font-size: ${fontSize.basic};
    cursor: pointer;
    padding: 5px;
    margin: 10px;
    margin-left: 30px;
    border: 2px solid transparent;
    box-sizing: border-box;
  }
  #GREEN {
    color: green;
  }
  #GREEN:hover {
    border-color: green;
  }
`;

/* Previous and Next button */
export const LeftRightBtn = styled.button`
  color: ${colorSet.gray};
  svg {
    font-size: ${fontSize.week};
  }
`;

// Interface
interface IProps {
  leftBtn?: ReactNode | string;
  middleBtn?: ReactNode | string;
  rightBtn?: ReactNode | string;
  isLogout?: boolean;
}

// Component
function Header({ leftBtn, middleBtn, rightBtn, isLogout }: IProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [isThemeClicked, setIsThemeClicked] = useState(false);
  // initial value of isLogout is undefined = False
  const [isLoggin, setIsLoggin] = useState(isLogout);

  const onMenuToggle = () => setToggleMenu((prev) => !prev);
  const onThemeToggle = () => setIsThemeClicked((prev) => !prev);

  const onGoHome = () => navigation("/");
  const onGoAddPage = () => navigation("/new");
  const onGoLoginPage = () => navigation("/login");
  const onLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      setIsLoggin((prev) => !prev);
    }
  };

  const onTheme = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { id } = e.currentTarget;

    const obj = {
      id,
      theme: id,
    };
    dispatch({ type: SET_THEME, data: obj });
  };

  return (
    <Wrapper>
      <Navbar>
        <span onClick={onGoHome}>logo</span>
        <button onClick={onMenuToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Menu toggleMenu={toggleMenu}>
          <div onClick={onGoHome}>홈</div>
          {isLoggin ? (
            <div onClick={onLogout}>로그아웃</div>
          ) : (
            <div onClick={onGoLoginPage}>로그인</div>
          )}
          <div onClick={onGoAddPage}>추가하기</div>
          <div onClick={onThemeToggle}>테마</div>
          <Theme isThemeClicked={isThemeClicked}>
            <li id="GREEN" onClick={onTheme}>
              그린
            </li>
            <li id="BLUE" onClick={onTheme}>
              블루
            </li>
            <li id="ROSE" onClick={onTheme}>
              레드
            </li>
            <li id="RAINBOW" onClick={onTheme}>
              레인보우
            </li>
            <li id="VIVID" onClick={onTheme}>
              비비드
            </li>
          </Theme>
        </Menu>
      </Navbar>
      <Children>
        <span>{leftBtn}</span>
        <span>{middleBtn}</span>
        <span>{rightBtn}</span>
      </Children>
    </Wrapper>
  );
}

export default Header;
