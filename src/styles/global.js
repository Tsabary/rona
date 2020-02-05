import { createGlobalStyle } from "styled-components";
import "./styles.scss";

export const Global = createGlobalStyle`
   :root {
    --font-main: GilroyLight;
    --font-main-bold: GilroyBold;

    --color-main: #AB2087;
    --color-main-dark: #991b77;
    --color-main-transparent: rgba(171, 33, 134, 0.1);

    --color-grey-very-light: #ededed;
    --color-grey-light: #d1d1d1;
    --color-grey-medium: #ababab;
    --color-grey-dark: #1E1C00;

    --color-gradient: linear-gradient(var(--color-main), var(--color-main-dark));
  }
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  } 

  html {
      font-size : 62.5%;
      @media only screen and (max-width: 1100px) {
        font-size : 50%;
      }
  }

  body {
    font-family: GilroyLight;
    font-size : 1.8rem
  }
`;

export default Global;
