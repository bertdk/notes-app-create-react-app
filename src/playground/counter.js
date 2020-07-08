import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

const App = (props) => {
  // State doesn't need to be an object in functional components <> state in class base components
  // You can call useState multiple times in an object
  // SetState will override the state, not mergin
  const [count, setCount] = useState(props.initCount);
  const [text, setText] = useState("");

  // useEffect(() => {
  //   document.title = count
  // });

  useEffect(() => {
    document.title = count;
    console.log("Use effect ran");
  }, [count]);

  useEffect(() => {
    console.log("Use effect ran once");
  }, []);

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.initCount)}>reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

App.defaultProps = { initCount: 0 };
