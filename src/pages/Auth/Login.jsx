import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/useContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      if (!validateEmail(email)) {
        setIsLoading(false);
        setError("Please enter a valid email address.");
        return;
      }

      if (!password || password.length < 6) {
        setIsLoading(false);
        setError("Password must be at least 6 characters long.");
        return;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password
      });

      const { token, role } = response.data;

      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        updateUser(response.data);
            
        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (role === "user" || role === "member") {
          navigate("/user/dashboard", { replace: true });
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        (error.message === 'Network Error' 
          ? 'Unable to connect to server. Please try again.' 
          : 'An error occurred during login. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:w-[80%] w-full mx-auto flex flex-col items-center justify-center pt-45">
        <h3 className="text-xl font-extrabold text-purple-800">Welcome Back</h3>
        <p className="text-xs text-gray-500 mb-6">
          Please enter your details to log in
        </p>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center shadow-lg p-6 rounded-lg border border-gray-200"
        >
          <input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-900 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-800 font-bold hover:text-purple-900">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
