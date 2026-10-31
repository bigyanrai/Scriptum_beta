// import { useState } from "react";
// import { LuArrowLeft, LuKeyRound, LuLoaderCircle } from "react-icons/lu";
// import Input from "../Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import toast from "react-hot-toast";

// function ForgotPasswordMember({ setCurrentPage }) {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       setMessage("");
//       return;
//     }

//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const profileResponse = await axiosInstance.get(
//         API_PATHS.AUTH.GET_PROFILE_BY_EMAIL(email),
//       );

//       if (profileResponse.data.role === "admin") {
//         setError("You are not authorized to reset password.");
//         return;
//       }

//       const response = await axiosInstance.post(
//         API_PATHS.AUTH.FORGOT_PASSWORD,
//         {
//           email,
//         },
//       );

//       toast.success("Reset link sent to your email address");

//       setMessage(
//         response.data.message ||
//           "A password reset link has been sent to your email address.",
//       );
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }

//       setMessage("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-5 py-5 sm:px-6 sm:py-6">
//       {/* Header */}
//       <div className="mb-5 text-center">
//         <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//           <LuKeyRound className="text-lg text-gray-800" />
//         </div>

//         <h3 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
//           Forgot Password?
//         </h3>

//         <p className="mx-auto mt-1 max-w-sm text-[11px] leading-4 text-gray-500 sm:text-xs">
//           Enter your email address and we'll send you a link to reset your
//           password.
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleForgotPassword}>
//         <Input
//           value={email}
//           onChange={({ target }) => {
//             setEmail(target.value);

//             if (error) setError("");
//             if (message) setMessage("");
//           }}
//           label="Email Address"
//           placeholder="john@example.com"
//           type="email"
//         />

//         {/* Error */}
//         {error && (
//           <div className="mt-2 rounded-md border border-red-100 bg-red-50 px-3 py-1.5">
//             <p className="text-[10px] leading-4 text-red-600">{error}</p>
//           </div>
//         )}

//         {/* Success */}
//         {message && (
//           <div className="mt-2 rounded-md border border-green-100 bg-green-50 px-3 py-1.5">
//             <p className="text-[10px] leading-4 text-green-600">{message}</p>
//           </div>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="
//             mt-3 flex h-9 w-full items-center justify-center gap-2
//             rounded-md bg-black px-4
//             text-xs font-semibold text-white
//             shadow-sm transition-all duration-200
//             hover:bg-gray-800 hover:shadow-md
//             active:scale-[0.99]
//             disabled:cursor-not-allowed
//             disabled:bg-gray-400
//             disabled:hover:bg-gray-400
//           "
//         >
//           {loading ? (
//             <>
//               <LuLoaderCircle className="animate-spin text-sm" />
//               <span>Sending Reset Link...</span>
//             </>
//           ) : (
//             <>
//               <LuKeyRound className="text-sm" />
//               <span>SEND RESET LINK</span>
//             </>
//           )}
//         </button>

//         {/* Back to Login */}
//         <div className="mt-3 flex justify-center">
//           <button
//             type="button"
//             disabled={loading}
//             onClick={() => setCurrentPage("login")}
//             className="
//               group flex items-center gap-1
//               text-[11px] font-medium text-gray-500
//               transition-colors
//               hover:text-black
//               disabled:cursor-not-allowed
//               disabled:opacity-50
//             "
//           >
//             <LuArrowLeft className="text-xs transition-transform group-hover:-translate-x-0.5" />

//             <span>
//               Back to{" "}
//               <span className="font-semibold text-gray-800 group-hover:text-black">
//                 Login
//               </span>
//             </span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ForgotPasswordMember;

import { useState } from "react";
import { LuArrowLeft, LuKeyRound, LuLoaderCircle } from "react-icons/lu";
import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

function ForgotPasswordMember({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE_BY_EMAIL(email),
      );

      if (profileResponse.data.role === "admin") {
        setError("You are not authorized to reset password.");
        return;
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.FORGOT_PASSWORD,
        {
          email,
        },
      );

      toast.success("Reset link sent to your email address");

      setMessage(
        response.data.message ||
          "A password reset link has been sent to your email address.",
      );
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }

      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-5 sm:px-6 sm:py-6">
      {/* Header */}
      <div className="mb-5 text-center">
        <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <LuKeyRound className="text-lg text-gray-800" />
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
          Forgot Password?
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-[11px] leading-4 text-gray-500 sm:text-xs">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleForgotPassword}>
        <Input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);

            if (error) setError("");
            if (message) setMessage("");
          }}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
        />

        {/* Error */}
        {error && (
          <div className="mt-2 rounded-md border border-red-100 bg-red-50 px-3 py-1.5">
            <p className="text-[10px] leading-4 text-red-600">{error}</p>
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mt-2 rounded-md border border-green-100 bg-green-50 px-3 py-1.5">
            <p className="text-[10px] leading-4 text-green-600">{message}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-3 flex h-9 w-full cursor-pointer items-center justify-center gap-2
            rounded-md bg-black px-4
            text-xs font-semibold text-white
            shadow-sm transition-all duration-200
            hover:bg-gray-800 hover:shadow-md
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:bg-gray-400
            disabled:hover:bg-gray-400
          "
        >
          {loading ? (
            <>
              <LuLoaderCircle className="animate-spin text-sm" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            <>
              <LuKeyRound className="text-sm" />
              <span>SEND RESET LINK</span>
            </>
          )}
        </button>

        {/* Back to Login */}
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            disabled={loading}
            onClick={() => setCurrentPage("login")}
            className="
              group flex cursor-pointer items-center gap-1
              text-[11px] font-medium text-gray-500
              transition-colors
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <LuArrowLeft className="text-xs transition-transform group-hover:-translate-x-0.5" />

            <span>
              Back to{" "}
              <span className="font-semibold text-gray-800 group-hover:text-black">
                Login
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordMember;
