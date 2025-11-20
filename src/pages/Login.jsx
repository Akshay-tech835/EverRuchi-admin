import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, X, Eye, EyeOff, Mail } from "lucide-react";
import back from "../assets/back.png";
import logo from "../assets/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "Everruchi@2025") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Try Username: admin / Password: Everruchi@2025");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!resetEmail) {
      setMessage("Please enter your registered email address.");
      return;
    }

    setMessage(`Password reset link sent to ${resetEmail}. Check your inbox.`);
    setTimeout(() => {
      setShowForgot(false);
      setMessage("");
      setResetEmail("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* LEFT SIDE - FULL BACKGROUND IMAGE */}
      <div
        className="hidden md:block h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      {/* RIGHT SIDE - GRADIENT LOGIN SECTION */}
      <div className="flex items-center justify-center px-10 md:px-24 h-screen
                      bg-white animate-fadeIn">

        <div className="w-full max-w-md text-center">

          {/* LOGO */}
          <img
            src={logo}
            alt="Everruchi Logo"
            className="w-28 mx-auto mb-6 animate-fadeInSlow"
          />

          {/* LOGIN TITLE */}
          <h2 className="text-4xl font-bold text-amber-700 mb-1 animate-fadeInUp">
            LOGIN
          </h2>

          {/* SUB TEXT */}
          <p className="text-gray-500 mb-8 animate-fadeInUp delay-150">
            Access your Everruchi account
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left animate-fadeInUp delay-200">

            {/* USERNAME FIELD */}
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm
                             focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* PASSWORD FIELD WITH EYE ICON */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-10 text-sm
                             focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder="********"
                />

                {/* EYE ICON */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs text-amber-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded-md font-semibold
                         hover:bg-amber-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-gray-500 text-center mt-6 animate-fadeInUp delay-300">
            © 2025 Everruchi. Admin Panel Login
          </p>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm relative">
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold text-center text-amber-600 mb-4">
              Reset Password
            </h3>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Registered Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />

                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full border rounded-md py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {message && (
                <p className="text-sm text-green-600 text-center">{message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 rounded-md font-semibold hover:bg-amber-700 transition"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
