// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import toast from "react-hot-toast";
// import Modal from "../../components/Modal";
// import DeleteAlertContent from "../../components/DeleteAlertContent";
// import MemberInfoCard from "../../components/Cards/MemberInfoCard";
// import EditMemberModal from "../../components/EditMemberModal";
// import Pagination from "../../components/Pagination";
// import MemberCardSkeleton from "../../components/Loader/MemberCardSkeleton";
// import AdminModal from "../../components/AdminModal";

// const Members = () => {
//   const [members, setMembers] = useState([]);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalMembers, setTotalMembers] = useState(0);
//   const [totalAdmins, setTotalAdmins] = useState(0);

//   const [loading, setLoading] = useState(true);

//   // Sorting
//   const [sortBy, setSortBy] = useState("newest");
//   const [role, setRole] = useState("all");

//   // Selection
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   // Search
//   const [searchParams, setSearchParams] = useSearchParams();
//   const searchedMemberId = searchParams.get("member");

//   const [searchResult, setSearchResult] = useState(null);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const [deleteMemberLoading, setDeleteMemberLoading] = useState(false);

//   // Delete Modal
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     data: null,
//   });

//   // View Modal
//   const [openViewModal, setOpenViewModal] = useState({
//     open: false,
//     data: null,
//   });

//   // Edit Modal
//   const [openEditModal, setOpenEditModal] = useState({
//     open: false,
//     data: null,
//   });

//   // --------------------------------------------------
//   // Get all members
//   // --------------------------------------------------

//   const getAllMembers = async (pageNumber = page) => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `${API_PATHS.AUTH.GET_ALL_USERS}?page=${pageNumber}&limit=10&sortBy=${sortBy}&role=${role}`,
//       );

//       setMembers(response.data.users || []);

//       setTotalPages(response.data.totalPages || 1);

//       // Overall statistics
//       setTotalUsers(response.data.totalUsers || 0);
//       setTotalMembers(response.data.totalMembers || 0);
//       setTotalAdmins(response.data.totalAdmins || 0);

//       // Clear selections whenever data is refreshed
//       setSelectedMembers([]);
//     } catch (error) {
//       console.error(error);

//       toast.error(error?.response?.data?.message || "Failed to fetch members.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Get searched member
//   // --------------------------------------------------

//   const getSearchedMember = async (memberId) => {
//     try {
//       setSearchLoading(true);

//       const response = await axiosInstance.get(
//         API_PATHS.AUTH.GET_PROFILE_BY_ID_ADMIN(memberId),
//       );

//       setSearchResult(response.data);
//     } catch (error) {
//       console.error("Error fetching searched member:", error);

//       toast.error(
//         error?.response?.data?.message || "Member could not be found.",
//       );

//       setSearchParams({});
//       setSearchResult(null);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Individual delete
//   // --------------------------------------------------

//   const deleteMember = async (memberId) => {
//     try {
//       setDeleteMemberLoading(true);
//       await axiosInstance.delete(API_PATHS.AUTH.DELETE_USER_BY_ID(memberId));

//       toast.success("Member deleted successfully");

//       setOpenDeleteAlert({
//         open: false,
//         data: null,
//       });

//       setSelectedMembers((prev) => prev.filter((id) => id !== memberId));

//       // If deleting searched member
//       if (searchedMemberId === memberId) {
//         setSearchResult(null);
//         setSearchParams({});
//       }

//       getAllMembers();
//     } catch (error) {
//       console.error(error);

//       toast.error(error?.response?.data?.message || "Failed to delete member.");
//     } finally {
//       setDeleteMemberLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Bulk delete
//   // --------------------------------------------------

//   const bulkDeleteMembers = async (memberIds) => {
//     try {
//       setDeleteMemberLoading(true);
//       if (!memberIds || memberIds.length === 0) {
//         toast.error("No members selected.");
//         return;
//       }

//       const response = await axiosInstance.delete(
//         API_PATHS.AUTH.DELETE_USERS_BULK,
//         {
//           data: {
//             userIds: memberIds,
//           },
//         },
//       );

//       toast.success(
//         response?.data?.message ||
//           `${memberIds.length} member(s) deleted successfully`,
//       );

//       setOpenDeleteAlert({
//         open: false,
//         data: null,
//       });

//       setSelectedMembers([]);

//       getAllMembers();
//     } catch (error) {
//       console.error("Bulk delete members error:", error);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete selected members.",
//       );
//     } finally {
//       setDeleteMemberLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Selection
//   // --------------------------------------------------

//   const handleMemberSelect = (memberId, checked) => {
//     setSelectedMembers((prev) => {
//       if (checked) {
//         if (prev.includes(memberId)) {
//           return prev;
//         }

//         return [...prev, memberId];
//       }

//       return prev.filter((id) => id !== memberId);
//     });
//   };

//   // Only normal members can be selected
//   const selectableMembers = members.filter(
//     (member) => member.role === "member",
//   );

