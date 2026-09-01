import React, { useEffect, useRef } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: Event) => void
) => {
  // Guardar el callback en un ref evita re-registrar los listeners en cada render
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (event: Event) => {
      // DO NOTHING if the element being clicked is the target element or their children
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      callbackRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
};
