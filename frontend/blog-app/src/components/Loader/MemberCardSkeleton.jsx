const MemberCardSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-sm
            border border-gray-200/70
            bg-white
            p-2
          "
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* MEMBER INFO */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Checkbox Space */}
              <div className="h-4 w-4 shrink-0 rounded bg-gray-200" />

              {/* Avatar */}
              <div
                className="
                  h-11 w-11 shrink-0
                  rounded-full
                  bg-gray-200
                  sm:h-12 sm:w-12
                "
              />

              {/* Details */}
              <div className="min-w-0 flex-1 space-y-1.5">
                {/* Name */}
                <div className="h-3.5 w-32 rounded bg-gray-200" />

                {/* Email */}
                <div className="h-3 w-44 rounded bg-gray-100 sm:w-56" />

                {/* Meta */}
                <div className="flex items-center gap-3 pt-0.5">
                  {/* Role */}
                  <div className="h-4 w-12 rounded-md bg-gray-200" />

                  {/* Joined */}
                  <div className="h-3 w-28 rounded bg-gray-100" />
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
              <div className="h-7 w-7 rounded-md bg-gray-200 sm:w-[57px]" />

              {/* Edit */}
              <div className="h-7 w-7 rounded-md bg-gray-200 sm:w-[57px]" />

              {/* Delete */}
              <div className="h-7 w-7 rounded-md bg-gray-200 sm:w-[64px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberCardSkeleton;
