// const BlogPostIdeaCard = ({ title, description, tags, tone, onSelect }) => {
//   return (
//     <div
//       className="border-b border-gray-100 hover:bg-gray-100/60 px-6 py-5 cursor-pointer"
//       onClick={onSelect}
//     >
//       <h3 className="text-sm text-black font-medium">
//         {title}{" "}
//         <span className="text-xs text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded">
//           {tone}
//         </span>
//       </h3>
//       <p className="text-xs font-medium text-gray-600/70 mt-1">{description}</p>
//       <div className="flex items-center gap-2.5 mt-2">
//         {tags.map((tag, index) => (
//           <div
//             key={`tag_${index}`}
//             className="text-xs text-sky-700 font-medium bg-sky-50 px-2.5 py-1 rounded"
//           >
//             {tag}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPostIdeaCard;

import { LuArrowUpRight, LuSparkles } from "react-icons/lu";

const BlogPostIdeaCard = ({
  title,
  description,
  tags = [],
  tone,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="
        group
        w-full
        border-b border-slate-100
        bg-white
        px-4 py-4
        text-left
        transition-all duration-200
        hover:bg-slate-50
        focus:outline-none
        focus:bg-sky-50/40
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className="
              text-xs
              font-semibold
              leading-5
              text-slate-800
              transition-colors
              group-hover:text-sky-600
            "
            >
              {title}
            </h3>

            {tone && (
              <span
                className="
                inline-flex
                shrink-0
                items-center
                gap-1
                rounded-md
                bg-amber-50
                px-1.5 py-0.5
                text-[9px]
                font-semibold
                capitalize
                text-amber-700
              "
              >
                <LuSparkles size={9} />
                {tone}
              </span>
            )}
          </div>

          <p
            className="
            mt-1.5
            line-clamp-2
            text-[11px]
            leading-4
            text-slate-500
          "
          >
            {description}
          </p>
        </div>

        <div
          className="
          mt-0.5
          flex h-6 w-6
          shrink-0
          items-center justify-center
          rounded-md
          text-slate-300
          transition-all
          group-hover:bg-sky-100
          group-hover:text-sky-600
        "
        >
          <LuArrowUpRight size={14} />
        </div>
      </div>

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag, index) => (
            <span
              key={`tag_${index}`}
              className="
                rounded-md
                border border-slate-200
                bg-slate-50
                px-2 py-0.5
                text-[9px]
                font-medium
                text-slate-500
              "
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};

export default BlogPostIdeaCard;
