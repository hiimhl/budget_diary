import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    cardColor: string;
    pointColor: string;
    boxShadow: string;
    font: {
      eng: string;
      kor: string;
    };
  }
}
