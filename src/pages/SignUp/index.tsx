import { useNavigate } from "react-router-dom";
import "./index.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Register } from "../../types";
import { register } from "../../apis";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Horror",
  "Romance",
  "SF",
  "Thriller",
  "Animation",
];

const ottList = [
  "Netflix",
  "Disney+",
  "Amazon Prime Video",
  "Apple TV+",
  "Hulu",
];

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Register>({
    username: "",
    password: "",
    name: "",
    email: "",
    birth: "",
    favorite_genre: "",
    subscript_ott: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.id as keyof Register;
    const value = e.target.value;
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(form);
    if (response) {
      alert("회원가입에 성공하였습니다.");
      navigate("/login");
    } else {
      alert("문제가 발생하였습니다.");
    }
  };

  return (
    <main className="page bg-primary">
      <form className="signup-box" onSubmit={onSubmit}>
        <h1>OTT 검색 서비스</h1>
        <h3>회원가입</h3>
        <div className="signup-input-wrapper">
          <label htmlFor="username">ID</label>
          <input id="username" type="text" required onChange={onChange} />
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="password">PW</label>
          <input id="password" type="password" required onChange={onChange} />
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required onChange={onChange} />
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required onChange={onChange} />
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="birth">Birth</label>
          <input id="birth" type="date" required onChange={onChange} />
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="favorite_genre">Genre</label>
          <select
            id="favorite_genre"
            defaultValue=""
            required
            onChange={onChange}
          >
            <>
              <option value="" disabled>
                장르를 선택해주세요
              </option>
              {genres.map((genre) => (
                <option value={genre}>{genre}</option>
              ))}
            </>
          </select>
        </div>
        <div className="signup-input-wrapper">
          <label htmlFor="subscript_ott">OTT</label>
          <select
            id="subscript_ott"
            defaultValue=""
            required
            onChange={onChange}
          >
            <>
              <option value="" disabled>
                OTT를 선택해주세요
              </option>
              {ottList.map((ott) => (
                <option value={ott}>{ott}</option>
              ))}
            </>
          </select>
        </div>
        <button type="submit" className="login-btn">
          회원가입
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
