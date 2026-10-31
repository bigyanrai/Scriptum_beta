import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuHouse } from "react-icons/lu";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md text-center">
        {/* 404 */}
        <div className="text-8xl font-bold tracking-tight text-sky-600">
          404
        </div>

        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Page not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <LuArrowLeft className="text-base" />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            <LuHouse className="text-base" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
