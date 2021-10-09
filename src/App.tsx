import React, { useState } from "react";
import { Counter } from "./components";

function App() {
  const [num, setNum] = useState<number>(0);
  return (
    <div>
      <h1>Destiny__ {num}</h1>
      <Counter
        onMyChange={(e) => {
          console.log("App -> e", e.detail.value);
          setNum(e.detail.value);
        }}
        max={10}
        min={-10}
      ></Counter>
    </div>
  );
}

export default App;
