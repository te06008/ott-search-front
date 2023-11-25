import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { MdHistory } from "react-icons/md";
import { IoIosClose, IoMdSearch } from "react-icons/io";

import "./index.scss";
import { useNavigate } from "react-router-dom";
import useSearchHistory from "../../hooks/useSearchHistory";

function SearchBar() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [histories, addHistory, removeHistory] = useSearchHistory();

  const reset = () => {
    setQuery("");
    setShowHistory(false);
    ref.current?.blur();
  };

  const onSearch = (keyword: string) => {
    if (!keyword) {
      alert("하나 이상의 검색어를 입력해주세요.");
      return;
    }
    reset();
    addHistory(keyword);
    navigate(`/service/detail/${keyword}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!showHistory) {
      setShowHistory(true);
    }
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      onSearch(query);
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (!ref.current || !(event.target instanceof Node)) return;
    setShowHistory(ref.current.contains(event.target));
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className={`search-bar ${showHistory && "active"}`}>
      <div className="search-wrapper">
        <label htmlFor="movieSearch">
          <IoMdSearch style={{ verticalAlign: "middle" }} />
        </label>
        <input
          value={query}
          placeholder="영화 제목 검색"
          id="movieSearch"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>
      {showHistory &&
        (histories.length ? (
          histories.slice(0, 8).map((history, key) => (
            <div
              key={key}
              className="auto-query"
              onClick={(e) => {
                e.stopPropagation();
                onSearch(history);
              }}
            >
              <MdHistory size="24px" color="gray" />
              {history}
              <IoIosClose
                className="icon-close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeHistory(key);
                }}
              />
            </div>
          ))
        ) : (
          <div className="none-history">검색 기록이 없습니다</div>
        ))}
    </div>
  );
}

export default SearchBar;
