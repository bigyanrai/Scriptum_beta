// import { useNavigate } from "react-router-dom";
// import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
// import axiosInstance from "../../utils/axiosInstance";
// import moment from "moment";

// import {
//   LuGalleryVerticalEnd,
//   LuLoaderCircle,
//   LuArrowDown,
// } from "react-icons/lu";

// import { useEffect, useState } from "react";
// import { API_PATHS } from "../../utils/apiPaths";
// import FeaturedBlogPost from "./components/FeaturedBlogPost";
// import BlogPostSummaryCard from "./components/BlogPostSummaryCard";

// import FeaturedBlogPostSkeleton from "../../components/Loader/FeaturedBlogPostSkeleton";
// import BlogPostSummaryCardSkeleton from "../../components/Loader/BlogPostSummaryCardSkeleton";

// import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
// import BackButton from "../../components/BackButton";

// const BlogLandingPage = () => {
//   const navigate = useNavigate();
//   const [blogPostList, setBlogPostList] = useState([]);

//   const [visiblePosts, setVisiblePosts] = useState(9);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFeatureLoading, setIsFeatureLoading] = useState(true);
//   const [trendingPost, setTrendingPost] = useState(null);

//   const remainingPosts = blogPostList.length - visiblePosts;

//   const getTrendingPost = async () => {
//     try {
//       setIsFeatureLoading(true);
//       const response = await axiosInstance.get(
//         `${API_PATHS.POSTS.GET_TRENDING_POSTS}?limit=1`,
//       );

//       setTrendingPost(response.data[0] || null);
//     } catch (error) {
//       console.error("Error fetching trending post", error);
//     } finally {
//       setIsFeatureLoading(false);
//     }
//   };

//   //fetch paginated posts
//   const getAllPosts = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL);

//       setBlogPostList(response.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   //load more posts
//   const handleLoadMore = () => {
//     setVisiblePosts((prev) => prev + 6);
//   };

//   //initialload
//   useEffect(() => {
//     getAllPosts(1);
//     getTrendingPost();
//   }, []);

//   const handleClick = (post) => navigate(`/${post.slug}`);

//   return (
//     <BlogLayout activeMenu="Home">
//       <div className="mx-auto w-full">
//         <BackButton />
//         {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"> */}
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Discover
//             </p>

//             <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
//               Trending Now
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Explore the most popular articles based on reader engagement.
//             </p>
//           </div>

//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">{/* Heading/content */}</div>

//             <button
//               onClick={() => navigate("/trending")}
//               className="
//       shrink-0
//       whitespace-nowrap
//       text-sm
//       font-semibold
//       text-black
//       hover:underline
//     "
//             >
//               View All →
//             </button>
//           </div>
//         </div>
//         <div className="transition-all duration-300">
//           {/* Main Content */}

//           <div className="lg:col-span-12 transition-all duration-300">
//             {/* Featured Post */}
//             {isFeatureLoading ? (
//               <FeaturedBlogPostSkeleton />
//             ) : (
//               trendingPost && (
//                 <FeaturedBlogPost
//                   comments={trendingPost.commentCount}
//                   title={trendingPost.title}
//                   views={trendingPost.views}
//                   likes={trendingPost.likes}
//                   coverImageUrl={trendingPost.coverImageUrl}
//                   description={trendingPost.content}
//                   tags={trendingPost.tags}
//                   updatedOn={
//                     trendingPost.updatedAt
//                       ? moment(trendingPost.updatedAt).format("Do MMM YYYY")
//                       : "-"
//                   }
//                   authorName={
//                     trendingPost.author?.name ||
//                     trendingPost.authorName ||
//                     "Deleted User"
//                   }
//                   authProfileImg={trendingPost.author?.profileImageUrl}
//                   isDeletedAuthor={!trendingPost.author}
//                   onClick={() => handleClick(trendingPost)}
//                 />
//               )
//             )}

//             {/* Latest Articles Heading */}
//             <div className="mt-12 mb-6 flex items-end justify-between">
//               <div>
//                 <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
//                   Discover
//                 </p>

//                 <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
//                   Latest Articles
//                 </h2>

//                 <p className="mt-2 text-gray-500">
//                   Stay updated with our newest stories and insights.
//                 </p>
//               </div>

//               {/* Articles Count */}
//               {isLoading ? (
//                 <div className="hidden items-center justify-center rounded-full bg-gray-100 px-4 py-2 md:flex">
//                   <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
//                 </div>
//               ) : (
//                 blogPostList.length > 1 && (
//                   <div className="hidden items-center justify-center rounded-full bg-gray-100 px-4 py-2 md:flex">
//                     <span className="text-sm font-medium text-gray-600">
//                       {blogPostList.length - 1} Articles
//                     </span>
//                   </div>
//                 )
//               )}
//             </div>

