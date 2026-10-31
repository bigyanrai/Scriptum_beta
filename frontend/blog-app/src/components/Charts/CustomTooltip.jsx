const CustomTooltip = ({ active, payload }) => {
  if (active && payload.length) {
    // console.log("payload__", payload[0].payload.name);
    // console.log("payload__", payload);

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-sky-800 mb-1">
          {payload[0].payload.name}
        </p>
        <p className="text-sm text-gray-600">
          Count:
          <span className="text-sm font-medium text-gray-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
