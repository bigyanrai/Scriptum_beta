// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// // import axiosInstance from "../../utils/axiosInstance";
// // import { API_PATHS } from "../../utils/apiPaths";

// // import ExploreHero from "./components/ExploreHero";
// // import ClusterSection from "./components/ClusterSection";
// // import ExploreSkeleton from "./../../components/Loader/SkeletonLoader";

// // import { LuCompass, LuLoaderCircle } from "react-icons/lu";
// // import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
// // import BackButton from "../../components/BackButton";

// // const ExplorePage = () => {
// //   const navigate = useNavigate();

// //   const [clusters, setClusters] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const totalClusters = clusters.length;

// //   const totalBlogs = clusters.reduce(
// //     (total, cluster) => total + cluster.blogs.length,
// //     0,
// //   );

// //   const topics = [...new Set(clusters.flatMap((cluster) => cluster.keywords))];

// //   const getExploreData = async () => {
// //     try {
// //       setLoading(true);

// //       const response = await axiosInstance.get(API_PATHS.EXPLORE.EXPLORE_PAGE);

// //       setClusters(response.data);
// //     } catch (err) {
// //       console.log(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     getExploreData();
// //   }, []);

// //   const openBlog = (blog) => {
// //     navigate(`/${blog.slug}`);
// //   };

// //   return (
// //     <BlogLayout activeMenu="Explore">
// //       <div className="w-full mx-auto">
// //         <BackButton />
// //         {/* <ExploreHero
// //           totalClusters={totalClusters}
// //           totalBlogs={totalBlogs}
// //           topics={topics}
// //         /> */}

// //         {loading ? (
// //           <ExploreSkeleton />
// //         ) : (
// //           <>
// //             {clusters.map((cluster) => (
// //               <ClusterSection
// //                 key={cluster.cluster}
// //                 cluster={cluster}
// //                 onBlogClick={openBlog}
// //               />
// //             ))}

// //             {clusters.length === 0 && (
// //               <div className="py-32 text-center">
// //                 <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
// //                   <LuCompass className="text-3xl text-gray-400" />
// //                 </div>

// //                 <h2 className="mt-6 text-2xl font-bold">Nothing to Explore</h2>

// //                 <p className="mt-2 text-gray-500">
// //                   We couldn't find any clustered blogs.
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //         <BlogSidebar />
// //       </div>
// //     </BlogLayout>
// //   );
// // };

// // export default ExplorePage;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";

// import ClusterSection from "./components/ExploreCluster";
// import ExploreSkeleton from "../../components/Loader/SkeletonLoader";

// import { LuCompass, LuLayers3, LuFileText, LuTags } from "react-icons/lu";

// import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
// import BackButton from "../../components/BackButton";

// const ExplorePage = () => {
//   const navigate = useNavigate();

//   const [clusters, setClusters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ============================================================
//   // EXPLORE STATS
//   // ============================================================

//   const totalClusters = clusters.length;

//   const totalBlogs = clusters.reduce(
//     (total, cluster) => total + (cluster.blogs?.length || 0),
//     0,
//   );

//   const topics = [
//     ...new Set(clusters.flatMap((cluster) => cluster.keywords || [])),
//   ];

//   // ============================================================
//   // GET EXPLORE DATA
//   // ============================================================

//   const getExploreData = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(API_PATHS.EXPLORE.EXPLORE_PAGE);

//       setClusters(response.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH ON MOUNT
//   // ============================================================

//   useEffect(() => {
//     getExploreData();
//   }, []);

//   // ============================================================
//   // OPEN BLOG
//   // ============================================================

//   const openBlog = (blog) => {
//     navigate(`/${blog.slug}`);
//   };

//   return (
//     <BlogLayout activeMenu="Explore">
//       <div className="w-full mx-auto">
//         {/* ====================================================== */}
//         {/* BACK BUTTON */}
//         {/* ====================================================== */}

//         <BackButton />

//         {/* ====================================================== */}
//         {/* EXPLORE HEADER */}
//         {/* ====================================================== */}

//         <section className=" mb-8">
//           <div className="flex flex-col gap-5">
//             {/* Heading */}

