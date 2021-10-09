import React, { FC } from "react";
import MyCounter from "./counter";

import createComponent from "./conversionComponent";

interface PropCounter {
  max?: number;
  min?: number;
  onMyChange?: (e: { detail: { value: number } }) => void;
}
const Counter: FC<PropCounter> = createComponent(
  React,
  "my-counter",
  MyCounter,
  {
    onMyChange: "myChange",
  }
);

export { Counter };
