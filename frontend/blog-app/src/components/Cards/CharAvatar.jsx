import { getInitials } from "../../utils/helper";

function CharAvatar({ fullName, width, height, style }) {
  return (
    <div
      className={`${width || ""} ${
        height || ""
      } bg-gray-100 ${style || ""} flex items-center justify-center rounded-full text-gray-900 font-medium `}
    >
      {getInitials(fullName || "")}
    </div>
  );
}

export default CharAvatar;
