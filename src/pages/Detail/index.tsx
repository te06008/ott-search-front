import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import SearchBar from '../../components/SearchBar';
import useLogout from '../../hooks/useLogout';
import { useCallback, useEffect, useState } from 'react';
import { MovieInfo } from '../../types';
import { getInfo } from '../../apis';
import Loader from '../../components/Loader';

function Detail() {
  const navigate = useNavigate();
  const { title } = useParams();
  const [onLogout] = useLogout();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<MovieInfo>();

  const getDetail = useCallback(async () => {
    if (!title) {
      alert('잘못된 접근입니다.');
      navigate('service/home');
      return;
    }
    const response = await getInfo({ title: title });
    if (response === null) {
      alert('해당 영화가 존재하지 않습니다.');
      navigate('service/home');
    }
    setData(response!);
    setLoaded(true);
  }, [navigate, title]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  return loaded ? (
    <div className='detail-view'>
      <div className='text-wrapper'>
        <h1 onClick={() => navigate('/service/home')}>OTT 검색 서비스</h1>
        <button className='logout-btn' onClick={onLogout}>
          로그아웃
        </button>
      </div>
      <SearchBar />
      <div className='detail-div'>
        <img src={data!.poster_location} alt='이미지를 불러올수 없습니다' />
        <fieldset className='detail-info'>
          <legend>영화 정보</legend>
          <ul>
            <li>제목 : {data!.title}</li>
            <li>장르 : {data!.genre}</li>
            <li>{`상영시간 : ${data!.runtime}분`}</li>
            <li>감독 : {data!.director}</li>
            <li>OTT : {data!.ott_platforms}</li>
          </ul>
        </fieldset>
        <fieldset className='detail-info'>
          <legend>OTT 가격정보(최소비용)</legend>
          <ul>
            <li>Netflix : 5500원</li>
            <li>Disney+ : 9500원</li>
            <li>Amazon Prime Video : 19600원</li>
            <li>Apple TV+ : 6500원</li>
            <li>Hulu : 7800원</li>
          </ul>
        </fieldset>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Detail;
