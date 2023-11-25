import { RefObject, useEffect, useRef } from 'react';

function useDraggableScroll(ref: RefObject<HTMLElement>) {
  const dragData = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const slider = ref.current;
    let { isDown, startX, scrollLeft } = dragData.current;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.scrollBehavior = 'auto';
    };
    const handleMouseLeave = (e: MouseEvent) => {
      isDown = false;
      slider.style.scrollBehavior = 'smooth';
    };
    const handleMouseUp = (e: MouseEvent) => {
      isDown = false;
      slider.style.scrollBehavior = 'smooth';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);
}

export default useDraggableScroll;
