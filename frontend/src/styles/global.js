import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    font-family: "Archivo Narrow", sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: inline-flex;
    justify-content: center;
    background-color:rgb(190, 190, 190);
  }
`;

export default Global;