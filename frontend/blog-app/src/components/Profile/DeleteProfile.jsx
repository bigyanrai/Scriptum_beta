import { useContext, useState } from "react";
import {
  LuCircleAlert,
  LuArrowLeft,
  LuLoaderCircle,
  LuShieldAlert,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const DeleteProfile = ({ onClose }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.delete(API_PATHS.AUTH.DELETE_ACCOUNT, {
        data: { password },
      });

      toast.success(res.data.message);

      clearUser();
      onClose();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" overflow-hidden rounded-2xl bg-white">
      {!confirmDelete ? (
        <>
          {/* ================================================= */}
          {/* STEP 1 — WARNING */}
          {/* ================================================= */}

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            {/* Icon */}

            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50
                  text-red-500
                "
              >
                <LuTrash2 size={25} strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}

            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Delete your account?
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm">
                This will permanently remove your account and associated data.
                This action cannot be undone.
              </p>
            </div>

            {/* Warning Box */}

            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-red-100
                bg-red-50/70
                px-3.5
                py-3
              "
            >
              <LuCircleAlert
                size={17}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <div>
                <p className="text-xs font-semibold text-red-700">
                  This is a permanent action
                </p>

                <p className="mt-0.5 text-[11px] leading-4 text-red-600/80 sm:text-xs">
                  Once your account is deleted, you will not be able to recover
                  it.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
              border-t
              border-gray-100
              bg-gray-50/70
              px-5
              py-3.5
              sm:px-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2
                text-xs
                font-medium
                text-gray-600
                transition-all
                duration-200
                hover:border-gray-400
                hover:bg-gray-50
                hover:text-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
                cursor-pointer
                sm:text-sm
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-red-500
                px-4
                py-2
                text-xs
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-red-600
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-red-200
                cursor-pointer
                sm:text-sm
              "
            >
              <LuTrash2 size={14} />
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ================================================= */}
          {/* STEP 2 — PASSWORD CONFIRMATION */}
          {/* ================================================= */}

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            {/* Step Indicator */}

            <div className="mb-5 flex items-center gap-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-100
                  bg-red-50
                  text-red-500
                "
              >
                <LuShieldAlert size={18} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-red-500">
                  Final confirmation
                </p>

                <p className="text-xs text-gray-500">
                  Verify your identity to continue
                </p>
              </div>
            </div>

            {/* Heading */}

            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Confirm your password
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
              Enter your current password to permanently delete your account.
            </p>

            {/* Password */}

            <div className="mt-6">
              <label
                htmlFor="delete-account-password"
                className="mb-1.5 block text-xs font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="delete-account-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleDelete();
                  }
                }}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-3.5
                  py-2.5
                  text-sm
                  text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition-all
                  duration-200
                  focus:border-red-400
                  focus:ring-4
                  focus:ring-red-50
                  disabled:cursor-not-allowed
                  disabled:bg-gray-50
                  disabled:opacity-70
                "
              />
            </div>

            {/* Final Warning */}

            <div
              className="
                mt-4
                flex
                items-start
                gap-2.5
                rounded-lg
                border
                border-amber-100
                bg-amber-50/70
                px-3
                py-2.5
              "
            >
              <LuCircleAlert
                size={15}
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <p className="text-[11px] leading-4 text-amber-700 sm:text-xs">
                Your account will be deleted immediately after successful
                confirmation.
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-2
              border-t
              border-gray-100
              bg-gray-50/70
              px-5
              py-3.5
              sm:px-6
            "
          >
            {/* Back */}

            <button
              type="button"
              onClick={() => {
                if (!loading) {
                  setConfirmDelete(false);
                }
              }}
              disabled={loading}
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                px-3
                py-2
                text-xs
                font-medium
                text-gray-500
                transition-all
                duration-200
                hover:bg-gray-100
                hover:text-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
                sm:text-sm
              "
            >
              <LuArrowLeft size={15} />
              Back
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || !password.trim()}
              className="
                flex
                min-w-[140px]
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-red-500
                px-4
                py-2
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-red-600
                hover:shadow-md
                focus:outline-none
                focus:ring-4
                focus:ring-red-100
                disabled:cursor-not-allowed
                disabled:bg-red-300
                disabled:shadow-none
                sm:text-sm
              "
            >
              {loading ? (
                <>
                  <LuLoaderCircle size={15} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <LuTrash2 size={15} />
                  Delete Account
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteProfile;
