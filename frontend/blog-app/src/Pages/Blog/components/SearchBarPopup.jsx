// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Modal from "../../../components/Modal";
// // import { LuLoaderCircle, LuSearch } from "react-icons/lu";
// // import axiosInstance from "../../../utils/axiosInstance";
// // import { API_PATHS } from "../../../utils/apiPaths";

// // const SearchBarPopup = ({ isOpen, setIsOpen }) => {
// //   const navigate = useNavigate();

// //   const [query, setQuery] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const handleSearch = () => {
// //     const trimmedQuery = query.trim();

// //     if (!trimmedQuery) return;

// //     setQuery("");
// //     setResults([]);
// //     setIsOpen(false);

// //     navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
// //   };

// //   useEffect(() => {
// //     if (!query.trim()) {
// //       setResults([]);
// //       return;
// //     }

// //     const timer = setTimeout(async () => {
// //       setLoading(true);

// //       try {
// //         const res = await axiosInstance.get(API_PATHS.SEARCH.SEARCH_POSTS, {
// //           params: {
// //             q: query,
// //           },
// //         });

// //         setResults(res.data);
// //       } catch (err) {
// //         console.log(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }, 300);

// //     return () => clearTimeout(timer);
// //   }, [query]);

// //   const openBlog = (slug) => {
// //     setQuery("");
// //     setResults([]);
// //     setIsOpen(false);

