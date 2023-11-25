import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const onLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };
  return [onLogout] as [typeof onLogout];
}

export default useLogout;
