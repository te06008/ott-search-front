import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      alert("로그인 후 이용해 주세요.");
      navigate("/login");
    }
  }, [navigate]);
  return (
    <main className="page bg-secondary">
      <Outlet />
    </main>
  );
}

export default Main;
