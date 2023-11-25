import { RefObject, useCallback, useEffect } from 'react';

function useHorizontalScroll(ref: RefObject<HTMLElement>) {
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      ref.current!.scrollLeft += event.deltaY;
    },
    [ref],
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current;
    element.addEventListener('wheel', handleWheel);
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel, ref]);
}

export default useHorizontalScroll;
