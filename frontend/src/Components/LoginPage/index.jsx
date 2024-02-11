import { useRef, useState } from "react";
import { login, signup } from "../../Services/backend";
import { useUser } from "../../Context/User";

import Loading from "../Common/Loading";

function LoginPage() {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();
  const signupName = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const { setUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    const response = await login(
      loginEmail.current.value,
      loginPassword.current.value
    );
    setLoading(false);
    if (response instanceof Error) return alert(response.message);
    setUser(response);
  };

  const handleSignup = async () => {
    setLoading(true);
    const response = await signup(
      signupName.current.value,
      signupEmail.current.value,
      signupPassword.current.value
    );
    setLoading(false);
    if (response instanceof Error) return alert(response.message);
    setUser(response);
  };

  return (
    <div
      className={`login flex flex-col justify-center items-center gap-8 h-screen bg-[url(./Assets/background.svg)] bg-no-repeat bg-cover bg-center ${
        animate ? "signup-animate" : "login-animate"
      }`}
    >
      <h1
        className="flex justify-center items-center text-3xl text-[--primary-color]"
        data-side="even"
      >
        <div className="absolute">Welcome, back</div>
        <div>Let's get started</div>
      </h1>
      <div className="flex justify-center items-center" data-side="odd">
        <input
          className="absolute"
          type="email"
          placeholder="email"
          ref={loginEmail}
        />
        <input type="text" placeholder="name" ref={signupName} />
      </div>
      <div className="flex justify-center items-center" data-side="even">
        <input
          type="password"
          placeholder="password"
          className="absolute"
          ref={loginPassword}
        />
        <input type="email" placeholder="email" ref={signupEmail} />
      </div>
      <div className="flex justify-center items-center" data-side="odd">
        <input type="password" placeholder="password" ref={signupPassword} />
      </div>
      <div className="flex justify-center items-center" data-side="odd">
        <button
          type="submit"
          onClick={handleLogin}
          className="absolute bg-[--primary-color] text-white rounded-[10px] py-3 px-10 cursor-pointer"
        >
          Login
        </button>
        <button
          type="submit"
          onClick={handleSignup}
          className="bg-[--primary-color] text-white rounded-[10px] py-3 px-10 cursor-pointer"
        >
          Signup
        </button>
      </div>
      <div className="flex justify-center items-center" data-side="even">
        <div className="absolute">
          don't have an account&nbsp;
          <button
            className="text-[--primary-color] disabled:opacity-50"
            onClick={() => setAnimate(!animate)}
            disabled={loading}
          >
            Signup
          </button>
        </div>
        <div>
          Already have an account&nbsp;
          <button
            className="text-[--primary-color] disabled:opacity-50"
            onClick={() => setAnimate(!animate)}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default LoginPage;
