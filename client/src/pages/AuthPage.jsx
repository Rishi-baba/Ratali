import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../api/authApi";
import useAuthStore from "../store/authStore";
import { Eye, EyeOff, Mail, Lock, Sparkles, User, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import bgImage from "../assets/Loginbg.jpg";
import loginCard from "../assets/logincard.png";

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);

  // Set initial mode based on route if someone navigates directly to /register
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let data;
      if (isLogin) {
        data = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        data = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      setUser(data);
      setToken(data.token);

      navigate("/panda-zone");
    } catch (error) {
      setError(error.response?.data?.message || (isLogin ? "Login failed" : "Register failed"));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError("");
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#ffe8a3]"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -80],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end px-4 sm:px-8 lg:px-16">

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-[800px] min-h-[560px] bg-contain bg-no-repeat bg-center px-14 pt-24 pb-20 flex flex-col"
          style={{
            backgroundImage: `url(${loginCard})`,
          }}
        >
          
          <div className="text-center mt-5 mb-8">
            <h1 className="text-4xl font-black text-[#3E2723] tracking-tight">
              Panda<span className="text-[#6C9F43]">Flow</span>
            </h1>

            <p className="mt-3 flex items-center justify-center gap-2 text-[#7A5B49]">
              <Sparkles size={14} className="text-[#B89B52]" />
              Focus today, grow tomorrow.
              <Sparkles size={14} className="text-[#B89B52]" />
            </p>
          </div>

          {/* Form */}
          <motion.form
            layout
            onSubmit={handleSubmit}
            className="mt-0 space-y-2 w-[42%] ml-[200px]"
          >
            <AnimatePresence mode="popLayout">
              {/* Username Field (Only for Register) */}
              {!isLogin && (
                <motion.div
                  key="username"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative px-3 pb-2"
                >
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pb-2 text-[#9E8175]">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full rounded-2xl border border-[#D8C6A5] bg-[#F8F1DF]/90 py-3 pl-12 pr-4 text-[#3E2723] shadow-sm outline-none transition-all placeholder:text-[#A89286] focus:border-[#6C9F43]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field (Always present) */}
            <motion.div layout className="relative px-3 pb-2">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 pb-2 text-[#9E8175]">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#D8C6A5] bg-[#F8F1DF]/90 py-3 pl-12 pr-4 text-[#3E2723] shadow-sm outline-none transition-all placeholder:text-[#A89286] focus:border-[#6C9F43]"
              />
            </motion.div>

            {/* Password Field (Always present) */}
            <motion.div layout className="relative px-3 pb-2">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 pb-2 text-[#9E8175]">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#D8C6A5] bg-[#F8F1DF]/90 py-3 pl-12 pr-12 text-[#3E2723] shadow-sm outline-none transition-all placeholder:text-[#A89286] focus:border-[#6C9F43]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute p-3 right-4 top-1/2 -translate-y-1/2 pb-5 text-[#9E8175]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {/* Confirm Password Field (Only for Register) */}
              {!isLogin && (
                <motion.div
                  key="confirmPassword"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative px-3 pb-2"
                >
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pb-2 text-[#9E8175]">
                    <CheckCircle size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full rounded-2xl border border-[#D8C6A5] bg-[#F8F1DF]/90 py-3 pl-12 pr-12 text-[#3E2723] shadow-sm outline-none transition-all placeholder:text-[#A89286] focus:border-[#6C9F43]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute p-3 right-4 top-1/2 -translate-y-1/2 pb-5 text-[#9E8175]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3"
                >
                  <div className="rounded-xl border border-red-200 bg-red-100 p-2 text-center text-sm font-semibold text-red-600 mb-2">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div layout className="px-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-b from-[#6C9F43] to-[#3F6A24] py-3 text-xl font-bold text-white shadow-[0_8px_20px_rgba(76,115,40,0.35)] transition-all"
              >
                {loading ? "Loading..." : (isLogin ? "Log In" : "Create Account")}
              </motion.button>
            </motion.div>

            {/* Toggle Login/Register */}
            <motion.p layout className="pt-2 text-center text-[#7A5B49]">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 font-bold text-[#5C8D4B] transition hover:text-[#3A5A2E]"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;
