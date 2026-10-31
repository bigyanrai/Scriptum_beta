import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-6 z-[9999]
      flex h-12 w-12 items-center justify-center
      rounded-full bg-black text-white shadow-lg
      transition-all duration-300
      hover:bg-sky-600 hover:scale-110
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <LuArrowUp size={22} />
    </button>
  );
};

export default BackToTop;