//             <div className="flex items-start gap-4">
//               <div className="min-w-0">
//                 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
//                   Discover
//                 </p>

//                 <h1 className="text-3xl sm:text-4xl  font-bold tracking-tight text-gray-900">
//                   Explore
//                 </h1>

//                 <p className="mt-2  text-sm sm:text-base leading-6 text-gray-500">
//                   Discover ideas, stories, and perspectives organized into
//                   topics based on what you're interested in.
//                 </p>
//               </div>
//             </div>

//             {/* ================================================== */}
//             {/* STATS */}
//             {/* ================================================== */}

//             {!loading && clusters.length > 0 && (
//               <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                 {/* Clusters */}

//                 <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
//                   <LuLayers3 size={15} className="text-gray-500" />

//                   <span className="text-xs sm:text-sm font-medium text-gray-700">
//                     {totalClusters}{" "}
//                     {totalClusters === 1 ? "cluster" : "clusters"}
//                   </span>
//                 </div>

//                 {/* Blogs */}

//                 <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
//                   <LuFileText size={15} className="text-gray-500" />

//                   <span className="text-xs sm:text-sm font-medium text-gray-700">
//                     {totalBlogs} {totalBlogs === 1 ? "article" : "articles"}
//                   </span>
//                 </div>

//                 {/* Topics */}

//                 <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
//                   <LuTags size={15} className="text-gray-500" />

//                   <span className="text-xs sm:text-sm font-medium text-gray-700">
//                     {topics.length} {topics.length === 1 ? "topic" : "topics"}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ====================================================== */}
//         {/* DIVIDER */}
//         {/* ====================================================== */}

//         <div className="border-t border-gray-100 mb-8" />

//         {/* ====================================================== */}
//         {/* CONTENT */}
//         {/* ====================================================== */}

//         {loading ? (
//           <div>
//             {/* Loading header */}

//             <div className="mb-7">
//               <div className="h-5 w-36 rounded-md bg-gray-200 animate-pulse" />

//               <div className="h-3 w-64 rounded-md bg-gray-100 animate-pulse mt-2" />
//             </div>

//             <ExploreSkeleton />
//           </div>
//         ) : (
//           <>
//             {/* ================================================== */}
//             {/* CLUSTER RESULTS */}
//             {/* ================================================== */}

//             {clusters.length > 0 && (
//               <div className="space-y-10">
//                 {clusters.map((cluster, index) => (
//                   <section key={cluster.cluster} className="relative">
//                     <ClusterSection cluster={cluster} onBlogClick={openBlog} />

//                     {/* Subtle separator between clusters */}

//                     {index < clusters.length - 1 && (
//                       <div className="mt-10 border-b border-gray-100" />
//                     )}
//                   </section>
//                 ))}
//               </div>
//             )}

//             {/* ================================================== */}
//             {/* EMPTY STATE */}
//             {/* ================================================== */}

//             {clusters.length === 0 && (
//               <div className="py-20 sm:py-28 text-center">
//                 <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
//                   <LuCompass size={32} className="text-gray-400" />
//                 </div>

//                 <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
//                   Nothing to explore yet
//                 </h2>

//                 <p className="mx-auto mt-2 max-w-md text-sm sm:text-base leading-6 text-gray-500">
//                   There aren't enough clustered articles yet. Once more content
//                   is available, you'll see related topics and discoveries here.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={() => navigate("/")}
//                   className="mt-6 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
//                 >
//                   Browse latest posts
//                 </button>
//               </div>
//             )}
//           </>
//         )}

//         {/* ====================================================== */}
//         {/* SIDEBAR */}
//         {/* ====================================================== */}

//         <BlogSidebar />
//       </div>
//     </BlogLayout>
//   );
// };

// export default ExplorePage;

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import ExploreCluster from "./components/ExploreCluster";
import ExploreSkeleton from "../../components/Loader/SkeletonLoader";

import { LuCompass, LuArrowUpRight } from "react-icons/lu";

import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
import BackButton from "../../components/BackButton";

