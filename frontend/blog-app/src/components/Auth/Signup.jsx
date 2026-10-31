// import { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { LuLoaderCircle, LuUserPlus } from "react-icons/lu";

// import Input from "../Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
// import uploadImage from "../../utils/uploadImage";

// function Signup({ setCurrentPage }) {
//   const [profilePic, setProfilePic] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [adminAccessToken, setAdminAccessToken] = useState("");

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { updateUser, setOpenAuthForm } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (loading) return;

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
//       if (profilePic) {
//         const imgUploadRes = await uploadImage(profilePic);
//         profileImageUrl = imgUploadRes.imageUrl || "";
//       }

//       const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//         name: fullName,
//         email,
//         password,
//         profileImageUrl,
//         adminAccessToken,
//       });

//       const { token, role } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(response.data);

//         if (role === "admin") {
//           setOpenAuthForm(false);
//           navigate("/admin/dashboard");
//           return;
//         }

//         setOpenAuthForm(false);
//         navigate("/");
//       }
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
//     <div className="px-5 py-4 sm:px-6 sm:py-5">
//       {/* Header */}
//       <div className="mb-3 text-center">
//         <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
//           <LuUserPlus className="text-base text-gray-800" />
//         </div>

//         <h3 className="text-lg font-semibold tracking-tight text-gray-900">
//           Create an account
//         </h3>

//         <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
//           Join us today by entering your details below.
//         </p>
//       </div>

//       <form onSubmit={handleSignUp}>
//         {/* Profile Photo */}
//         <div className="mb-2 flex justify-center">
//           <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
//         </div>

//         {/* Inputs */}
//         <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
//           <Input
//             value={fullName}
//             onChange={({ target }) => setFullName(target.value)}
//             label="Full Name"
//             placeholder="John Doe"
//             type="text"
//           />

//           <Input
//             value={email}
//             onChange={({ target }) => setEmail(target.value)}
//             label="Email Address"
//             placeholder="john@example.com"
//             type="text"
//           />

//           <Input
//             value={password}
//             onChange={({ target }) => setPassword(target.value)}
//             label="Password"
//             placeholder="Min 8 Characters"
//             type="password"
//           />

//           <Input
//             value={adminAccessToken}
//             onChange={({ target }) => setAdminAccessToken(target.value)}
//             label="Admin Invite Token"
//             placeholder="6 Digit Code"
//             type="number"
//           />
//         </div>

//         {/* Admin Token Information */}
//         <p className="mt-0 text-center text-[9px] leading-3 text-gray-400">
//           Admin invite token is optional. Leave empty for a regular member
//           account.
//         </p>

//         {/* Error */}
//         {error && (
//           <div className="mt-2 rounded-md border border-red-100 bg-red-50 px-3 py-1.5">
//             <p className="text-[10px] leading-4 text-red-600">{error}</p>
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
//               <span>Creating Account...</span>
//             </>
//           ) : (
//             <>
//               <LuUserPlus className="text-sm" />
//               <span>CREATE ACCOUNT</span>
//             </>
//           )}
//         </button>

//         {/* Login */}
//         <div className="mt-2.5 text-center">
//           <p className="text-[11px] text-gray-500">
//             Already have an account?{" "}
//             <button
//               type="button"
//               disabled={loading}
//               className="
//                 font-semibold text-gray-800
//                 transition-colors
//                 hover:text-black
//                 hover:underline
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//               onClick={() => {
//                 setCurrentPage("login");
//               }}
//             >
//               Login
//             </button>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuLoaderCircle, LuUserPlus } from "react-icons/lu";

import Input from "../Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImage";

function Signup({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");

  const [error, setError] = useState(null);
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
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminAccessToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
          return;
        }

        setOpenAuthForm(false);
        navigate("/");
      }
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
    <div className="px-5 py-4 sm:px-6 sm:py-5">
      {/* Header */}
      <div className="mb-3 text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <LuUserPlus className="text-base text-gray-800" />
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-gray-900">
          Create an account
        </h3>

        <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
          Join us today by entering your details below.
        </p>
      </div>

      <form onSubmit={handleSignUp}>
        {/* Profile Photo */}
        <div className="mb-2 flex justify-center">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          <Input
            value={adminAccessToken}
            onChange={({ target }) => setAdminAccessToken(target.value)}
            label="Admin Invite Token"
            placeholder="6 Digit Code"
            type="number"
          />
        </div>

        {/* Admin Token Information */}
        <p className="mt-0 text-center text-[9px] leading-3 text-gray-400">
          Admin invite token is optional. Leave empty for a regular member
          account.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-2 rounded-md border border-red-100 bg-red-50 px-3 py-1.5">
            <p className="text-[10px] leading-4 text-red-600">{error}</p>
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
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <LuUserPlus className="text-sm" />
              <span>CREATE ACCOUNT</span>
            </>
          )}
        </button>

        {/* Login */}
        <div className="mt-2.5 text-center">
          <p className="text-[11px] text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              disabled={loading}
              className="
                cursor-pointer
                font-semibold text-gray-800
                transition-colors
                hover:text-black
                hover:underline
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              onClick={() => {
                setCurrentPage("login");
              }}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
