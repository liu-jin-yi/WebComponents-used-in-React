import { css } from "lit";

export default css`
  .counter-container {
    box-sizing: border-box;
    width: 120px;
    height: 32px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  .button-left,
  .button-right {
    outline: none;
    border: 0;
    width: 31px;
    height: 30px;
    cursor: pointer;
    background-color: white;
  }
  .button-left {
    border-right: 1px solid #ccc;
  }
  .button-right {
    border-left: 1px solid #ccc;
  }
  .value-show {
    margin: 0;
    width: 50px;
    text-align: center;
  }
`;