// //     navigate(`/${slug}`);
// //   };

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onClose={() => {
// //         setQuery("");
// //         setResults([]);
// //         setIsOpen(false);
// //       }}
// //       hideHeader
// //     >
// //       <div className="w-[90vw] max-w-xl p-5">
// //         {/* Header */}
// //         <div className="mb-5 text-center">
// //           <h2 className="text-xl font-semibold tracking-tight text-gray-800">
// //             Search Blogs
// //           </h2>

// //           <p className="mt-1 text-xs text-gray-500">
// //             Find articles instantly using AI-powered search
// //           </p>
// //         </div>

// //         {/* Search Input */}
// //         <div className="relative">
// //           <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-gray-400" />

// //           <input
// //             autoFocus
// //             type="text"
// //             value={query}
// //             placeholder="Search by title, tag or content..."
// //             onChange={(e) => setQuery(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === "Enter") handleSearch();
// //             }}
// //             className="h-11 w-full rounded-sm border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
// //           />

// //           <button
// //             onClick={handleSearch}
// //             className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm bg-sky-500 text-white transition hover:bg-sky-600"
// //           >
// //             <LuSearch size={16} />
// //           </button>
// //         </div>

// //         {/* Results */}
// //         <div className="mt-4 max-h-[340px] overflow-y-auto custom-scrollbar">
// //           {loading && (
// //             <div className="flex flex-col items-center justify-center py-10 text-gray-500">
// //               <LuLoaderCircle className="animate-spin text-2xl text-sky-500" />
// //               <span className="mt-3 text-sm">Searching...</span>
// //             </div>
// //           )}

// //           {!loading && query && results.length === 0 && (
// //             <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
// //               <LuSearch className="mx-auto mb-3 text-3xl text-gray-300" />

// //               <p className="text-sm font-medium text-gray-700">
// //                 No blogs found
// //               </p>

// //               <p className="mt-1 text-xs text-gray-500">Try another keyword.</p>
// //             </div>
// //           )}

// //           {!loading &&
// //             results.map((post) => (
// //               <div
// //                 key={post.postId}
// //                 onClick={() => openBlog(post.slug)}
// //                 className="group mb-2 cursor-pointer rounded-xl border border-gray-100 bg-white p-3 transition-all duration-200 hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-sm"
// //               >
// //                 <div className="flex gap-3">
// //                   <img
// //                     src={post.coverImageUrl}
// //                     alt={post.title}
// //                     className="h-16 w-24 flex-shrink-0 rounded-lg object-cover"
// //                   />

// //                   <div className="min-w-0 flex-1">
// //                     <h3 className="truncate text-[15px] font-semibold text-gray-800 group-hover:text-sky-600">
// //                       {post.title}
// //                     </h3>

// //                     {post.excerpt && (
// //                       <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
// //                         {post.excerpt}
// //                       </p>
// //                     )}

// //                     {post.tags?.length > 0 && (
// //                       <div className="mt-2 flex flex-wrap gap-1.5">
// //                         {post.tags.map((tag) => (
// //                           <span
// //                             key={tag}
// //                             className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700"
// //                           >
// //                             #{tag}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     )}

// //                     {/* Remove after testing */}
// //                     <p className="mt-2 text-[10px] text-gray-400">
// //                       Similarity: {post.score.toFixed(3)}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}

// //           {!loading && results.length > 0 && (
// //             <button
// //               onClick={handleSearch}
// //               className="mt-4 w-full rounded-xl border border-sky-200 bg-sky-50 py-3 text-sm font-medium text-sky-600 transition hover:bg-sky-100"
// //             >
// //               View All Results
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default SearchBarPopup;

// import React, { useEffect, useRef, useState } from "react";

// import { useNavigate } from "react-router-dom";

// import Modal from "../../../components/Modal";

// import {
//   LuLoaderCircle,
//   LuSearch,
//   LuArrowDown,
//   LuArrowUp,
// } from "react-icons/lu";

// import axiosInstance from "../../../utils/axiosInstance";
// import { API_PATHS } from "../../../utils/apiPaths";

// const MIN_QUERY_LENGTH = 2;
// const SEARCH_DEBOUNCE = 300;

// const SearchBarPopup = ({ isOpen, setIsOpen }) => {
//   const navigate = useNavigate();

//   const inputRef = useRef(null);

//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [hasSearched, setHasSearched] = useState(false);

//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   /*
//   |--------------------------------------------------------------------------
//   | Close popup
//   |--------------------------------------------------------------------------
//   */

//   const closeSearch = () => {
//     setQuery("");
//     setResults([]);
//     setLoading(false);
//     setHasSearched(false);
//     setSelectedIndex(-1);
//     setIsOpen(false);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Navigate to full search page
//   |--------------------------------------------------------------------------
//   */

//   const handleSearch = () => {
//     const trimmedQuery = query.trim();

//     if (trimmedQuery.length < MIN_QUERY_LENGTH) {
//       return;
//     }

//     setQuery("");
//     setResults([]);
//     setLoading(false);
//     setHasSearched(false);
//     setSelectedIndex(-1);
//     setIsOpen(false);

//     navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Open individual blog
//   |--------------------------------------------------------------------------
//   */

//   const openBlog = (slug) => {
//     if (!slug) return;

//     setQuery("");
//     setResults([]);
//     setLoading(false);
//     setHasSearched(false);
//     setSelectedIndex(-1);
//     setIsOpen(false);

//     navigate(`/${slug}`);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Keyboard navigation
//   |--------------------------------------------------------------------------
//   */

//   const handleKeyDown = (event) => {
//     /*
//     |--------------------------------------------------------------------------
//     | Escape
//     |--------------------------------------------------------------------------
//     */

//     if (event.key === "Escape") {
//       event.preventDefault();
//       closeSearch();
//       return;
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Enter
//     |--------------------------------------------------------------------------
//     */

//     if (event.key === "Enter") {
//       event.preventDefault();

//       if (selectedIndex >= 0 && results[selectedIndex]) {
//         openBlog(results[selectedIndex].slug);

//         return;
//       }

//       handleSearch();

//       return;
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Arrow Down
//     |--------------------------------------------------------------------------
//     */

//     if (event.key === "ArrowDown") {
//       event.preventDefault();

//       if (!results.length) {
//         return;
//       }

//       setSelectedIndex((previous) => {
//         if (previous >= results.length - 1) {
//           return 0;
//         }

//         return previous + 1;
//       });

//       return;
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Arrow Up
//     |--------------------------------------------------------------------------
//     */

//     if (event.key === "ArrowUp") {
//       event.preventDefault();

//       if (!results.length) {
//         return;
//       }

//       setSelectedIndex((previous) => {
//         if (previous <= 0) {
//           return results.length - 1;
//         }

//         return previous - 1;
//       });
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Search API
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (!isOpen) {
//       return;
//     }

//     inputRef.current?.focus();
//   }, [isOpen]);

//   useEffect(() => {
//     const trimmedQuery = query.trim();

//     /*
//     |--------------------------------------------------------------------------
//     | Clear search
//     |--------------------------------------------------------------------------
//     */

//     if (trimmedQuery.length < MIN_QUERY_LENGTH) {
//       setResults([]);
//       setLoading(false);
//       setHasSearched(false);
//       setSelectedIndex(-1);

//       return;
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | AbortController
//     |--------------------------------------------------------------------------
//     |
//     | If the user types:
//     |
//     | jav
//     | javas
//     | javasc
//     |
//     | the previous request can be cancelled.
//     |
//     */

//     const controller = new AbortController();

//     /*
//     |--------------------------------------------------------------------------
//     | Debounce
//     |--------------------------------------------------------------------------
//     */

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       setHasSearched(false);
//       setSelectedIndex(-1);

//       try {
//         const response = await axiosInstance.get(
//           API_PATHS.SEARCH.SEARCH_POSTS,
//           {
//             params: {
//               q: trimmedQuery,
//             },

//             signal: controller.signal,
//           },
//         );

//         /*
//           |--------------------------------------------------------------------------
//           | Ignore cancelled request
//           |--------------------------------------------------------------------------
//           */

//         if (controller.signal.aborted) {
//           return;
//         }

//         const data = Array.isArray(response.data) ? response.data : [];

//         setResults(data);
//         setHasSearched(true);
//       } catch (error) {
//         /*
//           |--------------------------------------------------------------------------
//           | Abort errors are expected when typing quickly.
//           |--------------------------------------------------------------------------
//           */

//         if (controller.signal.aborted) {
//           return;
//         }

//         console.error("Search error:", error);

//         setResults([]);
//         setHasSearched(true);
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     }, SEARCH_DEBOUNCE);

//     /*
//     |--------------------------------------------------------------------------
//     | Cleanup
//     |--------------------------------------------------------------------------
//     */

//     return () => {
//       clearTimeout(timer);
//       controller.abort();
//     };
//   }, [query]);

//   /*
//   |--------------------------------------------------------------------------
//   | Highlight matching text
//   |--------------------------------------------------------------------------
//   */

//   const highlightText = (text, searchQuery) => {
//     if (!text) {
//       return text;
//     }

//     const trimmedQuery = searchQuery.trim();

//     if (!trimmedQuery) {
//       return text;
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Escape regex characters
//     |--------------------------------------------------------------------------
//     */

//     const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//     const regex = new RegExp(`(${escapedQuery})`, "gi");

//     const parts = text.split(regex);

//     return parts.map((part, index) => {
//       const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();

//       if (isMatch) {
//         return (
//           <mark
//             key={index}
//             className="rounded bg-yellow-100 px-0.5 text-yellow-800"
//           >
//             {part}
//           </mark>
//         );
//       }

//       return <React.Fragment key={index}>{part}</React.Fragment>;
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Render
//   |--------------------------------------------------------------------------
//   */

//   return (
//     <Modal isOpen={isOpen} onClose={closeSearch} hideHeader>
//       <div className=" p-5">
//         {/* -------------------------------------------------------------- */}
//         {/* Header */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mb-5 text-center">
//           <h2 className="text-xl font-semibold tracking-tight text-gray-800">
//             Search Blogs
//           </h2>

//           <p className="mt-1 text-xs text-gray-500">
//             Find articles instantly using AI-powered search
//           </p>
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Search Input */}
//         {/* -------------------------------------------------------------- */}

