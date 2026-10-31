// // import { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import { LuLoaderCircle, LuUpload } from "react-icons/lu";
// // import axiosInstance from "../../src/utils/axiosInstance";
// // import { API_PATHS } from "../../src/utils/apiPaths";
// // import { validateEmail } from "../utils/helper";
// // import uploadImage from "../utils/uploadImage";

// // const EditMemberModal = ({ member, onClose, onSuccess }) => {
// //   const [loading, setLoading] = useState(false);

// //   const [profileImage, setProfileImage] = useState(null);
// //   const [previewImage, setPreviewImage] = useState("");

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     role: "member",
// //   });

// //   useEffect(() => {
// //     if (member) {
// //       setFormData({
// //         name: member.name,
// //         email: member.email,
// //         role: member.role,
// //       });

// //       setPreviewImage(member.profileImageUrl);
// //     }
// //   }, [member]);

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];

// //     if (!file) return;

// //     setProfileImage(file);
// //     setPreviewImage(URL.createObjectURL(file));
// //   };

// //   const handleUpdate = async () => {
// //     if (!formData.name.trim()) {
// //       toast.error("Please enter full name.");
// //       return;
// //     }

// //     if (!validateEmail(formData.email)) {
// //       toast.error("Please enter a valid email address.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       let profileImageUrl = member.profileImageUrl;

// //       // Upload new image only if user selected one
// //       if (profileImage) {
// //         const imgUploadRes = await uploadImage(profileImage);
// //         profileImageUrl = imgUploadRes.imageUrl || member.profileImageUrl;
// //       }

// //       await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER_BY_ID(member._id), {
// //         name: formData.name,
// //         email: formData.email,
// //         role: formData.role,
// //         profileImageUrl,
// //       });

// //       toast.success("Member updated successfully");

// //       onSuccess();
// //       onClose();
// //     } catch (error) {
// //       toast.error(
// //         error.response?.data?.message ||
// //           "Something went wrong. Please try again.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className=" p-5">
// //       <p className="text-sm text-gray-500 mb-6">
// //         Update member information and permissions.
// //       </p>

// //       {/* Profile Image */}
// //       <div className="flex flex-col items-center mb-7">
// //         <img
// //           src={previewImage}
// //           alt={formData.name}
// //           className="w-24 h-24 rounded-full object-cover border-4 border-sky-100 shadow"
// //         />

// //         <label className="mt-3 flex items-center gap-2 text-sky-600 text-sm font-medium cursor-pointer hover:text-sky-700 transition">
// //           <LuUpload />
// //           Change Photo
// //           <input
// //             hidden
// //             type="file"
// //             accept="image/*"
// //             onChange={handleImageChange}
// //           />
// //         </label>
// //       </div>

// //       {/* Name */}
// //       <div className="mb-4">
// //         <label className="block text-sm font-medium mb-2">Full Name</label>

// //         <input
// //           type="text"
// //           name="name"
// //           value={formData.name}
// //           onChange={handleChange}
// //           className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
// //         />
// //       </div>

// //       {/* Email */}
// //       <div className="mb-4">
// //         <label className="block text-sm font-medium mb-2">Email Address</label>

// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
// //         />
// //       </div>

// //       {/* Role */}
// //       <div className="mb-7">
// //         <label className="block text-sm font-medium mb-2">Role</label>

// //         <select
// //           name="role"
// //           value={formData.role}
// //           onChange={handleChange}
// //           className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
// //         >
// //           <option value="member">Member</option>
// //           <option value="admin">Admin</option>
// //         </select>
// //       </div>

// //       {/* Buttons */}
// //       <div className="flex justify-end gap-3">
// //         <button
// //           onClick={onClose}
// //           disabled={loading}
// //           className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium transition cursor-pointer"
// //         >
// //           Cancel
// //         </button>

// //         <button
// //           onClick={handleUpdate}
// //           disabled={loading}
// //           className="min-w-[140px] flex justify-center items-center gap-2 px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition cursor-pointer"
// //         >
// //           {loading ? (
// //             <>
// //               <LuLoaderCircle className="animate-spin text-lg" />
// //               Updating...
// //             </>
// //           ) : (
// //             "Save Changes"
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditMemberModal;

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { LuLoaderCircle, LuUpload } from "react-icons/lu";
// import axiosInstance from "../../src/utils/axiosInstance";
// import { API_PATHS } from "../../src/utils/apiPaths";
// import { validateEmail } from "../utils/helper";
// import uploadImage from "../utils/uploadImage";

