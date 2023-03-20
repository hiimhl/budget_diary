import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    cardColor: string;
    pointColor: string;
    isDark?: boolean;
    weekColor: {
      week_0: string;
      week_1: string;
      week_2: string;
      week_3: string;
      week_4: string;
      week_5: string;
      week_6: string;
    };
  }
}
