import { RefObject, useCallback, useEffect, useState } from 'react';

interface Props {
  ref: RefObject<HTMLElement>;
  defaultPadding: number;
}

function useDynamicPadding({ ref, defaultPadding }: Props) {
  const [left, setLeft] = useState<number>(defaultPadding);
  const [right, setRight] = useState<number>(defaultPadding);

  const scrollHandler = useCallback(() => {
    if (!ref.current) return;
    const leftDistance = ref.current.scrollLeft;
    const rightDistance =
      ref.current.scrollWidth - leftDistance - ref.current.clientWidth;
    setLeft(leftDistance <= defaultPadding ? defaultPadding - leftDistance : 0);
    setRight(
      rightDistance <= defaultPadding ? defaultPadding - rightDistance : 0,
    );
  }, [defaultPadding, ref]);

  useEffect(() => {
    if (!ref.current) return;
    const refElement = ref.current;
    refElement.addEventListener('scroll', scrollHandler);

    return () => {
      refElement.removeEventListener('scroll', scrollHandler);
    };
  }, [defaultPadding, ref, scrollHandler]);

  return [left, right] as [typeof left, typeof right];
}

export default useDynamicPadding;
