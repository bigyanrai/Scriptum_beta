import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

const BackButton = ({ label = "Back", onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`
        group
        inline-flex
        items-center
        gap-1.5
        mb-3
       -translate-x-1
        text-sm
        font-medium
        text-gray-500
        transition-colors
        duration-200
        hover:text-gray-900
        cursor-pointer
        ${className}
      `}
    >
      <LuArrowLeft
        size={20}
        className="
        
          transition-transform
          duration-200
          group-hover:-translate-x-2
        "
      />

      <span>{label}</span>
    </button>
  );
};

export default BackButton;
