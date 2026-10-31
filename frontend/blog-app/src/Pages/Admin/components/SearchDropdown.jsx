// import {
//   LuSearch,
//   LuLoaderCircle,
//   LuFileText,
//   LuUsers,
//   LuMessageCircle,
//   LuArrowRight,
// } from "react-icons/lu";
// import SearchSection from "./SearchSection";

// const SearchDropdown = ({
//   searchQuery,
//   searchLoading,
//   searchError,
//   searchResults,
//   hasResults,
//   onPostClick,
//   onMemberClick,
//   onCommentClick,
//   onViewAll,
//   mobile = false,
// }) => {
//   if (!searchQuery.trim()) {
//     return null;
//   }

//   return (
//     <div
//       className={`${
//         mobile
//           ? "w-full"
//           : "absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
//       }`}
//     >
//       {searchLoading ? (
//         <div className="flex items-center justify-center gap-2 px-5 py-8 text-sm text-gray-500">
//           <LuLoaderCircle className="animate-spin text-lg" />
//           Searching...
//         </div>
//       ) : searchError ? (
//         <div className="px-5 py-8 text-center">
//           <p className="text-sm font-medium text-red-500">{searchError}</p>
//         </div>
//       ) : !hasResults ? (
//         <div className="px-5 py-10 text-center">
//           <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
//             <LuSearch className="text-lg text-gray-400" />
//           </div>

//           <p className="mt-3 text-sm font-medium text-gray-700">
//             No results found
//           </p>

//           <p className="mt-1 text-xs text-gray-400">
//             Try searching for a different post, member, or comment.
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="max-h-[min(70vh,520px)] overflow-y-auto">
//             {/* Posts */}
//             {searchResults.posts.length > 0 && (
//               <SearchSection title="Posts" icon={<LuFileText />}>
//                 {searchResults.posts.map((post) => (
//                   <button
//                     key={post._id}
//                     type="button"
//                     onClick={() => onPostClick(post)}
//                     className="group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
//                   >
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sky-50">
//                       {post.coverImageUrl ? (
//                         <img
//                           src={post.coverImageUrl}
//                           alt=""
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <LuFileText className="text-sky-500" />
//                       )}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-sm font-medium text-gray-800 group-hover:text-sky-600">
//                         {post.title}
//                       </p>

//                       <p className="mt-0.5 truncate text-xs text-gray-400">
//                         {post.author?.name || "Unknown author"}
//                         {post.isDraft ? " • Draft" : " • Published"}
//                       </p>
//                     </div>

//                     <LuArrowRight className="shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
//                   </button>
//                 ))}
//               </SearchSection>
//             )}

//             {/* Members */}
//             {searchResults.members.length > 0 && (
//               <SearchSection title="Members" icon={<LuUsers />}>
//                 {searchResults.members.map((member) => (
//                   <button
//                     key={member._id}
//                     type="button"
//                     onClick={() => onMemberClick(member)}
//                     className="group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
//                   >
//                     <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
//                       {member.profileImageUrl ? (
//                         <img
//                           src={member.profileImageUrl}
//                           alt=""
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center">
//                           <LuUsers className="text-gray-400" />
//                         </div>
//                       )}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-sm font-medium text-gray-800 group-hover:text-sky-600">
//                         {member.name}
//                       </p>

//                       <p className="truncate text-xs text-gray-400">
//                         {member.email}
//                       </p>
//                     </div>

//                     <LuArrowRight className="shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
//                   </button>
//                 ))}
//               </SearchSection>
//             )}

//             {/* Comments */}
//             {searchResults.comments.length > 0 && (
//               <SearchSection title="Comments" icon={<LuMessageCircle />}>
//                 {searchResults.comments.map((comment) => (
//                   <button
//                     key={comment._id}
//                     type="button"
//                     onClick={() => onCommentClick(comment)}
//                     className="group flex w-full items-start gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
//                   >
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
//                       <LuMessageCircle className="text-gray-500" />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="line-clamp-2 text-sm text-gray-700 group-hover:text-sky-600">
//                         {comment.content}
//                       </p>

