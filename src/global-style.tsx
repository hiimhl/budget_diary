import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
menu, ol, ul {
  list-style: none;
}
* {
  box-sizing: border-box;
}
body {
  font-family:${(props) => props.theme.font.kor};
  background-color: ${(props) => props.theme.backgroundColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color:inherit;
}
`;
