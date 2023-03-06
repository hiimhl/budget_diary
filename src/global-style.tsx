import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { font } from "./style-root";

export const GlobalStyle = createGlobalStyle`
${reset}
menu, ol, ul {
  list-style: none;
}
* {
  box-sizing: border-box;
}
body {
  font-family:${font.kor};
  background-color: ${(props) => props.theme.backgroundColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color:inherit;
}
`;
