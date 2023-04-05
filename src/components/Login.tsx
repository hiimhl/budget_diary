// Login page
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Wrapper } from "../routes/Home";
import {
  borderRadius,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import Header from "./Header";

// Firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { getAuthData } from "../my-firebase";
import { useNavigate } from "react-router-dom";

// Style
const FormCard = styled.div<{ isValid: boolean }>`
  margin: auto;
  width: 60%;
  align-items: center;
  text-align: center;

  h2 {
    font-size: ${fontSize.title};
    font-weight: ${fontWeight.title};
    margin-bottom: ${space.large};
    font-family: Arial, Helvetica, sans-serif;
  }

  div {
    margin-bottom: ${space.large};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${space.basic};

    input {
      padding: ${space.button};
      border: 1px solid ${colorSet.gray};
      border-radius: ${borderRadius.small};
    }

    input[type="submit"] {
      margin-top: ${space.small};
      padding: ${space.button} 0;
      background-color: ${(props) => props.theme.pointColor};
      color: ${colorSet.white};
      border-radius: ${borderRadius.small};
      font-size: ${fontSize.basic};
      font-weight: ${fontWeight.title};
      border: 1px solid ${colorSet.gray};
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    input[type="submit"]:hover {
      background-color: ${(props) => props.theme.weekColor.week_2};
      color: ${colorSet.darkGray};
    }

    label {
      text-align: start;
    }

    /* input - Error or 입력시 강조 */
    input:focus {
      outline: none;
      border-color: ${(props) => (props.isValid ? "black" : colorSet.red)};
    }

    /* Error Message */
    p {
      grid-column: 2/3;
      color: ${colorSet.red};
      font-weight: ${fontWeight.small};
      line-height: 1.6;
    }
  }
`;

const AccountBtn = styled.button`
  font-size: ${fontSize.basic};
  float: left;
  padding: 0;
  border-bottom: 2px solid ${colorSet.gray};
  color: ${colorSet.darkGray};
  font-weight: ${fontWeight.title};
`;

// Google and Github Login button
const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: ${space.small};
  margin-top: ${space.middle};
  text-align: center;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid ${colorSet.gray};
    background-color: ${(props) => props.theme.weekColor.week_2};
    color: ${colorSet.darkGray};
    border-radius: ${borderRadius.micro};
    padding: ${space.button};
    font-size: ${fontSize.basic};
    font-family: ${font.eng};
    transition: background-color 0.3s ease, color 0.3s ease;

    svg {
      transition: fill 0.3s ease;
      margin-right: ${space.basic};
      fill: ${colorSet.darkGray};
      width: ${space.middle};
    }
  }

  button:hover {
    background-color: ${(props) => props.theme.pointColor};
    color: ${colorSet.white};
    svg {
      fill: ${colorSet.white};
    }
  }
`;

// Interface
interface IForm {
  userId: string;
  password: string;
}

function Login() {
  const [newAccount, setNewAccount] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IForm>();

  const navigation = useNavigate();

  // Creact Account or Login
  const onSubmit = async (data: IForm) => {
    try {
      let sendData;
      setAuthError("");

      if (newAccount) {
        // create account && Log in
        sendData = await createUserWithEmailAndPassword(
          getAuthData,
          data.userId,
          data.password
        );
        navigation("/");
        setIsLoggedIn(true);
      } else {
        // log in
        sendData = await signInWithEmailAndPassword(
          getAuthData,
          data.userId,
          data.password
        );
        navigation("/");
        setIsLoggedIn(true);
      }
    } catch (error) {
      setAuthError("Error, 다시 입력해주세요");
    }

    reset();
  };

  const onToggleLog = () => setNewAccount((prev) => !prev);

  // Social login
  const onSocialLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    let provider =
      id === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();

    await signInWithPopup(getAuth(), provider);
    navigation("/");
    setIsLoggedIn(true);
  };

  return (
    <Wrapper>
      <Header isLogout={isLoggedIn} />
      <FormCard isValid={isValid}>
        <h2>{newAccount ? "로그인" : "회원가입"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userId">아이디</label>
          <input
            id="userId"
            type={"text"}
            required
            placeholder="example@gmail.com"
            {...register("userId", {
              pattern: {
                value: /@/,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
          />
          <p>{errors?.userId?.message}</p>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type={"password"}
            required
            {...register("password", {
              minLength: {
                value: 6,
                message: "6글자 이상 입력해주세요",
              },
            })}
          />
          <p>{errors?.password?.message}</p>
          {authError && <p>{authError}</p>}
          <input type={"submit"} value="로그인" />
        </form>
        <Buttons>
          <button id="google" onClick={onSocialLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            Google
          </button>
          <button id="github" onClick={onSocialLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
            Github
          </button>
        </Buttons>
        <AccountBtn onClick={onToggleLog}>
          {newAccount ? "회원가입 " : "로그인 "}
          <FontAwesomeIcon icon={faArrowRightLong} />
        </AccountBtn>
      </FormCard>
    </Wrapper>
  );
}

export default Login;
