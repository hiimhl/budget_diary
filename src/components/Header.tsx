import {
  faAngleDown,
  faAngleUp,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RESET_DATA, SET_THEME } from "../store/actions-type";
import {
  borderRadius,
  boxShadow,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import { getAuthData } from "../my-firebase";
import { userInfo } from "../store/database";

const Wrapper = styled.header`
  width: 650px;
  margin: auto;
  height: 11vh;
  font-family: ${font.eng};
  margin-bottom: ${space.small};

  /* Tablet */
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Navbar = styled.nav`
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

const Children = styled.div<{ removeBorder: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSize.large};
  border-top: 1px ${(props) => props.theme.weekColor.week_3} solid;
  border-bottom: ${(props) =>
    props.removeBorder ? `1px ${props.theme.weekColor.week_3} solid` : "none"};

  /* children - buttons and text */
  span {
    padding: ${space.button} 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  span:nth-child(2) {
    justify-content: center;
    border-left: ${(props) =>
      props.removeBorder
        ? `1px ${props.theme.weekColor.week_3} solid`
        : "none"};
    border-right: ${(props) =>
      props.removeBorder
        ? `1px ${props.theme.weekColor.week_3} solid`
        : "none"};
  }

  button {
    font-weight: ${fontWeight.title};
    font-size: ${fontSize.basic};
  }
`;

const Menu = styled.aside`
  position: absolute;
  top: 5vh;
  right: 0;
  height: 95vh;
  width: 25%;
  background-color: ${colorSet.white};
  font-size: ${fontSize.large};
  z-index: 10000;
  box-shadow: ${boxShadow.small};
  font-family: ${font.kor};
  font-weight: ${fontWeight.small};

  div {
    cursor: pointer;
    padding: ${space.micro};
    margin: ${space.small};
    margin-left: ${space.middle};

    /* Angle down, up Icon */
    svg {
      margin-left: ${space.xlarge};
      font-size: ${fontSize.basic};
      color: ${colorSet.gray};
    }
  }
  div:hover {
    text-decoration: underline;
  }

  /* mobile */
  @media (max-width: 768px) {
    div {
      margin-left: ${space.small};

      svg {
        margin-left: ${space.small};
      }
    }
  }
`;

const Theme = styled.ul`
  padding: 3px 0;

  li {
    font-size: ${fontSize.basic};
    border-radius: ${borderRadius.small};
    width: 50%;
    cursor: pointer;
    padding: ${space.micro};
    margin: ${space.small};
    margin-left: ${space.large};
    box-sizing: border-box;
    border: 1px solid ${colorSet.gray};
    transition: border 0.3s ease;
  }

  /* Theme buttons */
  #GREEN {
    color: #95d5b2;
  }
  #GREEN:hover {
    border-color: #95d5b2;
  }
  #BLUE {
    color: #9fbaf9;
  }
  #BLUE:hover {
    border-color: #9fbaf9;
  }
  #ROSE {
    color: #ff8fa0;
  }
  #ROSE:hover {
    border-color: #ff8fa0;
  }
  #RAINBOW {
    color: #ffba82;
  }
  #RAINBOW:hover {
    border-color: #ffba82;
  }
  #VIVID {
    color: #deaaff;
  }
  #VIVID:hover {
    border-color: #deaaff;
  }

  /* mobile */
  @media (max-width: 768px) {
    li {
      margin-left: ${space.middle};
    }
  }
`;

const UserName = styled.div`
  cursor: default;
  text-decoration: none;
  color: ${(props) => props.theme.pointColor};
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

  const propIsExist = leftBtn || middleBtn || rightBtn ? true : false;

  const onLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      //Log out - firebase
      getAuthData.signOut();
      navigation("/");
      // menu logout -> login
      setIsLoggin((prev) => !prev);
      userInfo.uid = null;
      dispatch({ type: RESET_DATA });
    }
  };

  // Set Theme
  const onTheme = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    dispatch({ type: SET_THEME, data: { theme: id } });
    setIsThemeClicked(false);
    setToggleMenu(false);
  };

  // Check if user login or out
  useEffect(() => {
    getAuthData.onAuthStateChanged((user) =>
      user ? setIsLoggin(true) : setIsLoggin(false)
    );
  }, []);

  return (
    <Wrapper>
      <Navbar>
        <span onClick={onGoHome}>Logo</span>
        <button onClick={onMenuToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {toggleMenu && (
          <Menu>
            {userInfo.uid && (
              <UserName>{userInfo.displayName || "user"}'s Book</UserName>
            )}
            <div onClick={onGoHome}>홈</div>
            {isLoggin ? (
              <div onClick={onLogout}>로그아웃</div>
            ) : (
              <div onClick={onGoLoginPage}>로그인</div>
            )}
            <div onClick={onGoAddPage}>추가하기</div>
            <div onClick={onThemeToggle}>
              테마
              <FontAwesomeIcon
                icon={isThemeClicked ? faAngleUp : faAngleDown}
              />
            </div>
            {isThemeClicked && (
              <Theme>
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
                  퍼플
                </li>
              </Theme>
            )}
          </Menu>
        )}
      </Navbar>
      <Children removeBorder={propIsExist}>
        <span>{leftBtn}</span>
        <span>{middleBtn}</span>
        <span>{rightBtn}</span>
      </Children>
    </Wrapper>
  );
}

export default React.memo(Header);
