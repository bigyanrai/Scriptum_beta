// import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { LuLoaderCircle, LuUpload } from "react-icons/lu";
// import { UserContext } from "../../context/userContext";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import uploadImage from "../../utils/uploadImage";

// const EditProfile = ({ onClose, onSuccess }) => {
//   const { user, setUser } = useContext(UserContext);

//   const [loading, setLoading] = useState(false);

//   const [profileImage, setProfileImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");

//   const [name, setName] = useState("");

//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//       setPreviewImage(user.profileImageUrl || "");
//     }
//   }, [user]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     setProfileImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleUpdate = async () => {
//     if (!name.trim()) {
//       toast.error("Please enter your full name.");
//       return;
//     }

//     try {
//       setLoading(true);

//       let profileImageUrl = user.profileImageUrl;

//       if (profileImage) {
//         const imgUploadRes = await uploadImage(profileImage);
//         profileImageUrl = imgUploadRes.imageUrl || user.profileImageUrl;
//       }

//       const response = await axiosInstance.put(
//         API_PATHS.AUTH.UPDATE_USER_BY_ID(user._id),
//         {
//           name,
//           profileImageUrl,
//         },
//       );

//       setUser(response.data.user);

//       toast.success("Profile updated successfully.");

//       onSuccess?.();

//       onClose();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-[90vw] max-w-[380px] p-5">
//       <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>

//       <p className="mt-1 mb-5 text-xs text-gray-500">
//         Update your profile information.
//       </p>

//       {/* Profile Image */}
//       <div className="mb-6 flex flex-col items-center">
//         {previewImage ? (
//           <img
//             src={previewImage}
//             alt={name}
//             className="h-20 w-20 rounded-full border-2 border-sky-100 object-cover"
//           />
//         ) : (
//           <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-2xl font-semibold text-sky-600">
//             {name.charAt(0).toUpperCase()}
//           </div>
//         )}

//         <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-sm border border-sky-200 px-3 py-1.5 text-xs font-medium text-sky-600 transition hover:bg-sky-50">
//           <LuUpload size={15} />
//           Change Photo
//           <input
//             hidden
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </label>
//       </div>

//       {/* Name */}
//       <div className="mb-4">
//         <label className="mb-1.5 block text-xs font-medium text-gray-700">
//           Full Name
//         </label>

//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full rounded-sm border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-6">
//         <label className="mb-1.5 block text-xs font-medium text-gray-700">
//           Email Address
//         </label>

//         <input
//           type="email"
//           value={user?.email || ""}
//           disabled
//           className="w-full cursor-not-allowed rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
//         />

//         <p className="mt-1 text-[11px] text-gray-400">
//           Email address cannot be changed.
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-2">
//         <button
//           onClick={onClose}
//           disabled={loading}
//           className="cursor-pointer rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={handleUpdate}
//           disabled={loading}
//           className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-sm bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
//         >
//           {loading ? (
//             <>
//               <LuLoaderCircle className="animate-spin text-base" />
//               Saving...
//             </>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  LuCamera,
  LuCheck,
  LuLoaderCircle,
  LuTrash2,
  LuUpload,
  LuUser,
} from "react-icons/lu";