//   const allMembersSelected =
//     selectableMembers.length > 0 &&
//     selectableMembers.every((member) => selectedMembers.includes(member._id));

//   const someMembersSelected = selectedMembers.length > 0 && !allMembersSelected;

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       setSelectedMembers(selectableMembers.map((member) => member._id));
//     } else {
//       setSelectedMembers([]);
//     }
//   };

//   // --------------------------------------------------
//   // Page change
//   // --------------------------------------------------

//   const handlePageChange = (newPage) => {
//     setPage(newPage);

//     setSelectedMembers([]);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // --------------------------------------------------
//   // Load members
//   // --------------------------------------------------

//   useEffect(() => {
//     getAllMembers(page);
//   }, [page, sortBy, role]);

//   // Reset page when sorting/filtering changes
//   useEffect(() => {
//     setPage(1);
//     setSelectedMembers([]);
//   }, [sortBy, role]);

//   // --------------------------------------------------
//   // Search member
//   // --------------------------------------------------

//   useEffect(() => {
//     if (searchedMemberId) {
//       getSearchedMember(searchedMemberId);
//     } else {
//       setSearchResult(null);
//     }
//   }, [searchedMemberId]);

//   return (
//     <DashboardLayout activeMenu="Members">
//       <div>
//         {/* ==================================================
//             HEADER
//         ================================================== */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-sm bg-white border border-gray-200/90 p-2 ">
//           {/* Heading */}
//           <div>
//             <h2 className=" text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
//               Members
//             </h2>

//             <p className="mt-1 text-sm text-gray-400">
//               Manage registered members and their accounts.
//             </p>
//           </div>

//           {/* Statistics */}
//           <div className="flex items-center gap-2 sm:gap-3">
//             {/* Total Users */}
//             <div className="rounded-sm border border-gray-200/70 bg-white px-3 py-2 ">
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

//                 <span className="text-[10px] font-medium text-gray-500">
//                   Users
//                 </span>

//                 <span className="text-sm font-semibold text-gray-800">
//                   {totalUsers}
//                 </span>
//               </div>
//             </div>

//             {/* Members */}
//             <div className="rounded-sm border border-sky-100 bg-sky-50/40 px-3 py-2 ">
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

//                 <span className="text-[10px] font-medium text-sky-600">
//                   Members
//                 </span>

//                 <span className="text-sm font-semibold text-sky-600">
//                   {totalMembers}
//                 </span>
//               </div>
//             </div>

//             {/* Admins */}
//             <div className="rounded-sm border border-amber-100 bg-amber-50/40 px-3 py-2 ">
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

//                 <span className="text-[10px] font-medium text-amber-600">
//                   Admins
//                 </span>

//                 <span className="text-sm font-semibold text-amber-600">
//                   {totalAdmins}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==================================================
//             MEMBER DIRECTORY
//         ================================================== */}
//         <div className="mt-2 rounded-sm border border-gray-200/70 bg-white p-2 sm:p-2">
//           {/* ==================================================
//               DIRECTORY HEADER
//           ================================================== */}
//           <div className="flex flex-col gap-3 border-b border-gray-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
//             {/* Title */}
//             <div>
//               <h3 className="text-base font-semibold text-gray-800">
//                 {searchResult ? "Search Result" : "Member Directory"}
//               </h3>

//               <p className="mt-0.5 text-xs text-gray-400">
//                 {searchResult
//                   ? "Showing the member matching your search."
//                   : "View, edit or delete member accounts."}
//               </p>
//             </div>

//             {/* Search Clear */}
//             {searchResult && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchResult(null);
//                   setSearchParams({});
//                   setSelectedMembers([]);
//                 }}
//                 className="
//                   self-start rounded-lg
//                   border border-gray-200
//                   bg-white px-3 py-1.5
//                   text-xs font-medium text-gray-600
//                   transition-colors
//                   hover:bg-gray-50
//                   sm:self-auto
//                 "
//               >
//                 Clear Search
//               </button>
//             )}

//             {/* ==================================================
//                 FILTERS
//             ================================================== */}
//             {!searchResult && (
//               <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
//                 {/* Role Filter */}
//                 <div
//                   className="
//                     flex w-full items-center
//                     rounded-sm border border-gray-200/70
//                     bg-white
//                     transition-all
//                     sm:w-auto
//                   "
//                 >
//                   <div className="flex shrink-0 items-center border-r border-gray-100 px-2.5">
//                     <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
//                       Role
//                     </span>
//                   </div>

//                   <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="
//                       min-w-0 flex-1
//                       cursor-pointer
//                       appearance-none
//                       bg-transparent
//                       px-3 py-2
//                       pr-7
//                       text-xs font-medium
//                       text-gray-700
//                       outline-none
//                       sm:w-[125px]
//                       sm:flex-none
//                     "
//                   >
//                     <option value="all">All Users</option>
//                     <option value="member">Members Only</option>
//                     <option value="admin">Admins Only</option>
//                   </select>
//                 </div>

