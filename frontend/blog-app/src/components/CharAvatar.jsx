const CharAvatar = ({
  fullName = "",
  width = "w-9",
  height = "h-9",
  textSize = "text-sm",
  className = "",
}) => {
  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "";

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div
      className={`
        flex
        ${width}
        ${height}
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-gray-100
        ${textSize}
        font-semibold
        uppercase
        text-gray-700
        ${className}
      `}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
