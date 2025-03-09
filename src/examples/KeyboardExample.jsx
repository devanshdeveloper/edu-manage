import React from "react";
import useKeyboard from "../hooks/useKeyboard";

function KeyboardExample() {
  useKeyboard([
    ["mod+J", () => console.log("Toggle color scheme")],
    ["ctrl+K", () => console.log("Trigger search")],
    ["alt+mod+shift+X", () => console.log("Rick roll")],
  ]);

  return <div>KeyboardExample</div>;
}

export default KeyboardExample;
