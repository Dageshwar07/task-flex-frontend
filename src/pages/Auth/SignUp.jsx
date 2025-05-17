import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/layouts/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/useContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  
  // Form states
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Form validation
      if (!fullName?.trim()) {
        toast.error("Please enter full name.");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      if (!password || password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
      }

      let profileImageUrl = '';

      // Handle profile image upload
      if (profilePic) {
        try {
          const uploadResponse = await uploadImage(profilePic);
          if (uploadResponse && uploadResponse.imageUrl) {
            // Store the full URL
            profileImageUrl = uploadResponse.imageUrl;
            console.log('Image uploaded successfully:', profileImageUrl);
          } else {
            throw new Error('Invalid upload response');
          }
        } catch (uploadError) {
          console.error('Profile picture upload failed:', uploadError);
          toast.error("Failed to upload profile picture. Proceeding without profile picture.");
        }
      }

      // Make signup request
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        profileImageUrl, // This will now be the full URL
        adminInviteToken: adminInviteToken.trim(),
      });

      const { token, role } = response.data;

      if (token && role) {
        toast.success("Registration successful! Redirecting to dashboard...");
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Add a slight delay before redirect
        setTimeout(() => {
          const redirectPath = role === "admin" ? "/admin/dashboard" : "/user/dashboard";
          navigate(redirectPath, { replace: true });
        }, 2000);
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (error) {
      console.error("SignUp error:", error);
      
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid input. Please check your details.");
      } else if (error.response?.status === 409) {
        toast.error("This email is already registered. Please try logging in.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.message === "Network Error") {
        toast.error("Unable to connect to server. Please check your connection.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:w-[80%] w-full mx-auto flex flex-col items-center justify-center pt-45">
        <h3 className="text-xl font-extrabold text-purple-800">
          Create an Account
        </h3>
        <p className="text-xs text-neutral-500 mt-2">
          Enter your details below to get started
        </p>

        <form
          onSubmit={handleSignUp}
          className="w-full flex flex-col items-center justify-center border-radius-lg shadow-lg p-6 rounded-lg border-b-2 border-purple-800 mt-6 space-y-6"
        >
          <div className="w-32 h-32 relative mb-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {error && (
            <div className="w-full p-3 bg-red-100 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="w-full">
              <label htmlFor="fullName" className="text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-purple-800 focus:outline-none"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div className="w-full">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-purple-800 focus:outline-none"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="text-sm text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-purple-800 focus:outline-none pr-10"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-purple-800"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="adminInviteToken" className="text-sm text-gray-600">
                Admin Invite Token (optional)
              </label>
              <input
                type="text"
                id="adminInviteToken"
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-purple-800 focus:outline-none"
                placeholder="Enter token if you have one"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-800 font-bold hover:text-purple-900 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
