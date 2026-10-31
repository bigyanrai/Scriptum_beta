// import { useNavigate } from "react-router-dom";
// import moment from "moment";

// import { LuArrowUpRight, LuLayers3, LuSparkles } from "react-icons/lu";

// const ExploreCluster = ({ cluster, onBlogClick, index }) => {
//   const navigate = useNavigate();

//   const blogs = cluster.blogs || [];

//   if (!blogs.length) return null;

//   const featured = blogs[0];
//   const secondaryBlogs = blogs.slice(1, 3);

//   return (
//     <section className="relative">
//       {/* ================================================= */}
//       {/* CLUSTER HEADER */}
//       {/* ================================================= */}

//       <div className="flex flex-col gap-5 mb-7">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-start gap-3">
//             {/* Cluster number */}

//             <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
//               <span className="text-sm font-semibold text-gray-500">
//                 {String(index + 1).padStart(2, "0")}
//               </span>
//             </div>

//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <LuLayers3 className="text-gray-400" size={15} />

//                 <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gray-400">
//                   Topic
//                 </span>
//               </div>

//               <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 capitalize">
//                 {cluster.title}
//               </h2>

//               <p className="text-sm text-gray-500 mt-1.5 max-w-2xl">
//                 A collection of articles connected by{" "}
//                 <span className="font-medium text-gray-700">
//                   {cluster.keywords.slice(0, 4).join(", ")}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* View all */}

//           <button
//             onClick={() => navigate(`/explore/${cluster.cluster}`)}
//             className="
//               hidden sm:flex
//               shrink-0
//               items-center
//               gap-1.5
//               text-sm
//               font-medium
//               text-gray-500
//               hover:text-gray-900
//               transition
//               cursor-pointer
//             "
//           >
//             Explore all
//             <LuArrowUpRight size={16} />
//           </button>
//         </div>

//         {/* Keywords */}

//         <div className="flex flex-wrap gap-2 pl-0 sm:pl-[52px]">
//           {cluster.keywords.slice(0, 5).map((keyword) => (
//             <button
//               key={keyword}
//               onClick={() => navigate(`/tags/${keyword}`)}
//               className="
//                 rounded-sm
//                 border
//                 border-gray-200
//                 bg-gray-50
//                 px-2.5
//                 py-1
//                 text-[11px]
//                 font-medium
//                 text-gray-500
//                 hover:border-gray-300
//                 hover:bg-gray-100
//                 hover:text-gray-800
//                 transition
//                 cursor-pointer
//               "
//             >
//               #{keyword}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* ARTICLES */}
//       {/* ================================================= */}

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
//         {/* ================================================= */}
//         {/* FEATURED ARTICLE */}
//         {/* ================================================= */}

//         <article
//           onClick={() => onBlogClick(featured)}
//           className="
//             lg:col-span-3
//             group
//             cursor-pointer
//             overflow-hidden
//             rounded-2xl
//             border
//             border-gray-200
//             bg-white
//             transition-all
//             duration-300
//             hover:-translate-y-1
//             hover:shadow-xl
//           "
//         >
//           <div className="relative h-64 sm:h-80 overflow-hidden">
//             <img
//               src={featured.coverImageUrl}
//               alt={featured.title}
//               className="
//                 w-full
//                 h-full
//                 object-cover
//                 transition-transform
//                 duration-500
//                 group-hover:scale-[1.03]
//               "
//             />

//             {/* Gradient */}

//             <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent" />

//             {/* Featured label */}

//             <div className="absolute top-4 left-4">
//               <span
//                 className="
//                 inline-flex
//                 items-center
//                 gap-1.5
//                 rounded-full
//                 bg-white/90
//                 backdrop-blur-sm
//                 px-3
//                 py-1.5
//                 text-[11px]
//                 font-semibold
//                 text-gray-800
//               "
//               >
//                 <LuSparkles size={12} />
//                 Featured
//               </span>
//             </div>
//           </div>

//           <div className="p-5">
//             <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
//               <span>
//                 {featured.updatedAt
//                   ? moment(featured.updatedAt).format("Do MMM YYYY")
//                   : "-"}
//               </span>

//               <span>•</span>

//               <span>{featured.views || 0} views</span>
//             </div>

//             <h3
//               className="
//               text-xl
//               sm:text-2xl
//               font-bold
//               leading-tight
//               text-gray-900
//               group-hover:text-gray-700
//               transition
//             "
//             >
//               {featured.title}
//             </h3>

//             <p
//               className="
//               mt-3
//               text-sm
//               leading-6
//               text-gray-500
//               line-clamp-2
//             "
//             >
//               {featured.content}
//             </p>

