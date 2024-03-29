import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { font } from "./style-root";

export const GlobalStyle = createGlobalStyle`
${reset}
menu, ol, ul,li {
  list-style: none;
}
button{
  background-color: transparent;
  border:none;
  cursor: pointer;
}
* {
  box-sizing: border-box;
}
body {
  font-family:${font.kor};
  background-color: ${(props) => props.theme.backgroundColor};
  color:${(props) => props.theme.textColor};
  /* Prevnet Drag */
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
a {
  text-decoration:none;
  color:inherit;
}
`;
