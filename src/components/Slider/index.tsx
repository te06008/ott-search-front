import { useRef } from "react";
import "./index.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import useDraggableScroll from "../../hooks/useDraggableScroll";
import useDynamicPadding from "../../hooks/useDynamicPadding";
import { useNavigate } from "react-router-dom";
import { RecommendList } from "../../types";

interface Props {
  title: string;
  images: RecommendList;
}

function Slider({ title, images }: Props) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useHorizontalScroll(ref);
  useDraggableScroll(ref);
  const [left, right] = useDynamicPadding({ ref: ref, defaultPadding: 40 });

  const onNavigationClick = (direction: "backward" | "forward") => {
    if (!ref.current) return;
    const currentScroll = ref.current.scrollLeft;
    const scrollAmount = ref.current.clientWidth * 0.8;
    switch (direction) {
      case "forward":
        ref.current.scrollLeft = currentScroll + scrollAmount;
        break;
      case "backward":
        ref.current.scrollLeft = currentScroll - scrollAmount;
        break;
    }
  };

  if (!images.length) {
    return (
      <div className="slider-container">
        <h3>추천 목록이 존재하지 않습니다.</h3>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <div className="slider-title">{title}</div>
      <div
        className="slider-wrapper"
        ref={ref}
        style={{ paddingLeft: left + "px", paddingRight: right + "px" }}
      >
        <div className="navigation-btn left">
          <IoIosArrowBack
            className="navigation-icon"
            onMouseUp={(e) => {
              e.stopPropagation();
              onNavigationClick("backward");
            }}
          />
        </div>
        {images.map((image, key) => (
          <div
            className="img-container"
            onClick={() => navigate(`/service/detail/${image.title}`)}
          >
            <img
              key={key}
              src={image.poster_location}
              alt="이미지를 불러오지 못했습니다"
              draggable={false}
            />
          </div>
        ))}
        <div className="navigation-btn right">
          <IoIosArrowForward
            className="navigation-icon"
            onMouseUp={(e) => {
              e.stopPropagation();
              onNavigationClick("forward");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
