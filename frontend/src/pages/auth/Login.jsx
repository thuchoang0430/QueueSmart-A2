import { useNavigate, useSearchParams } from "react-router-dom";
import loginImage from "../../assets/register_login_image.png";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserPlus,
  FaCheck,
  FaGoogle,
  FaFacebookF,
  FaClock,
  FaBell,
  FaChartLine,
  FaEye,
} from "react-icons/fa";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function switchToRegister(e) {
    e.preventDefault();
    navigate("/register");
  }
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const user = login(email, password);
    if (!user) {
      setError("Invalid email or password");
      return;
    }
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex justify-center py-5 bg-white-50">
      {/* this is the leftside of login */}
      <div className="grid grid-cols-[0.9fr_1.1fr] border border-slate-200 rounded-2xl px-10 py-7 shadow-lg bg-slate-50 gap-5">
        <div className="flex  flex-col w-full justify-between">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-100 px-3 py-3 rounded-full text-blue-600 text-4xl font-bold shadow-sm">
                  Q
                </span>
                <div className="flex gap-1 text-3xl font-bold">
                  <p>Queue</p>
                  <p className="text-blue-600">Smart</p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold">
                <p>Smart Queues</p>
                <p className="text-blue-600">Better Experience</p>
              </div>
              <div className="mt-10">
                <p className="text-slate-600">
                  QueueSmart help you wait less and live more. Join now and
                  experience smarter queuing
                </p>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start overflow-hidden rounded-3xl">
                <img
                  src={loginImage}
                  alt="QueueSmart register"
                  className="w-full max-w-[560px] object-contain mix-blend-multiply opacity-95"
                />
              </div>
            </div>
            <div className="space-y-3 mt-5">
              <div className="flex gap-3 ">
                <FaClock className="w-12 h-12 text-blue-600 bg-sky-200 px-2 py-2 rounded-2xl" />
                <div className="text-slate-600">
                  <p className="font-bold">Save Time</p>
                  <p>Skip the line and save valueable time</p>
                </div>
              </div>
              <div className="flex gap-3 ">
                <FaBell className="w-12 h-12 text-blue-600 bg-sky-200  px-2 py-2 rounded-2xl" />
                <div className="text-slate-600">
                  <p className="font-bold">Real-Time Update</p>
                  <p>Get notied and stay updated in real-time</p>
                </div>
              </div>
              <div className="flex gap-3 ">
                <FaChartLine className="w-12 h-12 text-blue-600 bg-sky-200  px-2 py-2 rounded-2xl" />
                <div className="text-slate-600">
                  <p className="font-bold">Smart & Easy</p>
                  <p>Simple to use, powerful experience</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-slate-600 text-sm">
              © 2026 QueueSmart — Group 20 Software Design. All rights reserved.
            </p>
          </div>
        </div>
        {/* rightside of register page. */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[560px] rounded-[2rem] bg-white px-6 sm:px-8 lg:px-10 py-10 shadow-xl"
          >
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUserPlus className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-3xl font-bold text-slate-950">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to get continue with QueueSmart
              </p>
            </div>

            <div className="mt-9 space-y-5">
              <Input
                icon={<FaEnvelope />}
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={<FaLock />}
                label="Password"
                placeholder="Type your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-between">
                <div className="flex gap-3 items-center justify-center">
                  <input
                    className="mt-1 h-4 w-4 accent-blue-600"
                    type="checkbox"
                  />
                  <p className="text-slate-600">Remember my account </p>
                </div>
                <div>
                  <p className="text-blue-600">Password my password</p>
                </div>
              </div>

              <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-lg hover:opacity-90">
                Sign In
              </button>

              <div className="flex items-center gap-4">
                <div className="border flex-1 border-slate-300 w-sm h-px"></div>
                <p className="text-slate-600 text-sm">or login with</p>
                <div className="border flex-1 border-slate-300 w-sm h-px"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 font-semibold hover:bg-slate-50"
                >
                  <FaGoogle className="text-red-500" />
                  Google
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 font-semibold hover:bg-slate-50"
                >
                  <FaFacebookF className="text-blue-600" />
                  Facebook
                </button>
              </div>
              <div className="flex justify-center gap-3 items-center">
                <p className="text-center text-sm text-slate-600">
                  Don't have account?
                </p>
                <button
                  type="button"
                  onClick={switchToRegister}
                  className="font-semibold text-blue-600 hover:text-purple-700"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  icon,
  rightIcon,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="flex items-center gap-4 rounded-xl border border-slate-200 px-4 py-4 text-slate-500 shadow-sm focus-within:border-purple-500">
        {icon}

        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none placeholder:text-slate-400"
          value={value}
          onChange={onChange}
        />

        {rightIcon && <span>{rightIcon}</span>}
      </div>
    </div>
  );
}

function LeftFeature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center text-2xl text-purple-600 shadow">
        {icon}
      </div>

      <div>
        <p className="text-lg font-bold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default Login;
