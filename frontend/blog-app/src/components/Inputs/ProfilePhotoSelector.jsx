import { useEffect, useRef, useState } from "react";
import { LuCamera, LuImagePlus, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);

  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const validateAndSetImage = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    validateAndSetImage(file);

    // Allows selecting the same image again
    e.target.value = "";
  };

  const handleRemove = (e) => {
    e.stopPropagation();

    setImage(null);
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    validateAndSetImage(file);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Profile image */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all duration-200 ${
          isDragging
            ? "scale-105 border-sky-500 bg-sky-50"
            : "border-gray-300 bg-gray-50 hover:border-sky-400 hover:bg-sky-50"
        }`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <LuCamera className="text-xl text-white" />

              <span className="mt-1 text-[10px] font-medium text-white">
                Change photo
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <LuImagePlus className="text-2xl transition-colors group-hover:text-sky-500" />

            <span className="mt-1 text-[10px] font-medium group-hover:text-sky-600">
              Add photo
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Remove */}
      {image && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
        >
          <LuTrash2 className="text-sm" />
          Remove photo
        </button>
      )}

      {/* Error / helper */}
      {error ? (
        <p className="mt-2 max-w-[240px] text-center text-[11px] leading-4 text-red-500">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-center text-[11px] leading-4 text-gray-400">
          JPG, PNG or WebP · Max 5MB
          <br />
          Click or drag an image here
        </p>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
