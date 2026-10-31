// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { LuKeyRound, LuLoaderCircle, LuShieldCheck } from "react-icons/lu";

// import Input from "../Inputs/Input";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import toast from "react-hot-toast";
// import AdminLoginLayout from "../layouts/AdminLoginLayout";

// function AdminResetPassword() {
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
//         navigate("/admin-login");
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

//       <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">
//         <div className="w-full max-w-md">
//           <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
//             {/* Header */}
//             <div className="mb-7 text-center">
//               <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
//                 <LuShieldCheck className="text-2xl" />
//               </div>

//               <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
//                 Reset Admin Password
//               </h1>

//               <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
//                 Create a new secure password for your administrator account.
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleResetPassword}>
//               <div className="space-y-1">
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
//               <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400 sm:text-xs">
//                 <LuKeyRound className="shrink-0" />
//                 <span>Password must contain at least 8 characters.</span>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
//                   <p className="text-xs leading-5 text-red-600">{error}</p>
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 ${
//                   loading
//                     ? "cursor-not-allowed bg-sky-400"
//                     : "bg-sky-500 hover:bg-sky-600 active:scale-[0.99]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <LuLoaderCircle className="animate-spin text-lg" />
//                     <span>Resetting Password...</span>
//                   </>
//                 ) : (
//                   <>
//                     <LuKeyRound className="text-base" />
//                     <span>RESET PASSWORD</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Security note */}
//             <p className="mt-5 text-center text-[11px] leading-4 text-gray-400 sm:text-xs">
//               Your password will be updated securely after verification of your
//               reset link.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminResetPassword;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuKeyRound, LuLoaderCircle, LuShieldCheck } from "react-icons/lu";

import Input from "../Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import AdminLoginLayout from "../layouts/AdminLoginLayout";

function AdminResetPassword() {
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
        navigate("/admin-login");
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

      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gray-50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg shadow-gray-200/40 sm:p-5">
            {/* Header */}
            <div className="mb-4 text-center">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <LuShieldCheck className="text-xl" />
              </div>

              <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                Reset Admin Password
              </h1>

              <p className="mx-auto mt-1 max-w-xs text-[11px] leading-4 text-gray-500">
                Create a new secure password for your administrator account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleResetPassword}>
              <div className="space-y-0">
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
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-400">
                <LuKeyRound className="shrink-0 text-xs" />
                <span>Password must contain at least 8 characters.</span>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-1.5 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5">
                  <p className="text-[11px] leading-4 text-red-600">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
                  loading
                    ? "cursor-not-allowed bg-black/70"
                    : "bg-black hover:bg-black/70 cursor-pointer active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-sm" />
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
            <p className="mt-3 text-center text-[10px] leading-3.5 text-gray-400">
              Your password will be updated securely after verification of your
              reset link.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminResetPassword;
