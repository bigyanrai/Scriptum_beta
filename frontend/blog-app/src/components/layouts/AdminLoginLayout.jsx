import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function AdminLoginLayout({ activeMenu }) {
  return (
    <div className="sticky top-0 z-30 border-b border-gray-200/70  bg-white-200/90 w-full backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 md:h-[68px] items-center justify-between px-5 md:px-2">
        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <span className=" w-auto object-contain  font-bold">Scriptum</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginLayout;