import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const EditProfile = ({ onClose, onSuccess }) => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPreviewImage(user.profileImageUrl || "");
      setProfileImage(null);
      setRemoveProfileImage(false);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewImage("");
    setRemoveProfileImage(true);
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    try {
      setLoading(true);

      let profileImageUrl = user?.profileImageUrl || "";

      // =====================================================
      // REMOVE CURRENT PROFILE IMAGE
      // =====================================================

      if (removeProfileImage) {
        profileImageUrl = "";
      }

      // =====================================================
      // UPLOAD NEW PROFILE IMAGE
      // =====================================================

      if (profileImage) {
        const imgUploadRes = await uploadImage(profileImage);

        profileImageUrl = imgUploadRes.imageUrl || profileImageUrl;
      }

      // =====================================================
      // UPDATE USER
      // =====================================================

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_USER_BY_ID(user._id),
        {
          name: name.trim(),
          profileImageUrl,
        },
      );

      // =====================================================
      // UPDATE CONTEXT
      // =====================================================

      setUser(response.data.user);

      toast.success("Profile updated successfully.");

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const initials = name?.trim() ? name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-gray-100 px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <LuUser size={17} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-gray-900">
              Edit Profile
            </h2>

            <p className="text-[11px] text-gray-400">
              Update your profile information.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-5 py-4 sm:px-6">
        {/* =================================================
            PROFILE PHOTO
        ================================================= */}

        <div className="mb-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Profile Photo
          </p>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50/60 px-4 py-3">
            {/* Avatar */}

            <div className="relative shrink-0">
              <div
                className="
                  h-16
                  w-16
                  overflow-hidden
                  rounded-full
                  border-2
                  border-white
                  bg-gray-100
                  shadow-sm
                  ring-1
                  ring-gray-200
                "
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-gray-100
                      text-xl
                      font-semibold
                      text-gray-500
                    "
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* Camera */}

              <label
                htmlFor="profile-image"
                className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-6
                  w-6
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-gray-900
                  text-white
                  shadow-sm
                  transition
                  hover:bg-gray-700
                "
                title="Change profile photo"
              >
                <LuCamera size={11} />

                <input
                  id="profile-image"
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </label>
            </div>

            {/* Upload Info */}

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-700">
                Profile picture
              </p>

              <p className="mt-0.5 text-[10px] text-gray-400">
                JPG, PNG or WebP
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {/* Change Photo */}

                <label
                  htmlFor="profile-image-button"
                  className="
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-gray-600
                    shadow-sm
                    transition
                    hover:border-gray-300
                    hover:bg-gray-50
                  "
                >
                  <LuUpload size={12} />
                  Change Photo
                  <input
                    id="profile-image-button"
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                </label>

                {/* Remove Photo */}

                {(previewImage || user?.profileImageUrl) && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={loading}
                    className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-1.5
                      rounded-md
                      border
                      border-red-100
                      bg-white
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-red-500
                      transition
                      hover:border-red-200
                      hover:bg-red-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <LuTrash2 size={11} />
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Selected File */}

            {profileImage && (
              <div className="hidden shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-600 sm:flex">
                <LuCheck size={10} />

                <span className="max-w-[120px] truncate">
                  {profileImage.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="space-y-3.5">
          {/* Name */}

          <div>
            <label
              htmlFor="profile-name"
              className="mb-1 block text-[11px] font-semibold text-gray-700"
            >
              Full Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="Enter your full name"
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                bg-white
                px-3
                py-2
                text-xs
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-300
                hover:border-gray-300
                focus:border-gray-900
                focus:ring-2
                focus:ring-gray-100
                disabled:cursor-not-allowed
                disabled:bg-gray-50
              "
            />
          </div>

          {/* Email */}

          <div>
            <label
              htmlFor="profile-email"
              className="mb-1 block text-[11px] font-semibold text-gray-700"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                id="profile-email"
                type="email"
                value={user?.email || ""}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  py-2
                  pr-9
                  text-xs
                  text-gray-500
                  outline-none
                "
              />

              <LuCheck
                size={13}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-300
                "
              />
            </div>

            <p className="mt-1 text-[10px] text-gray-400">
              Email address cannot be changed.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-end
          gap-2
          border-t
          border-gray-100
          bg-gray-50/50
          px-5
          py-3
          sm:px-6
        "
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            cursor-pointer
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3.5
            py-2
            text-[11px]
            font-semibold
            text-gray-600
            shadow-sm
            transition
            hover:border-gray-300
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className="
            flex
            min-w-[115px]
            cursor-pointer
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-gray-900
            px-3.5
            py-2
            text-[11px]
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-black
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <LuLoaderCircle size={13} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <LuCheck size={13} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
