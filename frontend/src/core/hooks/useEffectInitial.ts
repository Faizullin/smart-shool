import { useEffect, useRef } from "react";

export default function useEffectInitial(effect, deps) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return effect();
    else isMounted.current = true;
  }, deps);

  // reset on unmount; in React 18, components can mount again
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );
}