//             {/* Blog Cards */}
//             <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
//               {isLoading
//                 ? [...Array(8)].map((_, i) => (
//                     <BlogPostSummaryCardSkeleton key={i} />
//                   ))
//                 : blogPostList
//                     .slice(1, visiblePosts)
//                     .map((item) => (
//                       <BlogPostSummaryCard
//                         comments={item.commentCount}
//                         key={item._id}
//                         title={item.title}
//                         coverImageUrl={item.coverImageUrl}
//                         description={item.content}
//                         tags={item.tags}
//                         views={item.views}
//                         likes={item.likes}
//                         updatedOn={
//                           item.updatedAt
//                             ? moment(item.updatedAt).format("Do MMM YYYY")
//                             : "-"
//                         }
//                         authorName={
//                           item.author?.name || item.authorName || "Deleted User"
//                         }
//                         authProfileImg={item.author?.profileImageUrl}
//                         onClick={() => handleClick(item)}
//                         isDeletedAuthor={!item.author}
//                       />
//                     ))}
//             </div>

//             {/* Empty State */}
//             {!isLoading && blogPostList.length === 0 && (
//               <div className="flex flex-col items-center justify-center py-28">
//                 <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
//                   <LuGalleryVerticalEnd className="text-3xl text-gray-400" />
//                 </div>

//                 <h3 className="text-2xl font-bold text-gray-800">
//                   No Blog Posts Yet
//                 </h3>

//                 <p className="text-gray-500 mt-2 text-center max-w-md">
//                   There are currently no published blog posts. Check back later
//                   for fresh content.
//                 </p>
//               </div>
//             )}

//             {/* Load More */}
//             {visiblePosts < blogPostList.length && (
//               <div className="flex justify-center mt-10 mb-6">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={isLoading}
//                   className="
//     group
//     inline-flex
//     items-center
//     gap-2
//     rounded-lg
//     border
//     border-gray-300
//     bg-white
//     px-5
//     py-2.5
//     text-sm
//     font-medium
//     text-gray-700
//     shadow-sm
//     transition-all
//     duration-200
//     hover:border-black
//     hover:bg-black
//     hover:text-white
//     disabled:opacity-50
//     disabled:cursor-not-allowed
//   "
//                 >
//                   {isLoading ? (
//                     <>
//                       <LuLoaderCircle className="animate-spin" />
//                       Loading...
//                     </>
//                   ) : (
//                     <>
//                       <LuArrowDown className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-1" />
//                       Load More
//                       {remainingPosts > 0 && (
//                         <span className="text-xs opacity-70">
//                           ({remainingPosts} left)
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>

//           <BlogSidebar />
//         </div>
//       </div>
//     </BlogLayout>
//   );
// };

// export default BlogLandingPage;

import { useNavigate } from "react-router-dom";
import BlogLayout from "../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";

import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";

