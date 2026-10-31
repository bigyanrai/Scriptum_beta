// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { LuKeyRound, LuLoaderCircle, LuShieldCheck } from "react-icons/lu";

// import Input from "../Inputs/Input";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import toast from "react-hot-toast";
// import AdminLoginLayout from "../layouts/AdminLoginLayout";

// function ResetPasswordMember() {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     // Validation
//     if (!password) {
//       setError("Please enter a new password.");
//       return;
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters.");
//       return;
//     }

//     if (!confirmPassword) {
//       setError("Please confirm your password.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(
//         API_PATHS.AUTH.RESET_PASSWORD(token),
//         {
//           password,
//         },
//       );

//       toast.success(response.data.message || "Password reset successfully.");

//       setTimeout(() => {
//         navigate("/");
//       }, 1200);
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AdminLoginLayout />

//       <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
//         <div className="w-full max-w-sm">
//           <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 sm:p-6">
//             {/* Header */}
//             <div className="mb-5 text-center">
//               <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
//                 <LuShieldCheck className="text-xl" />
//               </div>

//               <h1 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
//                 Reset Your Password
//               </h1>

//               <p className="mt-1.5 text-[11px] leading-4 text-gray-500 sm:text-xs">
//                 Create a new secure password for your Scriptum account.
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleResetPassword}>
//               <div className="space-y-0.5">
//                 <Input
//                   value={password}
//                   onChange={({ target }) => {
//                     setPassword(target.value);
//                     if (error) setError("");
//                   }}
//                   label="New Password"
//                   placeholder="Enter your new password"
//                   type="password"
//                 />

//                 <Input
//                   value={confirmPassword}
//                   onChange={({ target }) => {
//                     setConfirmPassword(target.value);
//                     if (error) setError("");
//                   }}
//                   label="Confirm Password"
//                   placeholder="Re-enter your new password"
//                   type="password"
//                 />
//               </div>

//               {/* Password requirement */}
//               <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">
//                 <LuKeyRound className="shrink-0 text-xs" />
//                 <span>Password must contain at least 8 characters.</span>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="mt-3 rounded-md border border-red-100 bg-red-50 px-2.5 py-2">
//                   <p className="text-[11px] leading-4 text-red-600">{error}</p>
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
//                   loading
//                     ? "cursor-not-allowed bg-black/70"
//                     : "bg-black cursor-pointer hover:bg-black/70 active:scale-[0.99]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <LuLoaderCircle className="animate-spin text-base" />
//                     <span>Resetting Password...</span>
//                   </>
//                 ) : (
//                   <>
//                     <LuKeyRound className="text-sm" />
//                     <span>RESET PASSWORD</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Security note */}
//             <p className="mt-4 text-center text-[10px] leading-4 text-gray-400 sm:text-[11px]">
//               Make sure you choose a password that you don't use elsewhere.
//             </p>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default ResetPasswordMember;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuKeyRound, LuLoaderCircle, LuShieldCheck } from "react-icons/lu";

import Input from "../Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import AdminLoginLayout from "../layouts/AdminLoginLayout";

function ResetPasswordMember() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validation
    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.RESET_PASSWORD(token),
        {
          password,
        },
      );

      toast.success(response.data.message || "Password reset successfully.");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLoginLayout />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 sm:p-6">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <LuShieldCheck className="text-xl" />
              </div>

              <h1 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                Reset Your Password
              </h1>

              <p className="mt-1.5 text-[11px] leading-4 text-gray-500 sm:text-xs">
                Create a new secure password for your Scriptum account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleResetPassword}>
              <div className="space-y-0.5">
                <Input
                  value={password}
                  onChange={({ target }) => {
                    setPassword(target.value);
                    if (error) setError("");
                  }}
                  label="New Password"
                  placeholder="Enter your new password"
                  type="password"
                />

                <Input
                  value={confirmPassword}
                  onChange={({ target }) => {
                    setConfirmPassword(target.value);
                    if (error) setError("");
                  }}
                  label="Confirm Password"
                  placeholder="Re-enter your new password"
                  type="password"
                />
              </div>

              {/* Password requirement */}
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">
                <LuKeyRound className="shrink-0 text-xs" />
                <span>Password must contain at least 8 characters.</span>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-3 rounded-md border border-red-100 bg-red-50 px-2.5 py-2">
                  <p className="text-[11px] leading-4 text-red-600">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
                  loading
                    ? "cursor-not-allowed bg-black/70"
                    : "cursor-pointer bg-black hover:bg-black/70 active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-base" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <LuKeyRound className="text-sm" />
                    <span>RESET PASSWORD</span>
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <p className="mt-4 text-center text-[10px] leading-4 text-gray-400 sm:text-[11px]">
              Make sure you choose a password that you don't use elsewhere.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPasswordMember;
