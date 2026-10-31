// import { useContext, useState } from "react";
// import {
//   LuArrowLeft,
//   LuCheck,
//   LuKeyRound,
//   LuLoaderCircle,
//   LuShieldCheck,
// } from "react-icons/lu";
// import toast from "react-hot-toast";

// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { UserContext } from "../../context/userContext";

// const ChangePassword = ({ onClose }) => {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { clearUser } = useContext(UserContext);

//   const handleChangePassword = async () => {
//     if (!currentPassword.trim()) {
//       toast.error("Please enter your current password.");
//       return;
//     }

//     if (!newPassword.trim()) {
//       toast.error("Please enter a new password.");
//       return;
//     }

//     if (newPassword.length < 8) {
//       toast.error("New password must be at least 8 characters.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match.");
//       return;
//     }

//     if (currentPassword === newPassword) {
//       toast.error("New password must be different from your current password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
//         currentPassword,
//         newPassword,
//       });

//       toast.success(res.data?.message || "Password changed successfully.");

//       onClose();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" overflow-hidden rounded-2xl bg-white">
//       {/* ================================================= */}
//       {/* CONTENT */}
//       {/* ================================================= */}

//       <div className="px-5 py-6 sm:px-6 sm:py-7">
//         {/* Header */}

//         <div className="mb-5 flex items-center gap-2">
//           <div
//             className="
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-sky-100
//               bg-sky-50
//               text-sky-500
//             "
//           >
//             <LuKeyRound size={18} />
//           </div>

//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
//               Account security
//             </p>

//             <p className="text-xs text-gray-500">Keep your account secure</p>
//           </div>
//         </div>

//         {/* Heading */}

//         <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
//           Change your password
//         </h2>

//         <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
//           Enter your current password and choose a new password for your
//           account.
//         </p>

//         {/* Current Password */}

//         <div className="mt-6">
//           <label
//             htmlFor="current-password"
//             className="mb-1.5 block text-xs font-semibold text-gray-700"
//           >
//             Current password
//           </label>

//           <input
//             id="current-password"
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             placeholder="Enter your current password"
//             autoComplete="current-password"
//             disabled={loading}
//             className="
//               w-full
//               rounded-lg
//               border
//               border-gray-300
//               bg-white
//               px-3.5
//               py-2.5
//               text-sm
//               text-gray-900
//               placeholder:text-gray-400
//               outline-none
//               transition-all
//               duration-200
//               focus:border-sky-400
//               focus:ring-4
//               focus:ring-sky-50
//               disabled:cursor-not-allowed
//               disabled:bg-gray-50
//               disabled:opacity-70
//             "
//           />
//         </div>

//         {/* New Password */}

//         <div className="mt-4">
//           <label
//             htmlFor="new-password"
//             className="mb-1.5 block text-xs font-semibold text-gray-700"
//           >
//             New password
//           </label>

//           <input
//             id="new-password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter your new password"
//             autoComplete="new-password"
//             disabled={loading}
//             className="
//               w-full
//               rounded-lg
//               border
//               border-gray-300
//               bg-white
//               px-3.5
//               py-2.5
//               text-sm
//               text-gray-900
//               placeholder:text-gray-400
//               outline-none
//               transition-all
//               duration-200
//               focus:border-sky-400
//               focus:ring-4
//               focus:ring-sky-50
//               disabled:cursor-not-allowed
//               disabled:bg-gray-50
//               disabled:opacity-70
//             "
//           />

//           <p className="mt-1.5 text-[11px] text-gray-400">
//             Use at least 8 characters.
//           </p>
//         </div>

//         {/* Confirm Password */}

//         <div className="mt-4">
//           <label
//             htmlFor="confirm-password"
//             className="mb-1.5 block text-xs font-semibold text-gray-700"
//           >
//             Confirm new password
//           </label>

//           <input
//             id="confirm-password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm your new password"
//             autoComplete="new-password"
//             disabled={loading}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !loading) {
//                 handleChangePassword();
//               }
//             }}
//             className="
//               w-full
//               rounded-lg
//               border
//               border-gray-300
//               bg-white
//               px-3.5
//               py-2.5
//               text-sm
//               text-gray-900
//               placeholder:text-gray-400
//               outline-none
//               transition-all
//               duration-200
//               focus:border-sky-400
//               focus:ring-4
//               focus:ring-sky-50
//               disabled:cursor-not-allowed
//               disabled:bg-gray-50
//               disabled:opacity-70
//             "
//           />
//         </div>

//         {/* Security Information */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-2.5
//             rounded-lg
//             border
//             border-sky-100
//             bg-sky-50/70
//             px-3
//             py-2.5
//           "
//         >
//           <LuShieldCheck size={15} className="mt-0.5 shrink-0 text-sky-500" />

//           <p className="text-[11px] leading-4 text-sky-700 sm:text-xs">
//             Your current password is required to verify your identity before the
//             password can be changed.
//           </p>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FOOTER */}
//       {/* ================================================= */}

//       <div
//         className="
//           flex
//           items-center
//           justify-end
//           gap-2
//           border-t
//           border-gray-100
//           bg-gray-50/70
//           px-5
//           py-3.5
//           sm:px-6
//         "
//       >
//         {/* Cancel */}