//         <div className="relative">
//           <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-gray-400" />

//           <input
//             ref={inputRef}
//             autoFocus
//             type="text"
//             value={query}
//             placeholder="Search by title, tag or content..."
//             onChange={(event) => {
//               setQuery(event.target.value);
//             }}
//             onKeyDown={handleKeyDown}
//             className="h-11 w-full rounded-sm border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
//           />

//           <button
//             type="button"
//             onClick={handleSearch}
//             disabled={query.trim().length < MIN_QUERY_LENGTH}
//             className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm bg-sky-500 text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300"
//           >
//             <LuSearch size={16} />
//           </button>
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Keyboard hint */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-gray-400">
//           <span>
//             {query.trim().length < MIN_QUERY_LENGTH
//               ? `Type at least ${MIN_QUERY_LENGTH} characters`
//               : "↑ ↓ to navigate • Enter to open • Esc to close"}
//           </span>
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Results */}
//         {/* -------------------------------------------------------------- */}

//         <div className="custom-scrollbar mt-4 max-h-[340px] overflow-y-auto">
//           {/* ------------------------------------------------------------ */}
//           {/* Loading */}
//           {/* ------------------------------------------------------------ */}

//           {loading && (
//             <div className="flex flex-col items-center justify-center py-10 text-gray-500">
//               <LuLoaderCircle className="animate-spin text-2xl text-sky-500" />

