// // import { useContext, useState } from "react";
// // import { UserContext } from "../../context/userContext";
// // import { useNavigate } from "react-router-dom";
// // import AUTH_IMG from "../../assets/Hero.png";
// // import Input from "../Inputs/Input";
// // import { validateEmail } from "../../utils/helper";
// // import axiosInstance from "../../utils/axiosInstance";
// // import { API_PATHS } from "../../utils/apiPaths";

// // function AdminLoginPage({ setCurrentPage }) {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);

// //   const { updateUser, setOpenAuthForm } = useContext(UserContext);
// //   const navigate = useNavigate();

// //   //handle login form submit
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (!validateEmail(email)) {
// //       setError("Please enter a valid email address");
// //       return;
// //     }
// //     if (!password) {
// //       setError("Please enter the password");
// //       return;
// //     }
// //     const response = await axiosInstance.get(
// //       API_PATHS.AUTH.GET_PROFILE_BY_EMAIL(email),
// //     );

// //     if (response.data.role === "member") {
// //       setError(
// //         "Only admin users are allowed to login here. Please use the member login page.",
// //       );
// //       return;
// //     }

// //     setError("");

// //     try {
// //       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
// //         email,
// //         password,
// //       });
// //       const { token, role } = response.data;

// //       if (token) {
// //         localStorage.setItem("token", token);
// //         updateUser(response.data);

// //         // console.log(token);
// //         if (role === "admin") {
// //           setOpenAuthForm(false);
// //           navigate("/admin/dashboard");
// //         }
// //         setOpenAuthForm(false);
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.data.message) {
// //         setError(error.response.data.message);
// //       } else {
// //         setError("Something went wrong. Please try again");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex items-center">
// //       <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
// //         <h3 className="text-xl font-semibold text-black">Admin Portal</h3>
// //         <p className="text-xs text-slate-700 mt-1 mb-6 leading-5">
// //           Sign in with your administrator account to access the Scriptum
// //           dashboard.
// //         </p>
// //         <form onSubmit={handleLogin}>
// //           <Input
// //             value={email}
// //             onChange={({ target }) => setEmail(target.value)}
// //             label="Email Address"
// //             placeholder="john@example.com"
// //             type="text"
// //           />
// //           <Input
// //             value={password}
// //             onChange={({ target }) => setPassword(target.value)}
// //             placeholder="Min 8 Characters"
// //             type="password"
// //           />
// //           <div className="flex justify-end mb-3">
// //             <button
// //               type="button"
// //               className="text-primary text-xs underline cursor-pointer"
// //               onClick={() => {
// //                 console.log("forgot password clicked");
// //                 setCurrentPage("forgot-password");
// //               }}
// //             >
// //               Forgot Password?
// //             </button>
// //           </div>
// //           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
// //           <button className="btn-primary" type="submit">
// //             LOGIN
// //           </button>
// //           <p className="text-[13px] text-slate-800 mt-3">
// //             Looking for the member portal?
// //             <button
// //               type="button"
// //               className="ml-1 text-primary font-medium underline cursor-pointer"
// //               onClick={() => {
// //                 setCurrentPage("signup");
// //               }}
// //             >
// //               Member Login
// //             </button>
// //           </p>
// //         </form>
// //       </div>

// //       <div className="hidden md:block">
// //         <img src={AUTH_IMG} alt="Login" className="h-[400px]" />
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLoginPage;

// import { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { LuShieldCheck, LuLoaderCircle, LuLogIn } from "react-icons/lu";

// import Input from "../Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// function AdminLoginPage({ setCurrentPage }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { updateUser, setOpenAuthForm } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     // Validation
//     if (!email.trim()) {
//       setError("Please enter your email address.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter your password.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       // Check whether the account belongs to an admin
//       const profileResponse = await axiosInstance.get(
//         API_PATHS.AUTH.GET_PROFILE_BY_EMAIL(email),
//       );

//       if (profileResponse.data.role === "member") {
//         setError(
//           "Only admin users are allowed to login here. Please use the member login page.",
//         );
//         return;
//       }

//       // Login
//       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
//         email,
//         password,
//       });

//       const { token, role } = response.data;

//       if (!token) {
//         setError("Login failed. Please try again.");
//         return;
//       }

//       if (role !== "admin") {
//         setError(
//           "Only admin users are allowed to access the administrator portal.",
//         );
//         return;
//       }

//       localStorage.setItem("token", token);
//       updateUser(response.data);

//       setOpenAuthForm(false);
//       navigate("/admin/dashboard");
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError(
//           "Unable to sign in. Please check your credentials and try again.",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-12">
//       <div className="mx-auto w-full max-w-md">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
//             <LuShieldCheck className="text-2xl" />
//           </div>

//           <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//             Admin Portal
//           </h2>

//           <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm">
//             Sign in with your administrator account to access the dashboard.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="space-y-1">
//           <Input
//             value={email}
//             onChange={({ target }) => {
//               setEmail(target.value);
//               if (error) setError("");
//             }}
//             label="Email Address"
//             placeholder="admin@example.com"
//             type="email"
//           />

//           <Input
//             value={password}
//             onChange={({ target }) => {
//               setPassword(target.value);
//               if (error) setError("");
//             }}
//             label="Password"
//             placeholder="Enter your password"
//             type="password"
//           />

//           {/* Forgot password */}
//           <div className="flex justify-end pb-2">
//             <button
//               type="button"
//               disabled={loading}
//               className="text-xs font-medium text-sky-600 underline underline-offset-2 transition-colors hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
//               onClick={() => setCurrentPage("forgot-password")}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 rounded-md border border-red-100 bg-red-50 px-3 py-2.5">
//               <p className="text-xs leading-5 text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Login button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all duration-200 ${
//               loading
//                 ? "cursor-not-allowed bg-sky-400"
//                 : "bg-sky-500 hover:bg-sky-600 active:scale-[0.99]"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <LuLoaderCircle className="animate-spin text-lg" />
//                 <span>Signing In...</span>
//               </>
//             ) : (
//               <>
//                 <LuLogIn className="text-base" />
//                 <span>LOGIN TO ADMIN PORTAL</span>
//               </>
//             )}
//           </button>

//           {/* Member login */}
//           <div className="mt-6 border-t border-gray-100 pt-5 text-center">
//             <p className="text-xs text-gray-500 sm:text-[13px]">
//               Looking for the member portal?{" "}
//               <button
//                 type="button"
//                 disabled={loading}
//                 className="font-medium text-sky-600 underline underline-offset-2 transition-colors hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 onClick={() => setCurrentPage("signup")}
//               >
//                 Member Signup
//               </button>
//             </p>
//           </div>
//         </form>

//         {/* Security note */}
//         <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-gray-400">
//           <LuShieldCheck className="text-sm" />
//           <span>Authorized administrators only</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLoginPage;

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuShieldCheck, LuLoaderCircle, LuLogIn } from "react-icons/lu";

import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function AdminLoginPage({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Check whether the account belongs to an admin
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE_BY_EMAIL(email),
      );

      if (profileResponse.data.role === "member") {
        setError(
          "Only admin users are allowed to login here. Please use the member login page.",
        );
        return;
      }

      // Login
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (!token) {
        setError("Login failed. Please try again.");
        return;
      }

      if (role !== "admin") {
        setError(
          "Only admin users are allowed to access the administrator portal.",
        );
        return;
      }

      localStorage.setItem("token", token);
      updateUser(response.data);

      setOpenAuthForm(false);
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(
          "Unable to sign in. Please check your credentials and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className="mx-auto w-full max-w-sm">
        {/* Header */}
        <div className="mb-4 text-center">
          <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <LuShieldCheck className="text-xl" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Admin Portal
          </h2>

          <p className="mx-auto mt-1 max-w-xs text-[11px] leading-4 text-gray-500">
            Sign in with your administrator account to access the dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-0">
          <Input
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              if (error) setError("");
            }}
            label="Email Address"
            placeholder="admin@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
              if (error) setError("");
            }}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {/* Forgot password */}
          <div className="flex justify-end pb-1.5">
            <button
              type="button"
              disabled={loading}
              className="text-[11px] cursor-pointer font-medium text-black hover:underline transition-colors  disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setCurrentPage("forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-2 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5">
              <p className="text-[11px] leading-4 text-red-600">{error}</p>
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`transition-all flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
              loading
                ? "cursor-not-allowed bg-black/70"
                : "bg-black hover:bg-gray-600 cursor-pointer active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin text-sm" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LuLogIn className="text-sm" />
                <span>LOGIN TO ADMIN PORTAL</span>
              </>
            )}
          </button>

          {/* Member login */}
          <div className="mt-3 border-t border-gray-100 pt-3 text-center">
            <p className="text-[11px] text-gray-500">
              Looking for the member portal?{" "}
              <button
                type="button"
                disabled={loading}
                className="font-medium cursor-pointer text-black transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCurrentPage("signup")}
              >
                Signup
              </button>
            </p>
          </div>
        </form>

        {/* Security note */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
          <LuShieldCheck className="text-xs" />
          <span>Authorized administrators only</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
