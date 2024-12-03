import { useCallback, useEffect, useRef, useState } from "react";
export const useDoubleClick = (
  onDoubleClick: () => void,
  onClick: () => void,
  delay: number = 300
) => {
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clickCount === 1) {
      // If there's a single click, set a timeout to wait for a potential second click
      timeoutRef.current = setTimeout(() => {
        setClickCount(0);
        onClick();
      }, delay);
    } else if (clickCount === 2) {
      // If there's a double click, clear the timeout and trigger the double click handler
      clearTimeout(timeoutRef.current!);
      setClickCount(0);
      onDoubleClick();
    }

    // Cleanup function to clear the timeout on component unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [clickCount, onClick, onDoubleClick, delay]);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return handleClick;
};