//                 {/* Sort */}
//                 <div
//                   className="
//                    flex w-full items-center
//                     rounded-sm border border-gray-200/70
//                     bg-white
//                     transition-all
//                     sm:w-auto
//                   "
//                 >
//                   <div className="flex shrink-0 items-center border-r border-gray-100 px-2.5">
//                     <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
//                       Sort
//                     </span>
//                   </div>

//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="
//                       min-w-0 flex-1
//                       cursor-pointer
//                       appearance-none
//                       bg-transparent
//                       px-3 py-2
//                       pr-7
//                       text-xs font-medium
//                       text-gray-700
//                       outline-none
//                       sm:w-[145px]
//                       sm:flex-none
//                     "
//                   >
//                     <option value="newest">Newest</option>
//                     <option value="oldest">Oldest</option>
//                     <option value="updated">Recently Updated</option>
//                     <option value="name_asc">Name A–Z</option>
//                     <option value="name_desc">Name Z–A</option>
//                     <option value="email_asc">Email A–Z</option>
//                     <option value="email_desc">Email Z–A</option>
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ==================================================
//               SEARCH RESULT INFO
//           ================================================== */}
//           {searchResult && (
//             <div className="mt-4 rounded-lg border border-sky-100 bg-sky-50/50 px-3 py-2.5">
//               <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-600">
//                 Search Result
//               </p>

//               <p className="mt-0.5 text-xs text-gray-500">
//                 Showing the member found from the global search.
//               </p>
//             </div>
//           )}

//           {/* ==================================================
//               SELECT ALL / BULK ACTIONS
//           ================================================== */}
//           {/* ==================================================
//     SELECT ALL / BULK ACTIONS
// ================================================== */}
//           {!searchResult && !loading && selectableMembers.length > 0 && (
//             <div
//               className="
//         mt-2
//         overflow-hidden
//         rounded-sm
//         border border-gray-200
//         bg-white

//       "
//             >
//               <div
//                 className="
//           flex flex-col
//           gap-3
//           px-3 py-3
//           sm:flex-row
//           sm:items-center
//           sm:justify-between
//           sm:px-4
//         "
//               >
//                 {/* Left: Select All */}
//                 <div className="flex min-w-0 items-center gap-3">
//                   {/* Custom checkbox wrapper */}
//                   <label
//                     className="
//               relative
//               flex h-5 w-5
//               shrink-0
//               cursor-pointer
//               items-center
//               justify-center
//             "
//                     title={
//                       allMembersSelected
//                         ? "Deselect all members"
//                         : "Select all members"
//                     }
//                   >
//                     <input
//                       type="checkbox"
//                       checked={allMembersSelected}
//                       ref={(input) => {
//                         if (input) {
//                           input.indeterminate = someMembersSelected;
//                         }
//                       }}
//                       onChange={(e) => handleSelectAll(e.target.checked)}
//                       className="
//                 peer
//                 h-4 w-4
//                 cursor-pointer
//                 appearance-none
//                 rounded-md
//                 border border-gray-300
//                 bg-white
//                 transition-all
//                 duration-150
//                 checked:border-sky-600
//                 checked:bg-sky-600
//                 indeterminate:border-sky-600
//                 indeterminate:bg-sky-600
//                 hover:border-sky-400
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-sky-100
//               "
//                     />

//                     {/* Check icon */}
//                     <svg
//                       className="
//                 pointer-events-none
//                 absolute
//                 hidden
//                 h-3 w-3
//                 text-white
//                 peer-checked:block
//               "
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     {/* Indeterminate icon */}
//                     {someMembersSelected && !allMembersSelected && (
//                       <span
//                         className="
//                   pointer-events-none
//                   absolute
//                   h-0.5 w-2.5
//                   rounded-full
//                   bg-white
//                 "
//                       />
//                     )}
//                   </label>

//                   {/* Selection information */}
//                   <div className="min-w-0">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="text-sm font-semibold text-gray-700">
//                         Select all members
//                       </span>

//                       <span
//                         className="
//                   rounded-full
//                   border border-gray-200
//                   bg-gray-50
//                   px-2
//                   py-0.5
//                   text-[10px]
//                   font-medium
//                   text-gray-500
//                 "
//                       >
//                         {selectableMembers.length} available
//                       </span>
//                     </div>

