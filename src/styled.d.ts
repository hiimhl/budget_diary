import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    pointColor: string;
    font: {
      eng: string;
      kor: string;
    };
  }
}
