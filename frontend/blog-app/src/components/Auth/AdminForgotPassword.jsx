import { useState } from "react";
import { LuKeyRound, LuLoaderCircle, LuArrowLeft } from "react-icons/lu";

import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

function AdminForgotPassword({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [adminToken, setAdminToken] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!adminToken.trim()) {
      setError("Please enter the admin token.");
      return;
    }

    if (adminToken.trim() !== import.meta.env.VITE_ADMIN_ACCESS_TOKEN) {
      setError("Invalid admin token.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.FORGOT_PASSWORD,
        {
          email: email.trim(),
        },
      );

      toast.success("Reset link sent to your email address");

      setMessage(
        response.data?.message ||
          "A password reset link has been sent to your email address.",
      );
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Unable to send reset link. Please try again.");
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
            <LuKeyRound className="text-xl" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>

          <p className="mx-auto mt-1 max-w-xs text-[11px] leading-4 text-gray-500">
            Enter your administrator email and valid admin token to receive a
            password reset link.
          </p>
        </div>

        <form onSubmit={handleForgotPassword}>
          {/* Email */}
          <Input
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              if (error) setError("");
              setMessage("");
            }}
            label="Email Address"
            placeholder="admin@example.com"
            type="email"
          />

          {/* Admin token */}
          <Input
            value={adminToken}
            onChange={({ target }) => {
              setAdminToken(target.value);
              if (error) setError("");
              setMessage("");
            }}
            label="Admin Token"
            placeholder="Enter admin token"
            type="password"
          />

          {/* Error */}
          {error && (
            <div className="mt-1.5 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5">
              <p className="text-[11px] leading-4 text-red-600">{error}</p>
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mt-1.5 rounded-md border border-green-100 bg-green-50 px-2.5 py-1.5">
              <p className="text-[11px] leading-4 text-green-600">{message}</p>
            </div>
          )}

          {/* Submit */}
          <button
            className={`mt-3  flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
              loading
                ? "cursor-not-allowed bg-black/70"
                : "bg-black cursor-pointer hover:bg-gray-600 active:scale-[0.99]"
            }`}
            type="submit"
            disabled={loading}
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

          {/* Back to login */}
          <div className="mt-3 border-t border-gray-100 pt-3 text-center">
            <button
              type="button"
              disabled={loading}
              className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-black transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setCurrentPage("login")}
            >
              <LuArrowLeft className="text-xs" />
              Back to Login
            </button>
          </div>
        </form>

        {/* Security note */}
        <div className="mt-3 text-center text-[10px] leading-3.5 text-gray-400">
          For security, only authorized administrators can reset an
          administrator password.
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
