// Login page
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Wrapper } from "../routes/Home";
import { fontSize, space } from "../style-root";
import Header from "./Header";

// Style
const FormCard = styled.div`
  margin: auto;
  width: 60%;
  align-items: center;
  text-align: center;

  div {
    margin-bottom: ${space.large};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${space.basic};

    input {
      padding: ${space.micro};
    }

    input:last-child {
      margin-top: ${space.small};
    }
  }
`;

const LoginButton = styled.button<{ isLogin: string }>`
  color: ${(props) => props.isLogin};
  font-size: ${fontSize.large};
  margin: 0 ${space.basic};
`;

// Interface
interface IForm {
  userId: string;
  password: string;
}

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IForm>();

  const onSubmit = () => {
    console.log(watch());
  };

  const onToggleLog = (data: boolean) => setIsLogin(data);

  return (
    <Wrapper>
      <Header />
      <FormCard>
        <div>
          <LoginButton
            isLogin={isLogin ? "gray" : "black"}
            onClick={() => onToggleLog(false)}
          >
            회원가입
          </LoginButton>
          <LoginButton
            isLogin={isLogin ? "black" : "gray"}
            onClick={() => onToggleLog(true)}
          >
            로그인
          </LoginButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userId">아이디 :</label>
          <input id="userId" type={"text"} {...register("userId")} />
          <label htmlFor="password">비밀번호 :</label>
          <input id="password" type={"password"} {...register("password")} />
          <input type={"submit"} value="로그인" />
        </form>
      </FormCard>
    </Wrapper>
  );
}

export default Login;
