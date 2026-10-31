// import { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { LuLoaderCircle, LuUserPlus, LuShieldCheck } from "react-icons/lu";

// import Input from "../Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
// import uploadImage from "../../utils/uploadImage";

// function AdminSignupPage({ setCurrentPage }) {
//   const [profilePic, setProfilePic] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [adminAccessToken, setAdminAccessToken] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { updateUser, setOpenAuthForm } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     // Validation
//     if (!fullName.trim()) {
//       setError("Please enter your full name.");
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

//     let profileImageUrl = "";

//     try {
//       // Upload profile image if selected
//       if (profilePic) {
//         const imgUploadRes = await uploadImage(profilePic);

//         profileImageUrl = imgUploadRes?.imageUrl || "";

//         if (!profileImageUrl) {
//           throw new Error("Profile image upload failed.");
//         }
//       }

//       // Register account
//       const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//         name: fullName.trim(),
//         email: email.trim(),
//         password,
//         profileImageUrl,
//         adminAccessToken: adminAccessToken.trim(),
//       });

//       const { token, role } = response.data;

//       if (!token) {
//         setError("Account creation failed. Please try again.");
//         return;
//       }

//       localStorage.setItem("token", token);
//       updateUser(response.data);

//       // Admin account
//       if (role === "admin") {
//         setOpenAuthForm(false);
//         navigate("/admin/dashboard");
//         return;
//       }

//       // Normal member account
//       setOpenAuthForm(false);
//       navigate("/");
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else if (error.message === "Profile image upload failed.") {
//         setError("Unable to upload your profile image. Please try again.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-12">
//       <div className="mx-auto w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-7 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
//             <LuShieldCheck className="text-2xl" />
//           </div>

//           <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//             Create Account
//           </h2>

//           <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-500 sm:text-sm">
//             Create your account using the details below. An admin invite token
//             can be used to create an administrator account.
//           </p>
//         </div>

//         <form onSubmit={handleSignUp}>
//           {/* Profile photo */}
//           <div className="mb-7 flex justify-center">
//             <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
//           </div>

//           {/* Form fields */}
//           <div className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2">
//             <Input
//               value={fullName}
//               onChange={({ target }) => {
//                 setFullName(target.value);
//                 if (error) setError("");
//               }}
//               label="Full Name"
//               placeholder="John Doe"
//               type="text"
//             />

//             <Input
//               value={email}
//               onChange={({ target }) => {
//                 setEmail(target.value);
//                 if (error) setError("");
//               }}
//               label="Email Address"
//               placeholder="john@example.com"
//               type="email"
//             />

//             <Input
//               value={password}
//               onChange={({ target }) => {
//                 setPassword(target.value);
//                 if (error) setError("");
//               }}
//               label="Password"
//               placeholder="Min 8 Characters"
//               type="password"
//             />

//             <Input
//               value={adminAccessToken}
//               onChange={({ target }) => {
//                 setAdminAccessToken(target.value);
//                 if (error) setError("");
//               }}
//               label="Admin Invite Token"
//               placeholder="6 Digit Code"
//               type="number"
//             />
//           </div>

//           {/* Token information */}
//           <div className="mt-2 rounded-md bg-gray-50 px-3 py-2.5">
//             <p className="text-center text-[11px] leading-4 text-gray-500 sm:text-xs">
//               The admin invite token is optional. Leave it empty to create a
//               regular member account.
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mt-4 rounded-md border border-red-100 bg-red-50 px-3 py-2.5">
//               <p className="text-xs leading-5 text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-all duration-200 ${
//               loading
//                 ? "cursor-not-allowed bg-sky-400"
//                 : "bg-sky-500 hover:bg-sky-600 active:scale-[0.99]"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <LuLoaderCircle className="animate-spin text-lg" />
//                 <span>
//                   {profilePic
//                     ? "Uploading & Creating..."
//                     : "Creating Account..."}
//                 </span>
//               </>
//             ) : (
//               <>
//                 <LuUserPlus className="text-base" />
//                 <span>CREATE ACCOUNT</span>
//               </>
//             )}
//           </button>

//           {/* Login */}
//           <div className="mt-6 border-t border-gray-100 pt-5 text-center">
//             <p className="text-xs text-gray-600 sm:text-[13px]">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 disabled={loading}
//                 className="font-medium text-sky-600 underline underline-offset-2 transition-colors hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 onClick={() => setCurrentPage("login")}
//               >
//                 Login
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminSignupPage;

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuLoaderCircle, LuUserPlus, LuShieldCheck } from "react-icons/lu";

import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImage";

function AdminSignupPage({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!fullName.trim()) {
      setError("Please enter your full name.");
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

    let profileImageUrl = "";

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);

        profileImageUrl = imgUploadRes?.imageUrl || "";

        if (!profileImageUrl) {
          throw new Error("Profile image upload failed.");
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName.trim(),
        email: email.trim(),
        password,
        profileImageUrl,
        adminAccessToken: adminAccessToken.trim(),
      });

      const { token, role } = response.data;

      if (!token) {
        setError("Account creation failed. Please try again.");
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
      } else if (error.message === "Profile image upload failed.") {
        setError("Unable to upload your profile image. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-3 py-2 ">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-2 text-center">
          <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <LuShieldCheck className="text-base" />
          </div>

          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Create Account
          </h2>

          <p className="mx-auto mt-0.5 max-w-xs text-[9px] leading-3 text-gray-500">
            Create your account using the details below. An admin invite token
            can be used to create an administrator account.
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          {/* Profile photo */}
          <div className="mb-2 flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2">
            <Input
              value={fullName}
              onChange={({ target }) => {
                setFullName(target.value);
                if (error) setError("");
              }}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
                if (error) setError("");
              }}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
                if (error) setError("");
              }}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />

            <Input
              value={adminAccessToken}
              onChange={({ target }) => {
                setAdminAccessToken(target.value);
                if (error) setError("");
              }}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="number"
            />
          </div>

          {/* Token information */}
          <div className="mt-1 rounded bg-gray-50 px-2 py-1">
            <p className="text-center text-[9px] leading-3 text-gray-500">
              Admin invite token is optional. Leave empty for a regular member
              account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-1.5 rounded border border-red-100 bg-red-50 px-2 py-1">
              <p className="text-[9px] leading-3 text-red-600">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 flex h-8 w-full items-center justify-center gap-1 rounded-md text-[11px] font-semibold text-white transition-all duration-200 ${
              loading
                ? "cursor-not-allowed bg-black/70"
                : "bg-black hover:bg-gray-600 active:scale-[0.99] cursor-pointer "
            }`}
          >
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin text-xs" />
                <span>
                  {profilePic
                    ? "Uploading & Creating..."
                    : "Creating Account..."}
                </span>
              </>
            ) : (
              <>
                <LuUserPlus className="text-xs" />
                <span>CREATE ACCOUNT</span>
              </>
            )}
          </button>

          {/* Login */}
          <div className="mt-2 border-t border-gray-100 pt-1.5 text-center">
            <p className="text-[9px] text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                disabled={loading}
                className="font-medium cursor-pointer text-black hover:underline  transition-colors  disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignupPage;