const ExplorePage = () => {
  const navigate = useNavigate();

  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // EXPLORE STATS
  // ============================================================

  const totalClusters = clusters.length;

  const totalBlogs = useMemo(() => {
    return clusters.reduce(
      (total, cluster) =>
        total + (Array.isArray(cluster.blogs) ? cluster.blogs.length : 0),
      0,
    );
  }, [clusters]);

  const topics = useMemo(() => {
    return [
      ...new Set(
        clusters.flatMap((cluster) =>
          Array.isArray(cluster.keywords) ? cluster.keywords : [],
        ),
      ),
    ];
  }, [clusters]);

  // ============================================================
  // GET EXPLORE DATA
  // ============================================================

  const getExploreData = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_PATHS.EXPLORE.EXPLORE_PAGE);
      console.log(response);

      const data = Array.isArray(response.data) ? response.data : [];

      setClusters(data);
    } catch (error) {
      console.error("Error fetching explore data:", error);
      setClusters([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FETCH ON MOUNT
  // ============================================================

  useEffect(() => {
    getExploreData();
  }, []);

  // ============================================================
  // OPEN BLOG
  // ============================================================

  const openBlog = (blog) => {
    if (!blog?.slug) return;

    navigate(`/${blog.slug}`);
  };

  return (
    <BlogLayout activeMenu="Explore">
      <div className="w-full mx-auto">
        {/* ====================================================== */}
        {/* BACK BUTTON */}
        {/* ====================================================== */}

        <BackButton />

        {/* ====================================================== */}
        {/* EXPLORE HERO */}
        {/* ====================================================== */}

        <section className="mb-5">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Discover
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Explore ideas.
            </h1>

            <p className="mt-2 max-w-xl text-sm sm:text-base leading-6 text-gray-500">
              Discover articles connected by common ideas, themes, and
              perspectives.
            </p>

            {!loading && totalClusters > 0 && (
              <div className="mt-5 flex items-center gap-4 text-xs text-gray-400">
                <span>
                  <strong className="font-semibold text-gray-700">
                    {totalClusters}
                  </strong>{" "}
                  {totalClusters === 1 ? "collection" : "collections"}
                </span>

                <span className="text-gray-300">•</span>

                <span>
                  <strong className="font-semibold text-gray-700">
                    {totalBlogs}
                  </strong>{" "}
                  {totalBlogs === 1 ? "article" : "articles"}
                </span>

                <span className="text-gray-300">•</span>

                <span>
                  <strong className="font-semibold text-gray-700">
                    {topics.length}
                  </strong>{" "}
                  {topics.length === 1 ? "topic" : "topics"}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================== */}
        {/* CONTENT */}
        {/* ====================================================== */}

        {loading ? (
          <ExploreSkeleton />
        ) : clusters.length > 0 ? (
          <div className="space-y-12">
            {clusters.map((cluster, index) => (
              <div key={cluster.cluster || index}>
                <ExploreCluster
                  cluster={cluster}
                  index={index}
                  onBlogClick={openBlog}
                />

                {index < clusters.length - 1 && (
                  <div className="mt-12 border-b border-gray-100" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyExploreState onBrowse={() => navigate("/")} />
        )}

        {/* ====================================================== */}
        {/* SIDEBAR */}
        {/* ====================================================== */}

        <BlogSidebar />
      </div>
    </BlogLayout>
  );
};

// ============================================================
// EXPLORE STAT
// ============================================================

const ExploreStat = ({ icon, value, label }) => {
  const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">{icon}</span>

      <span className="font-semibold text-gray-800">
        {safeValue.toLocaleString()}
      </span>

      <span className="text-gray-400">{label}</span>
    </div>
  );
};

// ============================================================
// EMPTY STATE
// ============================================================

const EmptyExploreState = ({ onBrowse }) => {
  return (
    <div className="py-20 sm:py-28 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
        <LuCompass size={28} className="text-gray-400" />
      </div>

      <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Nothing to explore yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        There aren't enough articles to build meaningful collections yet. Check
        back as more ideas and stories are published.
      </p>

      <button
        type="button"
        onClick={onBrowse}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-gray-200
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-gray-700
          shadow-sm
          transition-all
          hover:border-gray-300
          hover:bg-gray-50
          cursor-pointer
        "
      >
        Browse latest posts
        <LuArrowUpRight size={15} />
      </button>
    </div>
  );
};

export default ExplorePage;
