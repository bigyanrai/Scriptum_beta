// import { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { LuArrowRight, LuLockKeyhole, LuLoaderCircle } from "react-icons/lu";
// import { GoogleLogin } from "@react-oauth/google";

// import Input from "../Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// function Login({ setCurrentPage }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { updateUser, setOpenAuthForm } = useContext(UserContext);
//   const navigate = useNavigate();

//   // Handle login form submit
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
//         email,
//         password,
//       });

//       const { token, role } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(response.data);

//         if (role === "admin") {
//           setOpenAuthForm(false);
//           navigate("/admin/dashboard");
//         }

//         setOpenAuthForm(false);
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Google authentication
//   const handleGoogleAuth = async (credentialResponse) => {
//     if (loading) return;

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_AUTH, {
//         credential: credentialResponse.credential,
//       });

//       const { token, role } = response.data;

//       if (!token) {
//         setError("Google authentication failed. Please try again.");
//         return;
//       }

//       localStorage.setItem("token", token);
//       updateUser(response.data);

//       if (role === "admin") {
//         setOpenAuthForm(false);
//         navigate("/admin/dashboard");
//         return;
//       }

//       setOpenAuthForm(false);
//       navigate("/");
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Unable to continue with Google. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="px-5 py-5 sm:px-6 sm:py-6">
//         {/* Header */}
//         <div className="mb-5 text-center">
//           <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//             <LuLockKeyhole className="text-lg text-gray-800" />
//           </div>

//           <h2 className="text-xl font-semibold tracking-tight text-gray-900">
//             Welcome back
//           </h2>

//           <p className="mt-1 text-xs text-gray-500">
//             Sign in to continue to your account
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleLogin} className="space-y-3">
//           {/* Email */}
//           <div>
//             <Input
//               value={email}
//               onChange={({ target }) => setEmail(target.value)}
//               label="Email Address"
//               placeholder="john@example.com"
//               type="text"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <Input
//               value={password}
//               onChange={({ target }) => setPassword(target.value)}
//               label="Password"
//               placeholder="Enter your password"
//               type="password"
//             />
//           </div>

//           {/* Forgot Password */}
//           <div className="flex justify-end pt-0.5">
//             <button
//               type="button"
//               disabled={loading}
//               className="
//                 text-[11px] font-medium text-gray-600
//                 transition-colors hover:text-black hover:underline
//                 disabled:cursor-not-allowed disabled:opacity-50
//               "
//               onClick={() => {
//                 setCurrentPage("forgot-password");
//               }}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2">
//               <p className="text-[11px] leading-4 text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Login Button */}
//           <button
//             className="
//               group flex w-full items-center justify-center gap-2
//               rounded-md bg-black px-4 py-2.5
//               text-sm font-semibold text-white
//               shadow-sm transition-all duration-200
//               hover:bg-gray-800 hover:shadow-md
//               active:scale-[0.99]
//               disabled:cursor-not-allowed disabled:opacity-70
//               disabled:hover:bg-black disabled:hover:shadow-sm
//             "
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <LuLoaderCircle className="animate-spin text-base" />
//                 <span>Signing in...</span>
//               </>
//             ) : (
//               <>
//                 <span>Sign In</span>
//                 <LuArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
//               </>
//             )}
//           </button>
//         </form>

//         {/* Google Login */}
//         <div className="mt-3 flex justify-center">
//           <div className={loading ? "pointer-events-none opacity-60" : ""}>
//             <GoogleLogin
//               onSuccess={handleGoogleAuth}
//               onError={() => {
//                 setError("Google authentication failed. Please try again.");
//               }}
//               theme="outline"
//               size="large"
//               text="continue_with"
//               shape="rectangular"
//             />
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-4 flex items-center gap-3">
//           <div className="h-px flex-1 bg-gray-200" />

//           <span className="text-[10px] uppercase tracking-wider text-gray-400">
//             New here?
//           </span>

//           <div className="h-px flex-1 bg-gray-200" />
//         </div>

//         {/* Signup */}
//         <div className="text-center">
//           <p className="text-xs text-gray-500">
//             Don't have an account?{" "}
//             <button
//               type="button"
//               disabled={loading}
//               className="
//                 font-semibold text-gray-800
//                 transition-colors hover:text-black hover:underline
//                 disabled:cursor-not-allowed disabled:opacity-50
//               "
//               onClick={() => {
//                 setCurrentPage("signup");
//               }}
//             >
//               Create an account
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuLockKeyhole, LuLoaderCircle } from "react-icons/lu";
import { GoogleLogin } from "@react-oauth/google";

import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        }

        setOpenAuthForm(false);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = async (credentialResponse) => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_AUTH, {
        credential: credentialResponse.credential,
      });

      const { token, role } = response.data;

      if (!token) {
        setError("Google authentication failed. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      updateUser(response.data);

      if (role === "admin") {
        setOpenAuthForm(false);
        navigate("/admin/dashboard");
        return;
      }

      setOpenAuthForm(false);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Unable to continue with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <LuLockKeyhole className="text-lg text-gray-800" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              disabled={loading}
              className="
                cursor-pointer
                text-[11px] font-medium text-gray-600
                transition-colors hover:text-black hover:underline
                disabled:cursor-not-allowed disabled:opacity-50
              "
              onClick={() => {
                setCurrentPage("forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2">
              <p className="text-[11px] leading-4 text-red-600">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            className="
              group flex w-full cursor-pointer items-center justify-center gap-2
              rounded-md bg-black px-4 py-2.5
              text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:bg-gray-800 hover:shadow-md
              active:scale-[0.99]
              disabled:cursor-not-allowed disabled:opacity-70
              disabled:hover:bg-black disabled:hover:shadow-sm
            "
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin text-base" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <LuArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-3 flex justify-center">
          <div className={loading ? "pointer-events-none opacity-60" : ""}>
            <GoogleLogin
              onSuccess={handleGoogleAuth}
              onError={() => {
                setError("Google authentication failed. Please try again.");
              }}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-[10px] uppercase tracking-wider text-gray-400">
            New here?
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Signup */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              disabled={loading}
              className="
                cursor-pointer
                font-semibold text-gray-800
                transition-colors hover:text-black hover:underline
                disabled:cursor-not-allowed disabled:opacity-50
              "
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
