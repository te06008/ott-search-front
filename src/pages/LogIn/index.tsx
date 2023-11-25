import { ChangeEvent, FormEvent, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Login } from "../../types";
import { login } from "../../apis";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Login>({
    username: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as keyof Login;
    const value = e.target.value;
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(form);
    if (response) {
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate("/service");
    } else {
      alert("로그인에 실패하였습니다.");
    }
  };

  const onSignup = () => {
    navigate("/signup");
  };

  return (
    <main className="page bg-primary">
      <form className="login-box" onSubmit={onLogin}>
        <h1>OTT 검색 서비스</h1>
        <h3>로그인</h3>
        <div className="login-input-wrapper">
          <label htmlFor="username">ID</label>
          <input required id="username" type="text" onChange={onChange} />
        </div>
        <div className="login-input-wrapper">
          <label htmlFor="password">PW</label>
          <input required id="password" type="password" onChange={onChange} />
        </div>
        <div className="btn-wrapper">
          <button type="button" className="login-btn" onClick={onSignup}>
            회원가입
          </button>
          <button type="submit" className="login-btn">
            로그인
          </button>
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