//                     <p className="mt-0.5 text-[11px] text-gray-400">
//                       {selectedMembers.length > 0
//                         ? `${selectedMembers.length} of ${selectableMembers.length} members selected`
//                         : "Choose members to perform bulk actions"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right: Bulk Actions */}
//                 <div className="flex items-center sm:justify-end">
//                   {selectedMembers.length > 0 ? (
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setOpenDeleteAlert({
//                           open: true,
//                           data: selectedMembers,
//                         })
//                       }
//                       className="
//                 inline-flex
//                 w-full
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-sm
//                 border border-red-200
//                 bg-red-50
//                 px-3.5 py-2
//                 text-xs
//                 font-semibold
//                 text-red-600
//                 transition-all
//                 duration-150
//                 hover:border-red-300
//                 hover:bg-red-100
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-red-100
//                 sm:w-auto
//               "
//                     >
//                       {/* Trash icon */}
//                       <svg
//                         className="h-3.5 w-3.5"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.8"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M3 6h18M9 6V4h6v2m-8 0 .8 14h8.4L17 6M10 10v6m4-6v6"
//                         />
//                       </svg>
//                       Delete Selected
//                       <span
//                         className="
//                   rounded-sm
//                   bg-red-100
//                   px-1.5
//                   py-0.5
//                   text-[10px]
//                   font-bold
//                   text-red-600
//                 "
//                       >
//                         {selectedMembers.length}
//                       </span>
//                     </button>
//                   ) : (
//                     <span
//                       className="
//                 hidden
//                 text-[11px]
//                 text-gray-400
//                 sm:block
//               "
//                     >
//                       No members selected
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Selection progress */}
//               {selectedMembers.length > 0 && (
//                 <div className="h-0.5 w-full bg-gray-100">
//                   <div
//                     className="
//               h-full
//               rounded-r-full
//               bg-sky-500
//               transition-all
//               duration-300
//             "
//                     style={{
//                       width: `${Math.min(
//                         (selectedMembers.length / selectableMembers.length) *
//                           100,
//                         100,
//                       )}%`,
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ==================================================
//               CONTENT
//           ================================================== */}
//           <div className="mt-4">
//             {/* Loading */}
//             {loading || searchLoading ? (
//               <MemberCardSkeleton />
//             ) : searchResult ? (
//               /* Search Result */
//               <MemberInfoCard
//                 member={searchResult}
//                 isSearchMatch={true}
//                 selected={selectedMembers.includes(searchResult._id)}
//                 onSelect={handleMemberSelect}
//                 onView={() =>
//                   setOpenViewModal({
//                     open: true,
//                     data: searchResult,
//                   })
//                 }
//                 onEdit={() =>
//                   setOpenEditModal({
//                     open: true,
//                     data: searchResult,
//                   })
//                 }
//                 onDelete={() =>
//                   setOpenDeleteAlert({
//                     open: true,
//                     data: searchResult._id,
//                   })
//                 }
//               />
//             ) : members.length > 0 ? (
//               /* Normal Members */
//               <div className="space-y-1">
//                 {members.map((member) => (
//                   <MemberInfoCard
//                     key={member._id}
//                     member={member}
//                     selected={selectedMembers.includes(member._id)}
//                     onSelect={handleMemberSelect}
//                     onView={() =>
//                       setOpenViewModal({
//                         open: true,
//                         data: member,
//                       })
//                     }
//                     onEdit={() =>
//                       setOpenEditModal({
//                         open: true,
//                         data: member,
//                       })
//                     }
//                     onDelete={() =>
//                       setOpenDeleteAlert({
//                         open: true,
//                         data: member._id,
//                       })
//                     }
//                   />
//                 ))}
//               </div>
//             ) : (
//               /* No Members */
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
//                   <svg
//                     className="h-7 w-7 text-gray-300"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-8 0v2m8 0H9m4-10a4 4 0 110-8 4 4 0 010 8z"
//                     />
//                   </svg>
//                 </div>

//                 <h3 className="text-sm font-semibold text-gray-700">
//                   No members found
//                 </h3>

//                 <p className="mt-1 text-xs text-gray-400">
//                   There are currently no registered members.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ==================================================
//             PAGINATION
//         ================================================== */}
//         {!searchResult && (
//           <div className="p-2">
//             <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         )}

//         {/* ==================================================
//             DELETE MODAL
//         ================================================== */}
//         <Modal
//           isOpen={openDeleteAlert.open}
//           onClose={() =>
//             setOpenDeleteAlert({
//               open: false,
//               data: null,
//             })
//           }
//           title={
//             Array.isArray(openDeleteAlert.data)
//               ? "Delete Members"
//               : "Delete Member"
//           }
//         >
//           <div className="w-full ">
//             <DeleteAlertContent
//               loading={deleteMemberLoading}
//               type="member"
//               danger={true}
//               content={
//                 Array.isArray(openDeleteAlert.data)
//                   ? `Are you sure you want to permanently delete ${openDeleteAlert.data.length} selected member(s)? This action cannot be undone.`
//                   : "Are you sure you want to permanently delete this member? This action cannot be undone."
//               }
//               onDelete={() => {
//                 if (Array.isArray(openDeleteAlert.data)) {
//                   bulkDeleteMembers(openDeleteAlert.data);
//                 } else {
//                   deleteMember(openDeleteAlert.data);
//                 }
//               }}
//             />
//           </div>
//         </Modal>

//         {/* ==================================================
//             VIEW MEMBER MODAL
//         ================================================== */}
//         <Modal
//           isOpen={openViewModal.open}
//           onClose={() =>
//             setOpenViewModal({
//               open: false,
//               data: null,
//             })
//           }
//           title="Member Details"
//         >
//           {openViewModal.data && (
//             <div className="w-full p-2 sm:p-3">
//               {/* Profile */}
//               <div className="flex flex-col items-center border-b border-gray-100 pb-5">
//                 <img
//                   src={
//                     openViewModal.data.profileImageUrl ||
//                     "http://localhost:8000/uploads/avatar/avatar.svg"
//                   }
//                   alt={openViewModal.data.name}
//                   className="
//                     h-20 w-20 rounded-full
//                     border border-gray-200
//                     bg-gray-50
//                     object-cover
//                     shadow-sm
//                   "
//                 />

//                 <h3 className="mt-3 text-base font-semibold text-gray-800">
//                   {openViewModal.data.name}
//                 </h3>

//                 <span
//                   className={`
//                     mt-2 rounded-md
//                     px-2.5 py-1
//                     text-[10px] font-semibold
//                     capitalize
//                     ${
//                       openViewModal.data.role === "admin"
//                         ? "bg-amber-50 text-amber-600"
//                         : "bg-sky-50 text-sky-600"
//                     }
//                   `}
//                 >
//                   {openViewModal.data.role}
//                 </span>
//               </div>

//               {/* Details */}
//               <div className="mt-5 grid gap-4 text-xs">
//                 <div>
//                   <p className="text-gray-400">Email</p>

//                   <p className="mt-0.5 break-all font-medium text-gray-700">
//                     {openViewModal.data.email}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400">Joined</p>

//                   <p className="mt-0.5 font-medium text-gray-700">
//                     {new Date(
//                       openViewModal.data.createdAt,
//                     ).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400">Last Updated</p>

//                   <p className="mt-0.5 font-medium text-gray-700">
//                     {new Date(
//                       openViewModal.data.updatedAt,
//                     ).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400">User ID</p>

//                   <p className="mt-0.5 break-all font-medium text-gray-700">
//                     {openViewModal.data._id}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal>

//         {/* ==================================================
//             EDIT MEMBER MODAL
//         ================================================== */}
//         <Modal
//           isOpen={openEditModal.open}
//           onClose={() =>
//             setOpenEditModal({
//               open: false,
//               data: null,
//             })
//           }
//           title="Edit Member"
//         >
//           {openEditModal.data && (
//             <EditMemberModal
//               member={openEditModal.data}
//               onClose={() =>
//                 setOpenEditModal({
//                   open: false,
//                   data: null,
//                 })
//               }
//               onSuccess={getAllMembers}
//             />
//           )}
//         </Modal>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Members;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import MemberInfoCard from "../../components/Cards/MemberInfoCard";
import EditMemberModal from "../../components/EditMemberModal";
import Pagination from "../../components/Pagination";
import MemberCardSkeleton from "../../components/Loader/MemberCardSkeleton";
import AdminModal from "../../components/AdminModal";
import CharAvatar from "../../components/CharAvatar";

const Members = () => {
  const [members, setMembers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  const [loading, setLoading] = useState(true);

  // Sorting
  const [sortBy, setSortBy] = useState("newest");
  const [role, setRole] = useState("all");

  // Selection
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Search
  const [searchParams, setSearchParams] = useSearchParams();
  const searchedMemberId = searchParams.get("member");

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [deleteMemberLoading, setDeleteMemberLoading] = useState(false);

  // Delete Modal
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // View Modal
  const [openViewModal, setOpenViewModal] = useState({
    open: false,
    data: null,
  });

  // Edit Modal
  const [openEditModal, setOpenEditModal] = useState({
    open: false,
    data: null,
  });

  // --------------------------------------------------
  // Get all members
  // --------------------------------------------------

  const getAllMembers = async (pageNumber = page) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${API_PATHS.AUTH.GET_ALL_USERS}?page=${pageNumber}&limit=10&sortBy=${sortBy}&role=${role}`,
      );

      setMembers(response.data.users || []);

      setTotalPages(response.data.totalPages || 1);

      // Overall statistics
      setTotalUsers(response.data.totalUsers || 0);
      setTotalMembers(response.data.totalMembers || 0);
      setTotalAdmins(response.data.totalAdmins || 0);

      // Clear selections whenever data is refreshed
      setSelectedMembers([]);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to fetch members.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Get searched member
  // --------------------------------------------------

  const getSearchedMember = async (memberId) => {
    try {
      setSearchLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE_BY_ID_ADMIN(memberId),
      );

      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching searched member:", error);

      toast.error(
        error?.response?.data?.message || "Member could not be found.",
      );

      setSearchParams({});
      setSearchResult(null);
    } finally {
      setSearchLoading(false);
    }
  };

  // --------------------------------------------------
  // Individual delete
  // --------------------------------------------------

  const deleteMember = async (memberId) => {
    try {
      setDeleteMemberLoading(true);

      await axiosInstance.delete(API_PATHS.AUTH.DELETE_USER_BY_ID(memberId));

      toast.success("Member deleted successfully");

      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));

      // If deleting searched member
      if (searchedMemberId === memberId) {
        setSearchResult(null);
        setSearchParams({});
      }

      getAllMembers();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to delete member.");
    } finally {
      setDeleteMemberLoading(false);
    }
  };

  // --------------------------------------------------
  // Bulk delete
  // --------------------------------------------------

  const bulkDeleteMembers = async (memberIds) => {
    try {
      setDeleteMemberLoading(true);

      if (!memberIds || memberIds.length === 0) {
        toast.error("No members selected.");
        return;
      }

      const response = await axiosInstance.delete(
        API_PATHS.AUTH.DELETE_USERS_BULK,
        {
          data: {
            userIds: memberIds,
          },
        },
      );

      toast.success(
        response?.data?.message ||
          `${memberIds.length} member(s) deleted successfully`,
      );

      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      setSelectedMembers([]);

      getAllMembers();
    } catch (error) {
      console.error("Bulk delete members error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete selected members.",
      );
    } finally {
      setDeleteMemberLoading(false);
    }
  };

  // --------------------------------------------------
  // Selection
  // --------------------------------------------------

  const handleMemberSelect = (memberId, checked) => {
    setSelectedMembers((prev) => {
      if (checked) {
        if (prev.includes(memberId)) {
          return prev;
        }

        return [...prev, memberId];
      }

      return prev.filter((id) => id !== memberId);
    });
  };

  // Only normal members can be selected
  const selectableMembers = members.filter(
    (member) => member.role === "member",
  );

  const allMembersSelected =
    selectableMembers.length > 0 &&
    selectableMembers.every((member) => selectedMembers.includes(member._id));

  const someMembersSelected = selectedMembers.length > 0 && !allMembersSelected;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMembers(selectableMembers.map((member) => member._id));
    } else {
      setSelectedMembers([]);
    }
  };

  // --------------------------------------------------
  // Page change
  // --------------------------------------------------

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setSelectedMembers([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // Load members
  // --------------------------------------------------

  useEffect(() => {
    getAllMembers(page);
  }, [page, sortBy, role]);

  // Reset page when sorting/filtering changes
  useEffect(() => {
    setPage(1);
    setSelectedMembers([]);
  }, [sortBy, role]);

  // --------------------------------------------------
  // Search member
  // --------------------------------------------------

  useEffect(() => {
    if (searchedMemberId) {
      getSearchedMember(searchedMemberId);
    } else {
      setSearchResult(null);
    }
  }, [searchedMemberId]);

  return (
    <DashboardLayout activeMenu="Members">
      <div>
        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="flex flex-col gap-3 rounded-sm border border-gray-200/90 bg-white p-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Heading */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">
              Members
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage registered members and their accounts.
            </p>
          </div>

          {/* Statistics */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Total Users */}
            <div className="rounded-sm border border-gray-200/70 bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

                <span className="text-[10px] font-medium text-gray-500">
                  Users
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {totalUsers}
                </span>
              </div>
            </div>

            {/* Members */}
            <div className="rounded-sm border border-sky-100 bg-sky-50/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

                <span className="text-[10px] font-medium text-sky-600">
                  Members
                </span>

                <span className="text-sm font-semibold text-sky-600">
                  {totalMembers}
                </span>
              </div>
            </div>

            {/* Admins */}
            <div className="rounded-sm border border-amber-100 bg-amber-50/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

                <span className="text-[10px] font-medium text-amber-600">
                  Admins
                </span>

                <span className="text-sm font-semibold text-amber-600">
                  {totalAdmins}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            MEMBER DIRECTORY
        ================================================== */}
        <div className="mt-2 rounded-sm border border-gray-200/70 bg-white p-2 sm:p-2">
          {/* ==================================================
              DIRECTORY HEADER
          ================================================== */}
          <div className="flex flex-col gap-3 border-b border-gray-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {searchResult ? "Search Result" : "Member Directory"}
              </h3>

              <p className="mt-0.5 text-xs text-gray-400">
                {searchResult
                  ? "Showing the member matching your search."
                  : "View, edit or delete member accounts."}
              </p>
            </div>

            {/* Search Clear */}
            {searchResult && (
              <button
                type="button"
                onClick={() => {
                  setSearchResult(null);
                  setSearchParams({});
                  setSelectedMembers([]);
                }}
                className="
                  self-start rounded-lg
                  border border-gray-200
                  bg-white px-3 py-1.5
                  text-xs font-medium text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  sm:self-auto
                "
              >
                Clear Search
              </button>
            )}

            {/* FILTERS */}
            {!searchResult && (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                {/* Role Filter */}
                <div
                  className="
                    flex w-full items-center
                    rounded-sm border border-gray-200/70
                    bg-white
                    transition-all
                    sm:w-auto
                  "
                >
                  <div className="flex shrink-0 items-center border-r border-gray-100 px-2.5">
                    <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
                      Role
                    </span>
                  </div>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="
                      min-w-0 flex-1
                      cursor-pointer
                      appearance-none
                      bg-transparent
                      px-3 py-2
                      pr-7
                      text-xs font-medium
                      text-gray-700
                      outline-none
                      sm:w-[125px]
                      sm:flex-none
                    "
                  >
                    <option value="all">All Users</option>
                    <option value="member">Members Only</option>
                    <option value="admin">Admins Only</option>
                  </select>
                </div>

                {/* Sort */}
                <div
                  className="
                    flex w-full items-center
                    rounded-sm border border-gray-200/70
                    bg-white
                    transition-all
                    sm:w-auto
                  "
                >
                  <div className="flex shrink-0 items-center border-r border-gray-100 px-2.5">
                    <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
                      Sort
                    </span>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="
                      min-w-0 flex-1
                      cursor-pointer
                      appearance-none
                      bg-transparent
                      px-3 py-2
                      pr-7
                      text-xs font-medium
                      text-gray-700
                      outline-none
                      sm:w-[145px]
                      sm:flex-none
                    "
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="updated">Recently Updated</option>
                    <option value="name_asc">Name A–Z</option>
                    <option value="name_desc">Name Z–A</option>
                    <option value="email_asc">Email A–Z</option>
                    <option value="email_desc">Email Z–A</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* SEARCH RESULT INFO */}
          {searchResult && (
            <div className="mt-4 rounded-lg border border-sky-100 bg-sky-50/50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-600">
                Search Result
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Showing the member found from the global search.
              </p>
            </div>
          )}

          {/* SELECT ALL / BULK ACTIONS */}
          {!searchResult && !loading && selectableMembers.length > 0 && (
            <div
              className="
                mt-2
                overflow-hidden
                rounded-sm
                border border-gray-200
                bg-white
              "
            >
              <div
                className="
                  flex flex-col
                  gap-3
                  px-3 py-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-4
                "
              >
                {/* Left: Select All */}
                <div className="flex min-w-0 items-center gap-3">
                  <label
                    className="
                      relative
                      flex h-5 w-5
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                    "
                    title={
                      allMembersSelected
                        ? "Deselect all members"
                        : "Select all members"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={allMembersSelected}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = someMembersSelected;
                        }
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="
                        peer
                        h-4 w-4
                        cursor-pointer
                        appearance-none
                        rounded-md
                        border border-gray-300
                        bg-white
                        transition-all
                        duration-150
                        checked:border-sky-600
                        checked:bg-sky-600
                        indeterminate:border-sky-600
                        indeterminate:bg-sky-600
                        hover:border-sky-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-100
                      "
                    />

                    <svg
                      className="
                        pointer-events-none
                        absolute
                        hidden
                        h-3 w-3
                        text-white
                        peer-checked:block
                      "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {someMembersSelected && !allMembersSelected && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          h-0.5 w-2.5
                          rounded-full
                          bg-white
                        "
                      />
                    )}
                  </label>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Select all members
                      </span>

                      <span
                        className="
                          rounded-full
                          border border-gray-200
                          bg-gray-50
                          px-2
                          py-0.5
                          text-[10px]
                          font-medium
                          text-gray-500
                        "
                      >
                        {selectableMembers.length} available
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {selectedMembers.length > 0
                        ? `${selectedMembers.length} of ${selectableMembers.length} members selected`
                        : "Choose members to perform bulk actions"}
                    </p>
                  </div>
                </div>

                {/* Right: Bulk Actions */}
                <div className="flex items-center sm:justify-end">
                  {selectedMembers.length > 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDeleteAlert({
                          open: true,
                          data: selectedMembers,
                        })
                      }
                      className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-sm
                        border border-red-200
                        bg-red-50
                        px-3.5 py-2
                        text-xs
                        font-semibold
                        text-red-600
                        transition-all
                        duration-150
                        hover:border-red-300
                        hover:bg-red-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-red-100
                        sm:w-auto
                      "
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 6h18M9 6V4h6v2m-8 0 .8 14h8.4L17 6M10 10v6m4-6v6"
                        />
                      </svg>
                      Delete Selected
                      <span
                        className="
                          rounded-sm
                          bg-red-100
                          px-1.5
                          py-0.5
                          text-[10px]
                          font-bold
                          text-red-600
                        "
                      >
                        {selectedMembers.length}
                      </span>
                    </button>
                  ) : (
                    <span
                      className="
                        hidden
                        text-[11px]
                        text-gray-400
                        sm:block
                      "
                    >
                      No members selected
                    </span>
                  )}
                </div>
              </div>

              {/* Selection progress */}
              {selectedMembers.length > 0 && (
                <div className="h-0.5 w-full bg-gray-100">
                  <div
                    className="
                      h-full
                      rounded-r-full
                      bg-sky-500
                      transition-all
                      duration-300
                    "
                    style={{
                      width: `${Math.min(
                        (selectedMembers.length / selectableMembers.length) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* CONTENT */}
          <div className="mt-4">
            {loading || searchLoading ? (
              <MemberCardSkeleton />
            ) : searchResult ? (
              <MemberInfoCard
                member={searchResult}
                isSearchMatch={true}
                selected={selectedMembers.includes(searchResult._id)}
                onSelect={handleMemberSelect}
                onView={() =>
                  setOpenViewModal({
                    open: true,
                    data: searchResult,
                  })
                }
                onEdit={() =>
                  setOpenEditModal({
                    open: true,
                    data: searchResult,
                  })
                }
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data: searchResult._id,
                  })
                }
              />
            ) : members.length > 0 ? (
              <div className="space-y-1">
                {members.map((member) => (
                  <MemberInfoCard
                    key={member._id}
                    member={member}
                    selected={selectedMembers.includes(member._id)}
                    onSelect={handleMemberSelect}
                    onView={() =>
                      setOpenViewModal({
                        open: true,
                        data: member,
                      })
                    }
                    onEdit={() =>
                      setOpenEditModal({
                        open: true,
                        data: member,
                      })
                    }
                    onDelete={() =>
                      setOpenDeleteAlert({
                        open: true,
                        data: member._id,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    className="h-7 w-7 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-8 0v2m8 0H9m4-10a4 4 0 110-8 4 4 0 010 8z"
                    />
                  </svg>
                </div>

                <h3 className="text-sm font-semibold text-gray-700">
                  No members found
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  There are currently no registered members.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION */}
        {!searchResult && (
          <div className="p-2">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* DELETE MODAL */}
        <Modal
          isOpen={openDeleteAlert.open}
          onClose={() =>
            setOpenDeleteAlert({
              open: false,
              data: null,
            })
          }
          title={
            Array.isArray(openDeleteAlert.data)
              ? "Delete Members"
              : "Delete Member"
          }
        >
          <div className="w-full">
            <DeleteAlertContent
              loading={deleteMemberLoading}
              type="member"
              danger={true}
              content={
                Array.isArray(openDeleteAlert.data)
                  ? `Are you sure you want to permanently delete ${openDeleteAlert.data.length} selected member(s)? This action cannot be undone.`
                  : "Are you sure you want to permanently delete this member? This action cannot be undone."
              }
              onDelete={() => {
                if (Array.isArray(openDeleteAlert.data)) {
                  bulkDeleteMembers(openDeleteAlert.data);
                } else {
                  deleteMember(openDeleteAlert.data);
                }
              }}
            />
          </div>
        </Modal>

        {/* VIEW MEMBER MODAL */}
        <Modal
          isOpen={openViewModal.open}
          onClose={() =>
            setOpenViewModal({
              open: false,
              data: null,
            })
          }
          title="Member Details"
        >
          {openViewModal.data && (
            <div className="w-full p-2 sm:p-3">
              {/* Profile */}
              <div className="flex flex-col items-center border-b border-gray-100 pb-5">
                {openViewModal.data.profileImageUrl ? (
                  <img
                    src={openViewModal.data.profileImageUrl}
                    alt={openViewModal.data.name}
                    className="
                      h-20 w-20 rounded-full
                      border border-gray-200
                      bg-gray-50
                      object-cover
                      shadow-sm
                    "
                  />
                ) : (
                  <CharAvatar
                    fullName={openViewModal.data.name}
                    width="w-20"
                    height="h-20"
                    style="
                      border border-gray-200
                      bg-sky-50
                      text-lg
                      text-sky-600
                      shadow-sm
                    "
                  />
                )}

                <h3 className="mt-3 text-base font-semibold text-gray-800">
                  {openViewModal.data.name}
                </h3>

                <span
                  className={`
                    mt-2 rounded-md
                    px-2.5 py-1
                    text-[10px] font-semibold
                    capitalize
                    ${
                      openViewModal.data.role === "admin"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-sky-50 text-sky-600"
                    }
                  `}
                >
                  {openViewModal.data.role}
                </span>
              </div>

              {/* Details */}
              <div className="mt-5 grid gap-4 text-xs">
                <div>
                  <p className="text-gray-400">Email</p>

                  <p className="mt-0.5 break-all font-medium text-gray-700">
                    {openViewModal.data.email}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Joined</p>

                  <p className="mt-0.5 font-medium text-gray-700">
                    {new Date(
                      openViewModal.data.createdAt,
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Last Updated</p>

                  <p className="mt-0.5 font-medium text-gray-700">
                    {new Date(
                      openViewModal.data.updatedAt,
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">User ID</p>

                  <p className="mt-0.5 break-all font-medium text-gray-700">
                    {openViewModal.data._id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* EDIT MEMBER MODAL */}
        <Modal
          isOpen={openEditModal.open}
          onClose={() =>
            setOpenEditModal({
              open: false,
              data: null,
            })
          }
          title="Edit Member"
        >
          {openEditModal.data && (
            <EditMemberModal
              member={openEditModal.data}
              onClose={() =>
                setOpenEditModal({
                  open: false,
                  data: null,
                })
              }
              onSuccess={getAllMembers}
            />
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Members;