import { useEffect, useRef, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import FeaturedBlogPost from "./components/FeaturedBlogPost";
import BlogPostSummaryCard from "./components/BlogPostSummaryCard";

import FeaturedBlogPostSkeleton from "../../components/Loader/FeaturedBlogPostSkeleton";
import BlogPostSummaryCardSkeleton from "../../components/Loader/BlogPostSummaryCardSkeleton";

import BlogSidebar from "../../components/layouts/BlogLayout/BlogSidebar";
import BackButton from "../../components/BackButton";

const BlogLandingPage = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(9);

  const [isLoading, setIsLoading] = useState(true);
  const [isFeatureLoading, setIsFeatureLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [trendingPost, setTrendingPost] = useState(null);

  // Ref for infinite scroll trigger
  const loadMoreRef = useRef(null);

  const getTrendingPost = async () => {
    try {
      setIsFeatureLoading(true);

      const response = await axiosInstance.get(
        `${API_PATHS.POSTS.GET_TRENDING_POSTS}?limit=1`,
      );

      setTrendingPost(response.data[0] || null);
    } catch (error) {
      console.error("Error fetching trending post", error);
    } finally {
      setIsFeatureLoading(false);
    }
  };

  // Fetch all posts
  const getAllPosts = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL);

      setBlogPostList(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically load more posts when reaching the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          !isLoading &&
          !isLoadingMore &&
          visiblePosts < blogPostList.length
        ) {
          setIsLoadingMore(true);

          // Small delay so the loading indicator is visible
          setTimeout(() => {
            setVisiblePosts((prev) => Math.min(prev + 6, blogPostList.length));

            setIsLoadingMore(false);
          }, 500);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, isLoadingMore, visiblePosts, blogPostList.length]);

  // Initial load
  useEffect(() => {
    getAllPosts();
    getTrendingPost();
  }, []);

  const handleClick = (post) => navigate(`/${post.slug}`);

  return (
    <BlogLayout activeMenu="Home">
      <div className="mx-auto w-full">
        <BackButton />

        {/* Trending Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Discover
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trending Now
            </h1>

            <p className="mt-2 text-gray-500">
              Explore the most popular articles based on reader engagement.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0"></div>

            <button
              onClick={() => navigate("/trending")}
              className="
                shrink-0
                whitespace-nowrap
                text-sm
                font-semibold
                text-black
                hover:underline
              "
            >
              View All →
            </button>
          </div>
        </div>

        <div className="transition-all duration-300">
          {/* Main Content */}
          <div className="transition-all duration-300 lg:col-span-12">
            {/* Featured Post */}
            {isFeatureLoading ? (
              <FeaturedBlogPostSkeleton />
            ) : (
              trendingPost && (
                <FeaturedBlogPost
                  comments={trendingPost.commentCount}
                  title={trendingPost.title}
                  views={trendingPost.views}
                  likes={trendingPost.likes}
                  coverImageUrl={trendingPost.coverImageUrl}
                  description={trendingPost.content}
                  tags={trendingPost.tags}
                  updatedOn={
                    trendingPost.updatedAt
                      ? moment(trendingPost.updatedAt).format("Do MMM YYYY")
                      : "-"
                  }
                  authorName={
                    trendingPost.author?.name ||
                    trendingPost.authorName ||
                    "Deleted User"
                  }
                  authProfileImg={trendingPost.author?.profileImageUrl}
                  isDeletedAuthor={!trendingPost.author}
                  onClick={() => handleClick(trendingPost)}
                />
              )
            )}

            {/* Latest Articles Heading */}
            <div className="mb-6 mt-12 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                  Discover
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Latest Articles
                </h2>

                <p className="mt-2 text-gray-500">
                  Stay updated with our newest stories and insights.
                </p>
              </div>

              {/* Articles Count */}
              {isLoading ? (
                <div className="hidden items-center justify-center rounded-full bg-gray-100 px-4 py-2 md:flex">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              ) : (
                blogPostList.length > 1 && (
                  <div className="hidden items-center justify-center rounded-full bg-gray-100 px-4 py-2 md:flex">
                    <span className="text-sm font-medium text-gray-600">
                      {blogPostList.length - 1} Articles
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {isLoading
                ? [...Array(8)].map((_, i) => (
                    <BlogPostSummaryCardSkeleton key={i} />
                  ))
                : blogPostList
                    .slice(1, visiblePosts)
                    .map((item) => (
                      <BlogPostSummaryCard
                        comments={item.commentCount}
                        key={item._id}
                        title={item.title}
                        coverImageUrl={item.coverImageUrl}
                        description={item.content}
                        tags={item.tags}
                        views={item.views}
                        likes={item.likes}
                        updatedOn={
                          item.updatedAt
                            ? moment(item.updatedAt).format("Do MMM YYYY")
                            : "-"
                        }
                        authorName={
                          item.author?.name || item.authorName || "Deleted User"
                        }
                        authProfileImg={item.author?.profileImageUrl}
                        onClick={() => handleClick(item)}
                        isDeletedAuthor={!item.author}
                      />
                    ))}
            </div>

            {/* Empty State */}
            {!isLoading && blogPostList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-28">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <LuGalleryVerticalEnd className="text-3xl text-gray-400" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800">
                  No Blog Posts Yet
                </h3>

                <p className="mt-2 max-w-md text-center text-gray-500">
                  There are currently no published blog posts. Check back later
                  for fresh content.
                </p>
              </div>
            )}

            {/* Infinite Scroll Loading */}
            {!isLoading && visiblePosts < blogPostList.length && (
              <div
                ref={loadMoreRef}
                className="flex h-24 items-center justify-center"
              >
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <LuLoaderCircle className="animate-spin" />
                    Loading more articles...
                  </div>
                )}
              </div>
            )}

            {/* All Posts Loaded */}
            {!isLoading &&
              blogPostList.length > 0 &&
              visiblePosts >= blogPostList.length && (
                <div className="py-10 text-center text-sm text-gray-400">
                  You've reached the end.
                </div>
              )}
          </div>

          <BlogSidebar />
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogLandingPage;