// const EditMemberModal = ({ member, onClose, onSuccess }) => {
//   const [loading, setLoading] = useState(false);

//   const [profileImage, setProfileImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "member",
//   });

//   useEffect(() => {
//     if (member) {
//       setFormData({
//         name: member.name,
//         email: member.email,
//         role: member.role,
//       });

//       setPreviewImage(member.profileImageUrl);
//     }
//   }, [member]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     setProfileImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleUpdate = async () => {
//     if (!formData.name.trim()) {
//       toast.error("Please enter full name.");
//       return;
//     }

//     if (!validateEmail(formData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       setLoading(true);

//       let profileImageUrl = member.profileImageUrl;

//       if (profileImage) {
//         const imgUploadRes = await uploadImage(profileImage);
//         profileImageUrl = imgUploadRes.imageUrl || member.profileImageUrl;
//       }

//       await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER_BY_ID(member._id), {
//         name: formData.name,
//         email: formData.email,
//         role: formData.role,
//         profileImageUrl,
//       });

//       toast.success("Member updated successfully");

//       onSuccess();
//       onClose();
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <p className="mb-4 text-xs text-gray-500">
//         Update member information and permissions.
//       </p>

//       {/* Profile Image */}
//       <div className="mb-5 flex flex-col items-center">
//         <img
//           src={previewImage}
//           alt={formData.name}
//           className="h-20 w-20 rounded-full border-4 border-sky-50 object-cover shadow-sm"
//         />

//         <label className="mt-2 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-sky-600 transition hover:text-sky-700">
//           <LuUpload className="text-sm" />
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
//       <div className="mb-3">
//         <label className="mb-1.5 block text-xs font-medium text-gray-700">
//           Full Name
//         </label>

//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           disabled={loading}
//           className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-3">
//         <label className="mb-1.5 block text-xs font-medium text-gray-700">
//           Email Address
//         </label>

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           disabled={loading}
//           className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
//         />
//       </div>

//       {/* Role */}
//       <div className="mb-5">
//         <label className="mb-1.5 block text-xs font-medium text-gray-700">
//           Role
//         </label>

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           disabled={loading}
//           className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
//         >
//           <option value="member">Member</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-2">
//         <button
//           type="button"
//           onClick={onClose}
//           disabled={loading}
//           className="rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           Cancel
//         </button>

//         <button
//           type="button"
//           onClick={handleUpdate}
//           disabled={loading}
//           className="inline-flex min-w-[125px] items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
//         >
//           {loading ? (
//             <>
//               <LuLoaderCircle className="animate-spin text-sm" />
//               Updating...
//             </>
//           ) : (
//             "Save Changes"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditMemberModal;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLoaderCircle, LuUpload } from "react-icons/lu";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";
import { validateEmail } from "../utils/helper";
import uploadImage from "../utils/uploadImage";
import CharAvatar from "../components/CharAvatar";

const EditMemberModal = ({ member, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "member",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role,
      });

      setPreviewImage(member.profileImageUrl || "");
      setProfileImage(null);
    }
  }, [member]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter full name.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      let profileImageUrl = member.profileImageUrl;

      // Upload new image only if user selected one
      if (profileImage) {
        const imgUploadRes = await uploadImage(profileImage);

        profileImageUrl = imgUploadRes.imageUrl || member.profileImageUrl;
      }

      await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER_BY_ID(member._id), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        profileImageUrl,
      });

      toast.success("Member updated successfully");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="mb-4 text-xs text-gray-500">
        Update member information and permissions.
      </p>

      {/* Profile Image */}
      <div className="mb-5 flex flex-col items-center">
        {previewImage ? (
          <img
            src={previewImage}
            alt={formData.name}
            className="h-20 w-20 rounded-full border-4 border-sky-50 object-cover shadow-sm"
          />
        ) : (
          <CharAvatar
            fullName={formData.name}
            width="w-20"
            height="h-20"
            style="border-4 border-sky-50 text-lg shadow-sm"
          />
        )}

        <label className="mt-2 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-sky-600 transition hover:text-sky-700">
          <LuUpload className="text-sm" />
          Change Photo
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Name */}
      <div className="mb-3">
        <label className="mb-1.5 block text-xs font-medium text-gray-700">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="mb-1.5 block text-xs font-medium text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
        />
      </div>

      {/* Role */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-medium text-gray-700">
          Role
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-50 disabled:bg-gray-50"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className="inline-flex min-w-[125px] items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <LuLoaderCircle className="animate-spin text-sm" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditMemberModal;