//             <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
//               <div className="flex items-center gap-2">
//                 <img
//                   src={
//                     featured.author?.profileImageUrl ||
//                     "http://localhost:8000/uploads/avatar/avatar.svg"
//                   }
//                   alt=""
//                   className="w-7 h-7 rounded-full object-cover"
//                 />

//                 <span className="text-xs font-medium text-gray-600">
//                   {featured.author?.name ||
//                     featured.authorName ||
//                     "Deleted User"}
//                 </span>
//               </div>

//               <LuArrowUpRight
//                 size={18}
//                 className="
//                   text-gray-400
//                   transition-transform
//                   duration-300
//                   group-hover:translate-x-1
//                   group-hover:-translate-y-1
//                 "
//               />
//             </div>
//           </div>
//         </article>

//         {/* ================================================= */}
//         {/* SECONDARY ARTICLES */}
//         {/* ================================================= */}

//         <div className="lg:col-span-2 flex flex-col gap-5">
//           {secondaryBlogs.map((blog) => (
//             <article
//               key={blog._id}
//               onClick={() => onBlogClick(blog)}
//               className="
//                 group
//                 flex
//                 gap-4
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 p-3
//                 cursor-pointer
//                 transition-all
//                 duration-300
//                 hover:-translate-y-0.5
//                 hover:shadow-lg
//               "
//             >
//               <div className="w-28 sm:w-36 h-28 sm:h-32 shrink-0 overflow-hidden rounded-xl">
//                 <img
//                   src={blog.coverImageUrl}
//                   alt={blog.title}
//                   className="
//                     w-full
//                     h-full
//                     object-cover
//                     transition-transform
//                     duration-500
//                     group-hover:scale-105
//                   "
//                 />
//               </div>

//               <div className="min-w-0 py-1 flex flex-col">
//                 <span className="text-[11px] text-gray-400 mb-1.5">
//                   {blog.updatedAt
//                     ? moment(blog.updatedAt).format("Do MMM YYYY")
//                     : "-"}
//                 </span>

//                 <h3
//                   className="
//                   text-sm
//                   sm:text-base
//                   font-semibold
//                   leading-snug
//                   text-gray-900
//                   line-clamp-3
//                   group-hover:text-gray-600
//                   transition
//                 "
//                 >
//                   {blog.title}
//                 </h3>

//                 <div className="mt-auto pt-2 text-[11px] text-gray-400">
//                   {blog.views || 0} views · {blog.likes || 0} likes
//                 </div>
//               </div>
//             </article>
//           ))}

//           {/* Explore remaining */}

//           {blogs.length > 3 && (
//             <button
//               onClick={() => navigate(`/explore/${cluster.cluster}`)}
//               className="
//                 flex
//                 items-center
//                 justify-between
//                 w-full
//                 rounded-2xl
//                 border
//                 border-dashed
//                 border-gray-300
//                 px-5
//                 py-4
//                 text-left
//                 hover:border-gray-400
//                 hover:bg-gray-50
//                 transition
//                 cursor-pointer
//               "
//             >
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Explore more
//                 </p>

//                 <p className="text-xs text-gray-400 mt-0.5">
//                   {blogs.length - 3} more articles in this topic
//                 </p>
//               </div>

//               <LuArrowUpRight size={18} className="text-gray-400" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile explore button */}

//       <button
//         onClick={() => navigate(`/explore/${cluster.cluster}`)}
//         className="
//           sm:hidden
//           mt-5
//           w-full
//           flex
//           items-center
//           justify-center
//           gap-2
//           rounded-xl
//           border
//           border-gray-200
//           py-3
//           text-sm
//           font-medium
//           text-gray-600
//           hover:bg-gray-50
//           transition
//           cursor-pointer
//         "
//       >
//         Explore all
//         <LuArrowUpRight size={16} />
//       </button>
//     </section>
//   );
// };

// export default ExploreCluster;

import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  LuArrowUpRight,
  LuLayers3,
  LuSparkles,
  LuEye,
  LuHeart,
  LuMessageCircle,
} from "react-icons/lu";
import CharAvatar from "../../../components/CharAvatar";