//               <span className="mt-3 text-sm">Searching...</span>
//             </div>
//           )}

//           {/* ------------------------------------------------------------ */}
//           {/* Not enough characters */}
//           {/* ------------------------------------------------------------ */}

//           {!loading &&
//             query.trim().length > 0 &&
//             query.trim().length < MIN_QUERY_LENGTH && (
//               <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center">
//                 <LuSearch className="mx-auto mb-3 text-3xl text-gray-300" />

//                 <p className="text-sm font-medium text-gray-700">
//                   Keep typing...
//                 </p>

//                 <p className="mt-1 text-xs text-gray-500">
//                   Enter at least {MIN_QUERY_LENGTH} characters to search.
//                 </p>
//               </div>
//             )}

//           {/* ------------------------------------------------------------ */}
//           {/* No results */}
//           {/* ------------------------------------------------------------ */}

//           {!loading &&
//             hasSearched &&
//             query.trim().length >= MIN_QUERY_LENGTH &&
//             results.length === 0 && (
//               <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
//                 <LuSearch className="mx-auto mb-3 text-3xl text-gray-300" />

//                 <p className="text-sm font-medium text-gray-700">
//                   No blogs found
//                 </p>

//                 <p className="mt-1 text-xs text-gray-500">
//                   Try another keyword or search phrase.
//                 </p>
//               </div>
//             )}

//           {/* ------------------------------------------------------------ */}
//           {/* Search results */}
//           {/* ------------------------------------------------------------ */}

//           {!loading &&
//             results.map((post, index) => {
//               const isSelected = selectedIndex === index;

//               return (
//                 <div
//                   key={post.postId}
//                   onClick={() => openBlog(post.slug)}
//                   onMouseEnter={() => setSelectedIndex(index)}
//                   className={`group mb-2 cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
//                     isSelected
//                       ? "border-sky-300 bg-sky-50 shadow-sm"
//                       : "border-gray-100 bg-white hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-sm"
//                   }`}
//                 >
//                   <div className="flex gap-3">
//                     {/* ------------------------------------------------ */}
//                     {/* Image */}
//                     {/* ------------------------------------------------ */}

//                     <img
//                       src={post.coverImageUrl}
//                       alt={post.title}
//                       className="h-16 w-24 flex-shrink-0 rounded-lg object-cover"
//                     />

//                     {/* ------------------------------------------------ */}
//                     {/* Content */}
//                     {/* ------------------------------------------------ */}

//                     <div className="min-w-0 flex-1">
//                       <h3
//                         className={`truncate text-[15px] font-semibold ${
//                           isSelected
//                             ? "text-sky-600"
//                             : "text-gray-800 group-hover:text-sky-600"
//                         }`}
//                       >
//                         {highlightText(post.title, query)}
//                       </h3>

