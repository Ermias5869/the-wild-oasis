import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listnCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function onHandleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", onHandleClick, listnCapturing);
      return () => document.removeEventListener("click", onHandleClick);
    },
    [handler, listnCapturing]
  );
  return { ref };
}