const ExploreCluster = ({ cluster, onBlogClick, index }) => {
  const navigate = useNavigate();

  const blogs = Array.isArray(cluster?.blogs) ? cluster.blogs : [];
  const keywords = Array.isArray(cluster?.keywords) ? cluster.keywords : [];

  if (!blogs.length) return null;

  const featured = blogs[0];
  const secondaryBlogs = blogs.slice(1, 3);
  const remainingCount = Math.max(blogs.length - 3, 0);

  const clusterTitle = cluster?.title?.trim() || "Untitled Collection";

  const clusterKeywords = keywords.slice(0, 5);

  // const handleExploreAll = () => {
  //   if (!cluster?.cluster) return;

  //   navigate(`/explore/${cluster.cluster}`);
  // };

  const handleExploreAll = () => {
    const clusterId = cluster?.cluster;

    if (clusterId === undefined || clusterId === null) {
      console.error("Cannot explore cluster: missing cluster ID", cluster);
      return;
    }

    navigate(`/explore/${clusterId}`);
  };
  const handleTagClick = (event, keyword) => {
    event.stopPropagation();

    if (!keyword) return;

    navigate(`/tags/${keyword}`);
  };

  return (
    <section className="relative">
      {/* ====================================================== */}
      {/* COLLECTION HEADER */}
      {/* ====================================================== */}

      <div className="mb-7 ">
        <div className="flex items-center justify-between gap-5">
          {/* Left */}

          <div className="flex min-w-0 items-start gap-3">
            {/* Number */}

            <div className="flex flex-col gap-2">
              <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-gray-200 bg-gray-50">
                <span className="text-xs font-semibold text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Heading */}

              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-2">
                  <LuLayers3 size={14} className="text-gray-400 shrink-0" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Collection
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 capitalize">
                  {clusterTitle}
                </h2>

                {keywords.length > 0 && (
                  <p className="mt-1.5 max-w-2xl text-sm leading-5 text-gray-500">
                    A collection shaped around{" "}
                    <span className="font-medium text-gray-700">
                      {keywords.slice(0, 4).join(", ")}
                    </span>
                    {keywords.length > 4 ? " and more." : "."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Desktop explore */}

          <button
            type="button"
            onClick={handleExploreAll}
            className="
              hidden
              sm:inline-flex
              shrink-0
              items-center
              gap-1.5
              pt-1
              text-sm
              font-medium
              text-gray-400
              hover:text-gray-900
              transition-colors
              cursor-pointer
            "
          >
            Explore all
            <LuArrowUpRight size={16} />
          </button>
        </div>

        {/* ====================================================== */}
        {/* KEYWORDS */}
        {/* ====================================================== */}

        {clusterKeywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 ">
            {clusterKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={(event) => handleTagClick(event, keyword)}
                className="
                  rounded-sm
                  border
                  border-gray-200
                  bg-gray-50
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  text-gray-500
                  transition-all
                  hover:border-gray-300
                  hover:bg-white
                  hover:text-gray-800
                  cursor-pointer
                "
              >
                #{keyword}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ====================================================== */}
      {/* DISCOVERY LAYOUT */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* ==================================================== */}
        {/* FEATURED DISCOVERY */}
        {/* ==================================================== */}

        <article
          onClick={() => onBlogClick(featured)}
          className="
            lg:col-span-3
            group
            relative
            overflow-hidden
            rounded-sm
            bg-gray-900
            cursor-pointer
          "
        >
          {/* Image */}

          <div className="relative h-[330px] sm:h-[390px]">
            <img
              src={featured.coverImageUrl || ""}
              alt={featured.title || "Featured article"}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.03]
              "
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/5" />

            {/* Featured badge */}

            <div className="absolute left-5 top-5">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-sm
                  border
                  border-white/20
                  bg-black/30
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white
                  backdrop-blur-md
                "
              >
                <LuSparkles size={11} />
                Featured discovery
              </span>
            </div>

            {/* Content over image */}

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-2 text-[11px] text-white/60">
                <span>
                  {featured.updatedAt
                    ? moment(featured.updatedAt).format("Do MMM YYYY")
                    : "-"}
                </span>

                <span>·</span>

                <span>{Number(featured.views) || 0} views</span>
              </div>

              <h3
                className="
                  max-w-2xl
                  text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white
                "
              >
                {featured.title || "Untitled article"}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-5 text-white/65 line-clamp-2">
                {featured.content || "Discover this article."}
              </p>

              {/* Author */}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2.5">
                  {featured.author?.profileImageUrl ? (
                    <img
                      src={featured.author.profileImageUrl}
                      alt=""
                      className="h-7 w-7 shrink-0 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <CharAvatar
                      fullName={
                        featured.author?.name ||
                        featured.authorName ||
                        "Deleted User"
                      }
                      width="w-7"
                      height="h-7"
                      textSize="text-[10px]"
                      className="border border-white/20 bg-white/10 text-white"
                    />
                  )}
                  <span className="truncate text-xs font-medium text-white/80">
                    {featured.author?.name ||
                      featured.authorName ||
                      "Deleted User"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-white/50">
                  <Metric icon={<LuHeart size={12} />} value={featured.likes} />

                  <Metric
                    icon={<LuMessageCircle size={12} />}
                    value={featured.commentCount}
                  />

                  <LuArrowUpRight
                    size={18}
                    className="
                      ml-1
                      text-white/60
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ==================================================== */}
        {/* RELATED DISCOVERIES */}
        {/* ==================================================== */}

        <div className="lg:col-span-2 flex flex-col gap-3">
          {secondaryBlogs.map((blog, blogIndex) => (
            <article
              key={blog._id || blogIndex}
              onClick={() => onBlogClick(blog)}
              className="
                group
                flex
                min-h-[145px]
                gap-4
                rounded-sm
                border
                border-gray-200
                bg-white
                p-1
                cursor-pointer
                transition-all
                duration-300
                hover:border-gray-300
                hover:shadow-md
              "
            >
              {/* Image */}

              <div className="relative h-[120px] w-[120px] sm:h-[135px] sm:w-[145px] shrink-0 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={blog.coverImageUrl || ""}
                  alt={blog.title || "Article"}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Number */}

                <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-sm bg-black/50 text-[10px] font-semibold text-white backdrop-blur-sm">
                  0{blogIndex + 2}
                </span>
              </div>

              {/* Content */}

              {/* Content */}

              <div className="flex min-w-0 flex-1 flex-col py-0.5">
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>
                    {blog.updatedAt
                      ? moment(blog.updatedAt).format("Do MMM YYYY")
                      : "-"}
                  </span>
                </div>

                <h3
                  className="
      mt-1.5
      text-sm
      sm:text-[15px]
      font-semibold
      leading-5
      text-gray-900
      line-clamp-2
      transition-colors
      group-hover:text-gray-600
    "
                >
                  {blog.title || "Untitled article"}
                </h3>

                {/* Author */}
                <div className="mt-2 flex min-w-0 items-center gap-1.5">
                  {blog.author?.profileImageUrl ? (
                    <img
                      src={blog.author.profileImageUrl}
                      alt=""
                      className="h-5 w-5 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <CharAvatar
                      fullName={
                        blog.author?.name || blog.authorName || "Deleted User"
                      }
                      width="w-5"
                      height="h-5"
                      textSize="text-[8px]"
                    />
                  )}

                  <span className="truncate txt-[10px] font-medium text-gray-500">
                    {blog.author?.name || blog.authorName || "Deleted User"}
                  </span>
                </div>

                {/* Metrics */}
                <div className="mt-auto flex items-center gap-3 pt-2 text-[10px] text-gray-400">
                  <Metric icon={<LuEye size={11} />} value={blog.views} />

                  <Metric icon={<LuHeart size={11} />} value={blog.likes} />

                  <Metric
                    icon={<LuMessageCircle size={11} />}
                    value={blog.commentCount}
                  />
                </div>
              </div>

              <div className="hidden sm:flex items-start pt-1">
                <LuArrowUpRight
                  size={16}
                  className="
                    text-gray-300
                    transition-all
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-gray-600
                  "
                />
              </div>
            </article>
          ))}

          {/* ================================================== */}
          {/* MORE DISCOVERIES */}
          {/* ================================================== */}

          {remainingCount > 0 && (
            <button
              type="button"
              onClick={handleExploreAll}
              className="
                group
                mt-auto
                flex
                w-full
                items-center
                justify-between
                rounded-sm
                border
                border-dashed
                border-gray-300
                px-4
                py-3.5
                text-left
                transition-all
                hover:border-gray-400
                hover:bg-gray-50
                cursor-pointer
              "
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Continue exploring
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {remainingCount} more{" "}
                  {remainingCount === 1 ? "article" : "articles"} in this
                  collection
                </p>
              </div>

              <LuArrowUpRight
                size={17}
                className="
                  text-gray-400
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>
          )}
        </div>
      </div>

      {/* ====================================================== */}
      {/* MOBILE EXPLORE */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={handleExploreAll}
        className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-sm
          border
          border-gray-200
          bg-white
          py-2.5
          text-xs
          font-medium
          text-gray-600
          transition
          hover:bg-gray-50
          sm:hidden
          cursor-pointer
        "
      >
        Explore collection
        <LuArrowUpRight size={14} />
      </button>
    </section>
  );
};

// ============================================================
// METRIC
// ============================================================

const Metric = ({ icon, value }) => {
  const numericValue = Number(value);

  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  return (
    <span className="inline-flex items-center gap-1">
      {icon}
      {safeValue.toLocaleString()}
    </span>
  );
};

export default ExploreCluster;