//                       {post.excerpt && (
//                         <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
//                           {highlightText(post.excerpt, query)}
//                         </p>
//                       )}

//                       {/* ------------------------------------------------ */}
//                       {/* Tags */}
//                       {/* ------------------------------------------------ */}

//                       {post.tags?.length > 0 && (
//                         <div className="mt-2 flex flex-wrap gap-1.5">
//                           {post.tags.map((tag) => (
//                             <span
//                               key={tag}
//                               className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700"
//                             >
//                               #{highlightText(tag, query)}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//           {/* ------------------------------------------------------------ */}
//           {/* View All Results */}
//           {/* ------------------------------------------------------------ */}

//           {!loading && results.length > 0 && (
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="mt-4 w-full rounded-xl border border-sky-200 bg-sky-50 py-3 text-sm font-medium text-sky-600 transition hover:bg-sky-100"
//             >
//               View All Results
//             </button>
//           )}
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Bottom keyboard indicator */}
//         {/* -------------------------------------------------------------- */}

//         {results.length > 0 && (
//           <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-gray-400">
//             <span className="flex items-center gap-1">
//               <LuArrowUp size={11} />
//               <LuArrowDown size={11} />
//               Navigate
//             </span>

//             <span>↵ Open</span>

//             <span>Esc Close</span>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default SearchBarPopup;

import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Modal from "../../../components/Modal";

import {
  LuLoaderCircle,
  LuSearch,
  LuArrowDown,
  LuArrowUp,
  LuCornerDownLeft,
} from "react-icons/lu";

import axiosInstance from "../../../utils/axiosInstance";

import { API_PATHS } from "../../../utils/apiPaths";

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE = 300;

