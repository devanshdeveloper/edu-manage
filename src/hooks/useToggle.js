import isThis from "@devanshdeveloper/is-this";
import { useState, useCallback } from "react";

function useToggle(initialValue = false, toggleValues = [false, true]) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(
    (value) => {
      if (value === state) return;
      if (isThis.isUndefined(value)) {
        setState((prev) => {
          console.log({prev});
          return prev === toggleValues[0] ? toggleValues[1] : toggleValues[0];
        });
      } else {
        setState(value);
      }
    },
    [toggleValues, useState]
  );

  return [state, toggle];
}

export default useToggle;