//         <button
//           type="button"
//           onClick={onClose}
//           disabled={loading}
//           className="
//             rounded-lg
//             border
//             border-gray-300
//             bg-white
//             px-4
//             py-2
//             text-xs
//             font-medium
//             text-gray-600
//             transition-all
//             duration-200
//             hover:border-gray-400
//             hover:bg-gray-50
//             hover:text-gray-800
//             focus:outline-none
//             focus:ring-2
//             focus:ring-gray-200
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//             sm:text-sm
//           "
//         >
//           Cancel
//         </button>

//         {/* Change Password */}

//         <button
//           type="button"
//           onClick={handleChangePassword}
//           disabled={
//             loading ||
//             !currentPassword.trim() ||
//             !newPassword.trim() ||
//             !confirmPassword.trim()
//           }
//           className="
//             flex
//             min-w-[140px]
//             items-center
//             justify-center
//             gap-2
//             rounded-lg
//             bg-sky-500
//             px-4
//             py-2
//             text-xs
//             font-semibold
//             text-white
//             shadow-sm
//             transition-all
//             duration-200
//             hover:bg-sky-600
//             hover:shadow-md
//             focus:outline-none
//             focus:ring-4
//             focus:ring-sky-100
//             disabled:cursor-not-allowed
//             disabled:bg-sky-300
//             disabled:shadow-none
//             sm:text-sm
//           "
//         >
//           {loading ? (
//             <>
//               <LuLoaderCircle size={15} className="animate-spin" />
//               Changing...
//             </>
//           ) : (
//             <>
//               <LuCheck size={15} />
//               Change Password
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;

import { useContext, useState } from "react";
import {
  LuCheck,
  LuKeyRound,
  LuLoaderCircle,
  LuShieldCheck,
} from "react-icons/lu";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const ChangePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { clearUser } = useContext(UserContext);

  const handleChangePassword = async () => {
    if (!currentPassword.trim()) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from your current password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });

      toast.success(res.data?.message || "Password changed successfully.");

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = `
    w-full
    rounded-md
    border border-gray-300
    bg-white
    px-3
    py-2
    text-xs
    text-gray-900
    placeholder:text-gray-400
    outline-none
    transition-all duration-200
    focus:border-gray-500
    focus:ring-2
    focus:ring-gray-100
    disabled:cursor-not-allowed
    disabled:bg-gray-50
    disabled:opacity-70
  `;

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {/* Content */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <LuKeyRound className="text-base text-gray-800" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Account security
            </p>

            <p className="text-[11px] text-gray-400">
              Keep your account secure
            </p>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Change your password
        </h2>

        <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
          Enter your current password and choose a new password for your
          account.
        </p>

        {/* Current Password */}
        <div className="mt-4">
          <label
            htmlFor="current-password"
            className="mb-1 block text-[11px] font-semibold text-gray-700"
          >
            Current password
          </label>

          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
            autoComplete="current-password"
            disabled={loading}
            className={inputClassName}
          />
        </div>

        {/* New Password */}
        <div className="mt-3">
          <label
            htmlFor="new-password"
            className="mb-1 block text-[11px] font-semibold text-gray-700"
          >
            New password
          </label>

          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            autoComplete="new-password"
            disabled={loading}
            className={inputClassName}
          />

          <p className="mt-1 text-[10px] text-gray-400">
            Use at least 8 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mt-3">
          <label
            htmlFor="confirm-password"
            className="mb-1 block text-[11px] font-semibold text-gray-700"
          >
            Confirm new password
          </label>

          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            autoComplete="new-password"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleChangePassword();
              }
            }}
            className={inputClassName}
          />
        </div>

        {/* Security Information */}
        <div className="mt-4 flex items-start gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
          <LuShieldCheck size={14} className="mt-0.5 shrink-0 text-gray-500" />

          <p className="text-[10px] leading-4 text-gray-500">
            Your current password is required to verify your identity before the
            password can be changed.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 sm:px-6">
        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            rounded-md
            border border-gray-300
            bg-white
            px-3.5 py-1.5
            text-[11px] font-medium text-gray-600
            transition-all duration-200
            hover:border-gray-400
            hover:bg-gray-50
            hover:text-gray-800
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:text-xs
          "
        >
          Cancel
        </button>

        {/* Change Password */}
        <button
          type="button"
          onClick={handleChangePassword}
          disabled={
            loading ||
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
          }
          className="
            flex
            min-w-[130px]
            items-center
            justify-center
            gap-1.5
            rounded-md
            bg-black
            px-3.5 py-1.5
            text-[11px] font-semibold text-white
            shadow-sm
            transition-all duration-200
            hover:bg-gray-800
            hover:shadow-md
            active:scale-[0.99]
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
            disabled:cursor-not-allowed
            disabled:bg-gray-400
            disabled:shadow-none
            sm:text-xs
          "
        >
          {loading ? (
            <>
              <LuLoaderCircle size={13} className="animate-spin" />
              Changing...
            </>
          ) : (
            <>
              <LuCheck size={13} />
              Change Password
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