const SearchBarPopup = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  /*
  |--------------------------------------------------------------------------
  | Close search
  |--------------------------------------------------------------------------
  */

  const closeSearch = () => {
    setQuery("");
    setResults([]);
    setLoading(false);
    setHasSearched(false);
    setSelectedIndex(-1);
    setIsOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Navigate to full search page
  |--------------------------------------------------------------------------
  */

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      return;
    }

    setQuery("");
    setResults([]);
    setLoading(false);
    setHasSearched(false);
    setSelectedIndex(-1);
    setIsOpen(false);

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Open individual blog
  |--------------------------------------------------------------------------
  */

  const openBlog = (slug) => {
    if (!slug) return;

    setQuery("");
    setResults([]);
    setLoading(false);
    setHasSearched(false);
    setSelectedIndex(-1);
    setIsOpen(false);

    navigate(`/${slug}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Keyboard navigation
  |--------------------------------------------------------------------------
  */

  const handleKeyDown = (event) => {
    /*
    |--------------------------------------------------------------------------
    | Escape
    |--------------------------------------------------------------------------
    */

    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Enter
    |--------------------------------------------------------------------------
    */

    if (event.key === "Enter") {
      event.preventDefault();

      if (selectedIndex >= 0 && results[selectedIndex]) {
        openBlog(results[selectedIndex].slug);
        return;
      }

      handleSearch();
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Arrow Down
    |--------------------------------------------------------------------------
    */

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!results.length) {
        return;
      }

      setSelectedIndex((previous) => {
        if (previous >= results.length - 1) {
          return 0;
        }

        return previous + 1;
      });

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Arrow Up
    |--------------------------------------------------------------------------
    */

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!results.length) {
        return;
      }

      setSelectedIndex((previous) => {
        if (previous <= 0) {
          return results.length - 1;
        }

        return previous - 1;
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Focus input when popup opens
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  /*
  |--------------------------------------------------------------------------
  | Search API
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const trimmedQuery = query.trim();

    /*
    |--------------------------------------------------------------------------
    | Clear search
    |--------------------------------------------------------------------------
    */

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      setSelectedIndex(-1);

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | AbortController
    |--------------------------------------------------------------------------
    */

    const controller = new AbortController();

    /*
    |--------------------------------------------------------------------------
    | Debounce
    |--------------------------------------------------------------------------
    */

    const timer = setTimeout(async () => {
      setLoading(true);
      setHasSearched(false);
      setSelectedIndex(-1);

      try {
        const response = await axiosInstance.get(
          API_PATHS.SEARCH.SEARCH_POSTS,
          {
            params: {
              q: trimmedQuery,
            },
            signal: controller.signal,
          },
        );

        if (controller.signal.aborted) {
          return;
        }

        const data = Array.isArray(response.data) ? response.data : [];

        setResults(data);
        setHasSearched(true);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Search error:", error);

        setResults([]);
        setHasSearched(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE);

    /*
    |--------------------------------------------------------------------------
    | Cleanup
    |--------------------------------------------------------------------------
    */

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  /*
  |--------------------------------------------------------------------------
  | Highlight matching text
  |--------------------------------------------------------------------------
  */

  const highlightText = (text, searchQuery) => {
    if (!text) {
      return text;
    }

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return text;
    }

    /*
    |--------------------------------------------------------------------------
    | Escape regex characters
    |--------------------------------------------------------------------------
    */

    const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`(${escapedQuery})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();

      if (isMatch) {
        return (
          <mark
            key={index}
            className="rounded bg-yellow-100 px-0.5 text-yellow-800"
          >
            {part}
          </mark>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <Modal isOpen={isOpen} onClose={closeSearch} hideHeader>
      <div className="p-2 sm:p-3">
        {/* ================================================================
            HEADER
            ================================================================ */}

        <div className="mb-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                Search
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Find articles by title, topic, or content.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            SEARCH INPUT
            ================================================================ */}

        <div className="relative">
          <LuSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[17px]
              text-gray-400
            "
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search articles..."
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="
              h-12
              w-full
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              pl-11
              pr-12
              text-sm
              text-gray-900
              placeholder:text-gray-400
              outline-none
              transition-all
              duration-200
              focus:border-gray-400
              focus:bg-white
              focus:ring-4
              focus:ring-gray-100
            "
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={query.trim().length < MIN_QUERY_LENGTH}
            aria-label="Search"
            className="
              absolute
              right-1.5
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-md
              bg-black
              text-white
              transition
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:bg-gray-200
              disabled:text-gray-400
            "
          >
            <LuSearch size={15} />
          </button>
        </div>

        {/* ================================================================
            SEARCH HINT
            ================================================================ */}

        <div className="mt-2 flex items-center justify-between px-1">
          <p className="text-[10px] text-gray-400">
            {query.trim().length < MIN_QUERY_LENGTH
              ? `Type at least ${MIN_QUERY_LENGTH} characters`
              : "Use ↑ ↓ to navigate and Enter to open"}
          </p>

          {query.trim().length >= MIN_QUERY_LENGTH && (
            <p className="hidden text-[10px] text-gray-400 sm:block">
              Esc to close
            </p>
          )}
        </div>

        {/* ================================================================
            RESULTS AREA
            ================================================================ */}

        <div className="custom-scrollbar mt-5 max-h-[360px] overflow-y-auto pr-1">
          {/* ============================================================
              LOADING
              ============================================================ */}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <LuLoaderCircle className="animate-spin text-xl text-gray-700" />

              <p className="mt-3 text-xs font-medium text-gray-500">
                Searching articles...
              </p>
            </div>
          )}

          {/* ============================================================
              NOT ENOUGH CHARACTERS
              ============================================================ */}

          {!loading &&
            query.trim().length > 0 &&
            query.trim().length < MIN_QUERY_LENGTH && (
              <div className="py-12 text-center">
                <div
                  className="
                    mx-auto
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                  "
                >
                  <LuSearch className="text-lg text-gray-400" />
                </div>

                <p className="mt-3 text-sm font-medium text-gray-700">
                  Keep typing
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Enter at least {MIN_QUERY_LENGTH} characters to search.
                </p>
              </div>
            )}

          {/* ============================================================
              EMPTY STATE
              ============================================================ */}

          {!loading &&
            hasSearched &&
            query.trim().length >= MIN_QUERY_LENGTH &&
            results.length === 0 && (
              <div className="py-12 text-center">
                <div
                  className="
                    mx-auto
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                  "
                >
                  <LuSearch className="text-lg text-gray-400" />
                </div>

                <p className="mt-3 text-sm font-medium text-gray-800">
                  No articles found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try a different keyword or search phrase.
                </p>
              </div>
            )}

          {/* ============================================================
              SEARCH RESULTS
              ============================================================ */}

          {!loading &&
            results.map((post, index) => {
              const isSelected = selectedIndex === index;

              return (
                <div
                  key={post.postId}
                  onClick={() => openBlog(post.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`
                    group
                    mb-2
                    cursor-pointer
                    rounded-sm
                    border
                    p-1
                    transition-all
                    duration-150
                    ${
                      isSelected
                        ? "border-gray-300 bg-gray-50"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/70"
                    }
                  `}
                >
                  <div className="flex gap-3">
                    {/* ------------------------------------------------
                        COVER IMAGE
                        ------------------------------------------------ */}

                    <div
                      className="
                        relative
                        h-16
                        w-24
                        flex-shrink-0
                        overflow-hidden
                        rounded-sm
                        bg-gray-100
                      "
                    >
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>

                    {/* ------------------------------------------------
                        CONTENT
                        ------------------------------------------------ */}

                    <div className="min-w-0 flex-1">
                      {/* Title */}

                      <h3
                        className={`
                          truncate
                          text-[14px]
                          font-semibold
                          leading-5
                          ${isSelected ? "text-gray-950" : "text-gray-800"}
                        `}
                      >
                        {highlightText(post.title, query)}
                      </h3>

                      {/* Excerpt */}

                      {post.excerpt && (
                        <p className="mt-1 line-clamp-2 text-xs leading-[18px] text-gray-500">
                          {highlightText(post.excerpt, query)}
                        </p>
                      )}

                      {/* Tags */}

                      {post.tags?.length > 0 && (
                        <div className="mt-2 flex max-w-full gap-1.5 overflow-hidden">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="
                                flex-shrink-0
                                rounded
                                bg-gray-100
                                px-1.5
                                py-0.5
                                text-[9px]
                                font-medium
                                text-gray-500
                              "
                            >
                              #{highlightText(tag, query)}
                            </span>
                          ))}

                          {post.tags.length > 3 && (
                            <span
                              className="
                                flex-shrink-0
                                px-1
                                py-0.5
                                text-[9px]
                                text-gray-400
                              "
                            >
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ------------------------------------------------
                        OPEN INDICATOR
                        ------------------------------------------------ */}

                    <div
                      className={`
                        hidden
                        items-center
                        pr-1
                        transition-opacity
                        sm:flex
                        ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    >
                      <LuCornerDownLeft size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}

          {/* ============================================================
              VIEW ALL RESULTS
              ============================================================ */}

          {!loading && results.length > 0 && (
            <div className="flex justify-center pb-1 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  rounded-md
                  px-2
                  py-1
                  text-[11px]
                  font-medium
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                View all results
                <span
                  className="
                    transition-transform
                    duration-150
                    group-hover:translate-x-0.5
                  "
                >
                  →
                </span>
              </button>
            </div>
          )}
        </div>

        {/* ================================================================
            KEYBOARD FOOTER
            ================================================================ */}

        {results.length > 0 && (
          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-4
              border-t
              border-gray-100
              pt-3
              text-[10px]
              text-gray-400
            "
          >
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <LuArrowUp size={10} />
                <LuArrowDown size={10} />
              </span>
              Navigate
            </span>

            <span className="flex items-center gap-1">
              <LuCornerDownLeft size={10} />
              Open
            </span>

            <span>Esc Close</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchBarPopup;
