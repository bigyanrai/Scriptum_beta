const SearchSection = ({ title, icon, children }) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 px-5 pb-1 pt-4">
        <span className="text-sm text-gray-400">{icon}</span>

        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </p>
      </div>

      <div className="pb-2">{children}</div>
    </div>
  );
};

export default SearchSection;
