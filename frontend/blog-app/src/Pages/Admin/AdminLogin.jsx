import { useState } from "react";

import Signup from "../../components/Auth/Signup";
import ForgotPassword from "../../components/Auth/AdminForgotPassword";

import AdminLoginPage from "../../components/Auth/AdminLoginPage";
import AdminLoginLayout from "../../components/layouts/AdminLoginLayout";
import AdminForgotPassword from "../../components/Auth/AdminForgotPassword";
import AdminSignupPage from "../../components/Auth/AdminSignupPage";

const AdminLogin = () => {
  const [currentPage, setCurrentPage] = useState("login");
  console.log("Current active page state:", currentPage);
  return (
    <>
      <AdminLoginLayout />
      {/* <div className="min-h-[calc(100vh-67px)] flex items-center justify-center"> */}
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
          {/* {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
            ) : (
            <Signup setCurrentPage={setCurrentPage} />
          )} */}
          {currentPage === "login" && (
            <AdminLoginPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "forgot-password" && (
            <AdminForgotPassword setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <AdminSignupPage setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