//                       <p className="mt-1 truncate text-xs text-gray-400">
//                         {comment.author?.name || "Deleted User"}
//                         {comment.post?.title ? ` • ${comment.post.title}` : ""}
//                       </p>
//                     </div>

//                     <LuArrowRight className="mt-1 shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
//                   </button>
//                 ))}
//               </SearchSection>
//             )}
//           </div>

//           {/* View All */}
//           <div className="border-t border-gray-100 bg-gray-50/70 p-2">
//             <button
//               type="button"
//               onClick={onViewAll}
//               className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-sky-600 transition hover:bg-sky-50"
//             >
//               View all results
//               <LuArrowRight className="text-base" />
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;

import {
  LuSearch,
  LuLoaderCircle,
  LuFileText,
  LuUsers,
  LuMessageCircle,
  LuArrowRight,
} from "react-icons/lu";
import SearchSection from "./SearchSection";

const SearchDropdown = ({
  searchQuery,
  searchLoading,
  searchError,
  searchResults,
  hasResults,
  onPostClick,
  onMemberClick,
  onCommentClick,
  onViewAll,
  mobile = false,
}) => {
  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div
      className={`${
        mobile
          ? "w-full"
          : "absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden  border border-gray-200 bg-white shadow-xl"
      }`}
    >
      {searchLoading ? (
        <div className="flex items-center justify-center gap-2 px-5 py-8 text-sm text-gray-500">
          <LuLoaderCircle className="animate-spin text-lg" />
          Searching...
        </div>
      ) : searchError ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm font-medium text-red-500">{searchError}</p>
        </div>
      ) : !hasResults ? (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
            <LuSearch className="text-lg text-gray-400" />
          </div>

          <p className="mt-3 text-sm font-medium text-gray-700">
            No results found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try searching for a different post, member, or comment.
          </p>
        </div>
      ) : (
        <>
          <div className="max-h-[min(70vh,520px)] overflow-y-auto">
            {/* Posts */}
            {searchResults.posts.length > 0 && (
              <SearchSection title="Posts" icon={<LuFileText />}>
                {searchResults.posts.map((post) => (
                  <button
                    key={post._id}
                    type="button"
                    onClick={() => onPostClick(post)}
                    className="group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sky-50">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <LuFileText className="text-sky-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800 group-hover:text-sky-600">
                        {post.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-400">
                        {post.author?.name || "Unknown author"}
                        {post.isDraft ? " • Draft" : " • Published"}
                      </p>
                    </div>

                    <LuArrowRight className="shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
                  </button>
                ))}
              </SearchSection>
            )}

            {/* Members */}
            {searchResults.members.length > 0 && (
              <SearchSection title="Members" icon={<LuUsers />}>
                {searchResults.members.map((member) => (
                  <button
                    key={member._id}
                    type="button"
                    onClick={() => onMemberClick(member)}
                    className="group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      {member.profileImageUrl ? (
                        <img
                          src={member.profileImageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <LuUsers className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800 group-hover:text-sky-600">
                        {member.name}
                      </p>

                      <p className="truncate text-xs text-gray-400">
                        {member.email}
                      </p>
                    </div>

                    <LuArrowRight className="shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
                  </button>
                ))}
              </SearchSection>
            )}

            {/* Comments */}
            {searchResults.comments.length > 0 && (
              <SearchSection title="Comments" icon={<LuMessageCircle />}>
                {searchResults.comments.map((comment) => (
                  <button
                    key={comment._id}
                    type="button"
                    onClick={() => onCommentClick(comment)}
                    className="group flex w-full items-start gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <LuMessageCircle className="text-gray-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm text-gray-700 group-hover:text-sky-600">
                        {comment.content}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-400">
                        {comment.author?.name || "Deleted User"}
                        {comment.post?.title ? ` • ${comment.post.title}` : ""}
                      </p>
                    </div>

                    <LuArrowRight className="mt-1 shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
                  </button>
                ))}
              </SearchSection>
            )}
          </div>

          {/* View All */}
          <div className="flex justify-center border-t border-gray-100 px-4 py-2.5">
            <button
              type="button"
              onClick={onViewAll}
              className="group inline-flex items-center gap-1 text-xs font-medium text-gray-700 transition hover:text-black"
            >
              View all results
              <LuArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
