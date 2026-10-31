import { useContext } from "react";
import { LuEye, LuPencil, LuTrash2, LuCalendarDays } from "react-icons/lu";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import CharAvatar from "./CharAvatar";

function MemberInfoCard({
  member,
  onView,
  onEdit,
  onDelete,
  isSearchMatch = false,
  selected = false,
  onSelect,
}) {
  const { user } = useContext(UserContext);

  const isCurrentAdmin = member._id === user?._id;

  // Can edit:
  // - Yourself
  // - Any normal member
  const canEdit = member.role === "member" || isCurrentAdmin;

  // Can delete:
  // - Only normal members
  const canDelete = member.role === "member";

  return (
    <div
      className={`
        group rounded-sm border bg-white
        p-2 transition-all duration-200

        ${
          isSearchMatch
            ? "border-sky-200 bg-sky-50/30 ring-1 ring-sky-100"
            : selected
              ? "border-black "
              : "border-gray-200/70 hover:border-gray-300 "
        }
      `}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* MEMBER INFO */}
        <div className="flex min-w-0 items-start gap-3">
          {/* Checkbox Space */}
          <div className="h-4 w-4 shrink-0">
            {canDelete && (
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onSelect?.(member._id, e.target.checked)}
                aria-label={`Select ${member.name}`}
                className="
                  h-4 w-4 shrink-0 cursor-pointer
                  rounded border-gray-300
                  text-sky-600
                  focus:ring-2 focus:ring-sky-100
                "
              />
            )}
          </div>

          {/* Avatar */}
          {member.profileImageUrl ? (
            <img
              src={member.profileImageUrl}
              alt={member.name}
              className="
                h-11
                w-11
                shrink-0
                rounded-full
                border
                border-gray-200
                bg-gray-50
                object-cover
                sm:h-12
                sm:w-12
              "
            />
          ) : (
            <CharAvatar
              fullName={member.name || ""}
              width="w-11"
              height="h-11"
              style="text-base sm:text-lg"
            />
          )}

          {/* Details */}
          <div className="min-w-0 flex-1">
            {/* Name */}
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-gray-800">
                {member.name}
              </h3>

              {isCurrentAdmin && (
                <span
                  className="
                    shrink-0 rounded-md
                    bg-sky-50 px-1.5 py-0.5
                    text-[9px] font-semibold
                    uppercase tracking-wide text-sky-600
                  "
                >
                  You
                </span>
              )}
            </div>

            {/* Email */}
            <p className="mt-0.5 truncate text-xs text-gray-400 sm:text-[13px]">
              {member.email}
            </p>

            {/* Meta */}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {/* Role */}
              <span
                className={`
                  rounded-md px-2 py-0.5
                  text-[10px] font-semibold
                  capitalize
                  ${
                    member.role === "admin"
                      ? "bg-sky-50 text-sky-600"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
              >
                {member.role}
              </span>

              {/* Joined */}
              <span className="flex items-center gap-1 text-[10px] text-gray-400 sm:text-[11px]">
                <LuCalendarDays className="h-3 w-3" />
                Joined {moment(member.createdAt).format("Do MMM YYYY")}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex w-full items-center justify-end gap-1.5
            border-t border-gray-100 pt-2
            sm:w-auto sm:border-0 sm:pt-0
          "
        >
          {/* View */}
          <button
            type="button"
            onClick={onView}
            aria-label={`View ${member.name}`}
            title="View"
            className="
              flex h-7 w-7 cursor-pointer
              items-center justify-center gap-1.5
              rounded-md
              bg-sky-50
              text-sky-600
              transition-all duration-150
              hover:bg-sky-600 hover:text-white
              sm:w-auto sm:px-2.5
            "
          >
            <LuEye className="text-[13px]" />
            <span className="hidden text-[10px] font-medium sm:inline">
              View
            </span>
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={onEdit}
            disabled={!canEdit}
            aria-label={`Edit ${member.name}`}
            title={canEdit ? "Edit" : "You don't have permission to edit"}
            className={`
              flex h-7 w-7
              items-center justify-center gap-1.5
              rounded-md
              transition-all duration-150
              sm:w-auto sm:px-2.5
              ${
                canEdit
                  ? "cursor-pointer bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                  : "cursor-not-allowed bg-gray-50 text-gray-300"
              }
            `}
          >
            <LuPencil className="text-[13px]" />
            <span className="hidden text-[10px] font-medium sm:inline">
              Edit
            </span>
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            disabled={!canDelete}
            aria-label={`Delete ${member.name}`}
            title={canDelete ? "Delete" : "You don't have permission to delete"}
            className={`
              flex h-7 w-7
              items-center justify-center gap-1.5
              rounded-md
              transition-all duration-150
              sm:w-auto sm:px-2.5
              ${
                canDelete
                  ? "cursor-pointer bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                  : "cursor-not-allowed bg-gray-50 text-gray-300"
              }
            `}
          >
            <LuTrash2 className="text-[13px]" />
            <span className="hidden text-[10px] font-medium sm:inline">
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberInfoCard;
