import { useNavigate } from "react-router-dom";
import "./index.scss";
import SearchBar from "../../components/SearchBar";
import Slider from "../../components/Slider";
import useLogout from "../../hooks/useLogout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RecommendList, User } from "../../types";
import Loader from "../../components/Loader";
import { recommend } from "../../apis";

function HomePage() {
  const navigate = useNavigate();
  const [onLogout] = useLogout();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [movies, setMovies] = useState<RecommendList>([]);
  const user = useMemo(
    () => JSON.parse(sessionStorage.getItem("user")!) as User,
    []
  );

  const getRecommendList = useCallback(async () => {
    const response = await recommend({
      genre: user.favorite_genre,
      limit: "10",
    });
    setMovies(response ? response : []);
    setLoaded(true);
  }, [user]);

  useEffect(() => {
    getRecommendList();
  }, [getRecommendList]);

  return (
    <div className="home-view">
      <div className="text-wrapper">
        <h1 onClick={() => navigate("/service/home")}>OTT 검색 서비스</h1>
        <button className="logout-btn" onClick={onLogout}>
          로그아웃
        </button>
      </div>
      <SearchBar />
      {loaded ? (
        <Slider title="회원님을 위한 추천목록" images={movies} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default HomePage;
