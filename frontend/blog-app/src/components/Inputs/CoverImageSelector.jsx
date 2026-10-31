// import { useRef, useState } from "react";
// import Cropper from "react-easy-crop";

// import {
//   LuTrash2,
//   LuUpload,
//   LuRefreshCcw,
//   LuCrop,
//   LuImage,
//   LuX,
//   LuCheck,
//   LuRotateCcw,
//   LuRotateCw,
//   LuFlipHorizontal2,
//   LuFlipVertical2,
//   LuMaximize2,
//   LuUndo2,
// } from "react-icons/lu";

// import getCroppedImg from "../../utils/cropImage";

// const ASPECT_RATIOS = [
//   { label: "16:9", value: 16 / 9 },
//   { label: "4:3", value: 4 / 3 },
//   { label: "1:1", value: 1 },
//   { label: "3:4", value: 3 / 4 },
// ];

// const CoverImageSelector = ({ image, setImage, preview, setPreview }) => {
//   const inputRef = useRef(null);

//   const [previewUrl, setPreviewUrl] = useState(null);

//   const [crop, setCrop] = useState({
//     x: 0,
//     y: 0,
//   });

//   const [zoom, setZoom] = useState(1);

//   const [rotation, setRotation] = useState(0);

//   const [flip, setFlip] = useState({
//     horizontal: false,
//     vertical: false,
//   });

//   const [aspect, setAspect] = useState(16 / 9);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const [cropImage, setCropImage] = useState(null);

//   const [openCropper, setOpenCropper] = useState(false);

//   const [isDragging, setIsDragging] = useState(false);

//   const [error, setError] = useState("");

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --------------------------------------------------
//   // File processing
//   // --------------------------------------------------

//   const processFile = (file) => {
//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     const maxSize = 5 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       setError("Only JPG, PNG, and WEBP images are allowed.");
//       return;
//     }

//     if (file.size > maxSize) {
//       setError("Image size must be less than 5MB.");
//       return;
//     }

//     setError("");

//     const url = URL.createObjectURL(file);

//     setCrop({
//       x: 0,
//       y: 0,
//     });

//     setZoom(1);

//     setRotation(0);

//     setFlip({
//       horizontal: false,
//       vertical: false,
//     });

//     setAspect(16 / 9);

//     setCroppedAreaPixels(null);

//     setCropImage(url);

//     setOpenCropper(true);
//   };

//   const handleImageChange = (event) => {
//     processFile(event.target.files?.[0]);

//     /*
//      * Allows selecting the same file again.
//      */
//     event.target.value = "";
//   };

//   // --------------------------------------------------
//   // Crop
//   // --------------------------------------------------

//   const onCropComplete = (_, croppedPixels) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   // --------------------------------------------------
//   // Live Cropper Transform
//   // --------------------------------------------------

//   /*
//    * IMPORTANT:
//    *
//    * react-easy-crop does not use the `flip` prop
//    * for the visual editor.
//    *
//    * Instead, we use its `transform` prop.
//    *
//    * rotateY(180deg) = horizontal flip
//    * rotateX(180deg) = vertical flip
//    *
//    * This makes the flip visible immediately while
//    * editing.
//    */
//   const cropperTransform = [
//     `translate(${crop.x}px, ${crop.y}px)`,
//     `rotate(${rotation}deg)`,
//     `rotateY(${flip.horizontal ? 180 : 0}deg)`,
//     `rotateX(${flip.vertical ? 180 : 0}deg)`,
//     `scale(${zoom})`,
//   ].join(" ");

//   // --------------------------------------------------
//   // Apply crop / transformations
//   // --------------------------------------------------

//   const handleCropImage = async () => {
//     if (!cropImage || !croppedAreaPixels) return;

//     setIsProcessing(true);

//     try {
//       const croppedImageUrl = await getCroppedImg(
//         cropImage,
//         croppedAreaPixels,
//         rotation,
//         flip,
//       );

//       const response = await fetch(croppedImageUrl);

//       const blob = await response.blob();

//       const file = new File([blob], "cover-image.jpeg", {
//         type: "image/jpeg",
//       });

//       /*
//        * Update actual form image.
//        */
//       setImage(file);

//       /*
//        * Update preview.
//        */
//       setPreview(croppedImageUrl);

//       setPreviewUrl(croppedImageUrl);

//       closeCropper();
//     } catch (error) {
//       console.error("Crop error:", error);

//       setError("Failed to process image. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // --------------------------------------------------
//   // Rotation
//   // --------------------------------------------------

//   const rotateLeft = () => {
//     setRotation((current) => current - 90);
//   };

//   const rotateRight = () => {
//     setRotation((current) => current + 90);
//   };

//   // --------------------------------------------------
//   // Flip
//   // --------------------------------------------------

//   const flipHorizontal = () => {
//     setFlip((current) => ({
//       ...current,
//       horizontal: !current.horizontal,
//     }));
//   };

//   const flipVertical = () => {
//     setFlip((current) => ({
//       ...current,
//       vertical: !current.vertical,
//     }));
//   };

//   // --------------------------------------------------
//   // Reset editor
//   // --------------------------------------------------

//   const resetEditor = () => {
//     setCrop({
//       x: 0,
//       y: 0,
//     });

//     setZoom(1);

//     setRotation(0);

//     setFlip({
//       horizontal: false,
//       vertical: false,
//     });

//     setAspect(16 / 9);

//     setCroppedAreaPixels(null);
//   };

//   // --------------------------------------------------
//   // Drag & Drop
//   // --------------------------------------------------

//   const handleDragOver = (e) => {
//     e.preventDefault();

//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();

//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();

//     setIsDragging(false);

//     const file = e.dataTransfer.files?.[0];

//     processFile(file);
//   };

//   // --------------------------------------------------
//   // Remove
//   // --------------------------------------------------

//   const handleRemoveImage = () => {
//     setImage(null);

//     setPreview(null);

//     setPreviewUrl(null);

//     setCropImage(null);
//   };

//   // --------------------------------------------------
//   // File chooser
//   // --------------------------------------------------

//   const onChooseFile = () => {
//     inputRef.current?.click();
//   };

//   // --------------------------------------------------
//   // Open cropper for existing image
//   // --------------------------------------------------

//   const openEditor = () => {
//     const currentImage = preview || previewUrl;

//     if (!currentImage) return;

//     setCropImage(currentImage);

//     /*
//      * Start editing from a clean state.
//      */
//     setCrop({
//       x: 0,
//       y: 0,
//     });

//     setZoom(1);

//     setRotation(0);

//     setFlip({
//       horizontal: false,
//       vertical: false,
//     });

//     setAspect(16 / 9);

//     setCroppedAreaPixels(null);

//     setOpenCropper(true);
//   };

//   // --------------------------------------------------
//   // Close cropper
//   // --------------------------------------------------

//   const closeCropper = () => {
//     setOpenCropper(false);

//     setCropImage(null);

//     setZoom(1);

//     setRotation(0);

//     setFlip({
//       horizontal: false,
//       vertical: false,
//     });

//     setCrop({
//       x: 0,
//       y: 0,
//     });

//     setCroppedAreaPixels(null);
//   };

//   const currentPreview = preview || previewUrl;

//   return (
//     <div className="w-full">
//       {/* ==================================================
//           ERROR
//       ================================================== */}

//       {error && (
//         <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5">
//           <p className="text-xs font-medium text-rose-600">{error}</p>

//           <button
//             type="button"
//             onClick={() => setError("")}
//             className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-rose-400 transition hover:bg-rose-100 hover:text-rose-600"
//           >
//             <LuX size={14} />
//           </button>
//         </div>
//       )}

//       {/* ==================================================
//           HIDDEN INPUT
//       ================================================== */}

//       <input
//         type="file"
//         accept="image/jpeg,image/png,image/webp"
//         ref={inputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {/* ==================================================
//           EMPTY STATE
//       ================================================== */}

//       {!image && !currentPreview ? (
//         <div
//           onClick={onChooseFile}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           className={`
//             group relative flex min-h-[210px] w-full
//             cursor-pointer flex-col items-center justify-center
//             overflow-hidden rounded-sm border border-dashed
//             px-5 py-8 text-center
//             transition-all duration-200
//             ${
//               isDragging
//                 ? "border-sky-400 bg-sky-50"
//                 : "border-slate-300 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/40"
//             }
//           `}
//         >
//           <div
//             className="
//               flex h-12 w-12 items-center justify-center
//               rounded-sm bg-white text-slate-500 shadow-sm
//               ring-1 ring-slate-200
//               transition-all duration-200
//               group-hover:bg-sky-50
//               group-hover:text-sky-600
//               group-hover:ring-sky-200
//             "
//           >
//             {isDragging ? <LuUpload size={20} /> : <LuImage size={20} />}
//           </div>

//           <h3 className="mt-3 text-sm font-semibold text-slate-800">
//             {isDragging ? "Drop your image here" : "Upload cover image"}
//           </h3>

//           <p className="mt-1 text-xs text-slate-400">
//             Drag & drop or click to browse
//           </p>

//           <span
//             className="
//     mt-4 inline-flex items-center gap-2
//     rounded-lg
//     bg-black px-3.5 py-2
//     text-xs font-semibold text-white
//     shadow-sm
//     transition-all duration-200
//     group-hover:white
//     group-hover:shadow-md
//     group-hover:-translate-y-0.5
//   "
//           >
//             <LuUpload size={13} />
//             Choose Image
//           </span>

//           <p className="mt-3 text-[10px] text-slate-400">
//             JPG · PNG · WEBP · Max 5MB
//           </p>
//         </div>
//       ) : (
//         /* ==================================================
//            IMAGE PREVIEW
//         ================================================== */

//         <div className="group relative overflow-hidden rounded-sm border border-slate-200 bg-slate-100 shadow-sm">
//           <img
//             src={currentPreview}
//             alt="Cover"
//             className="
//               aspect-video
//               h-auto
//               max-h-[420px]
//               w-full
//               object-cover
//               transition-transform
//               duration-500
//               group-hover:scale-[1.015]
//             "
//           />

//           {/* Overlay */}

//           <div
//             className="
//               pointer-events-none absolute inset-0
//               bg-gradient-to-t
//               from-slate-950/70
//               via-slate-950/10
//               to-transparent
//               opacity-0
//               transition-opacity duration-200
//               group-hover:opacity-100
//             "
//           />

//           {/* Ratio badge */}

//           <div
//             className="
//               absolute left-3 top-3
//               rounded-lg border border-white/20
//               bg-black/45 px-2.5 py-1
//               text-[10px] font-medium text-white
//               backdrop-blur-md
//             "
//           >
//             Cover Image
//           </div>

//           {/* Actions */}

//           <div
//             className="
//               absolute bottom-3 left-3 right-3
//               flex flex-wrap items-center justify-between
//               gap-2
//               opacity-0
//               transition-opacity duration-200
//               group-hover:opacity-100
//             "
//           >
//             <div className="flex flex-wrap items-center gap-1.5">
//               <button
//                 type="button"
//                 onClick={openEditor}
//                 className="
//                   inline-flex items-center gap-1.5
//                   rounded-sm border border-white/20
//                   bg-white/95 px-2.5 py-1.5
//                   text-[10px] font-semibold text-slate-700
//                   shadow-lg backdrop-blur
//                   transition
//                   hover:bg-sky-50 hover:text-sky-600
//                 "
//               >
//                 <LuCrop size={12} />
//                 Edit
//               </button>

//               <button
//                 type="button"
//                 onClick={onChooseFile}
//                 className="
//                   inline-flex items-center gap-1.5
//                   rounded-lg border border-white/20
//                   bg-white/95 px-2.5 py-1.5
//                   text-[10px] font-semibold text-slate-700
//                   shadow-lg backdrop-blur
//                   transition
//                   hover:bg-sky-50 hover:text-sky-600
//                 "
//               >
//                 <LuRefreshCcw size={12} />
//                 Replace
//               </button>
//             </div>

//             <button
//               type="button"
//               onClick={handleRemoveImage}
//               className="
//                 inline-flex items-center gap-1.5
//                 rounded-lg bg-rose-500 px-2.5 py-1.5
//                 text-[10px] font-semibold text-white
//                 shadow-lg transition
//                 hover:bg-rose-600
//               "
//             >
//               <LuTrash2 size={12} />
//               Remove
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ==================================================
//           IMAGE EDITOR
//       ================================================== */}

//       {openCropper && (
//         <div
//           className="
//             fixed inset-0 z-[100]
//             flex items-center justify-center
//             bg-slate-950/75
//             p-2 sm:p-4
//             backdrop-blur-sm
//           "
//           onClick={closeCropper}
//         >
//           <div
//             className="
//               flex w-full max-w-4xl
//               max-h-[96vh]
//               flex-col
//               overflow-hidden
//               rounded-sm
//               border border-white/10
//               bg-white
//               shadow-2xl
//             "
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* ==================================================
//                 HEADER
//             ================================================== */}

//             <div
//               className="
//                 flex shrink-0 items-center justify-between
//                 border-b border-slate-200
//                 px-4 py-3 sm:px-5
//               "
//             >
//               <div className="min-w-0">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="
//                       flex h-8 w-8 shrink-0
//                       items-center justify-center
//                       rounded-lg bg-sky-50
//                       text-sky-600
//                     "
//                   >
//                     <LuCrop size={15} />
//                   </div>

//                   <div>
//                     <h2 className="text-sm font-bold text-slate-900">
//                       Edit Cover Image
//                     </h2>

//                     <p className="hidden text-[10px] text-slate-400 sm:block">
//                       Crop, resize, rotate and adjust your image
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeCropper}
//                 className="
//                   flex h-8 w-8 shrink-0
//                   items-center justify-center
//                   rounded-lg text-slate-400
//                   transition
//                   hover:bg-slate-100
//                   hover:text-slate-700
//                 "
//               >
//                 <LuX size={17} />
//               </button>
//             </div>

//             {/* ==================================================
//                 EDITOR AREA
//             ================================================== */}

//             <div
//               className="
//                 min-h-0 flex-1
//                 overflow-y-auto
//                 bg-slate-50
//               "
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
//                 {/* ==================================================
//                     CANVAS
//                 ================================================== */}

//                 <div className="bg-slate-950 p-3 sm:p-5">
//                   <div
//                     className="
//                       relative
//                       mx-auto
//                       aspect-video
//                       w-full
//                       max-h-[55vh]
//                       overflow-hidden
//                       rounded-xl
//                       bg-black
//                       shadow-xl
//                     "
//                   >
//                     {cropImage && (
//                       <Cropper
//                         image={cropImage}
//                         crop={crop}
//                         zoom={zoom}
//                         rotation={rotation}
//                         aspect={aspect}
//                         /*
//                          * IMPORTANT:
//                          *
//                          * This is what makes the flip
//                          * visible immediately.
//                          */
//                         transform={cropperTransform}
//                         showGrid
//                         restrictPosition={false}
//                         onCropChange={setCrop}
//                         onZoomChange={setZoom}
//                         onRotationChange={setRotation}
//                         onCropComplete={onCropComplete}
//                       />
//                     )}
//                   </div>

//                   <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
//                     <LuMaximize2 size={12} />

//                     <span>
//                       Drag image to reposition · Use controls to adjust
//                     </span>
//                   </div>
//                 </div>

//                 {/* ==================================================
//                     CONTROLS
//                 ================================================== */}

//                 <div className="border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
//                   <div className="p-4 sm:p-5">
//                     {/* ==================================================
//                         ASPECT RATIO
//                     ================================================== */}

//                     <div>
//                       <div className="mb-2 flex items-center justify-between">
//                         <label className="text-[11px] font-semibold text-slate-800">
//                           Aspect Ratio
//                         </label>

//                         <span className="text-[10px] text-slate-400">
//                           Output shape
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-4 gap-1.5">
//                         {ASPECT_RATIOS.map((item) => {
//                           const active = aspect === item.value;

//                           return (
//                             <button
//                               key={item.label}
//                               type="button"
//                               onClick={() => setAspect(item.value)}
//                               className={`
//                                 rounded-lg border px-2 py-2
//                                 text-[10px] font-semibold
//                                 transition
//                                 ${
//                                   active
//                                     ? "border-slate-900 bg-slate-900 text-white"
//                                     : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
//                                 }
//                               `}
//                             >
//                               {item.label}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>

//                     {/* ==================================================
//                         ZOOM
//                     ================================================== */}

//                     <div className="mt-5">
//                       <div className="mb-2 flex items-center justify-between">
//                         <label className="text-[11px] font-semibold text-slate-800">
//                           Scale
//                         </label>

//                         <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
//                           {zoom.toFixed(1)}×
//                         </span>
//                       </div>

//                       <input
//                         type="range"
//                         min="1"
//                         max="4"
//                         step="0.05"
//                         value={zoom}
//                         onChange={(e) => setZoom(Number(e.target.value))}
//                         className="
//                           h-1.5 w-full
//                           cursor-pointer
//                           accent-slate-900
//                         "
//                       />

//                       <div className="mt-1 flex justify-between text-[9px] text-slate-400">
//                         <span>Fit</span>
//                         <span>4×</span>
//                       </div>
//                     </div>

//                     {/* ==================================================
//                         ROTATION
//                     ================================================== */}

//                     <div className="mt-5">
//                       <div className="mb-2 flex items-center justify-between">
//                         <label className="text-[11px] font-semibold text-slate-800">
//                           Rotation
//                         </label>

//                         <span className="text-[10px] text-slate-400">
//                           {rotation}°
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <button
//                           type="button"
//                           onClick={rotateLeft}
//                           className="
//                             flex h-9 flex-1
//                             items-center justify-center
//                             gap-1.5 rounded-lg
//                             border border-slate-200
//                             text-[10px] font-semibold
//                             text-slate-600
//                             transition
//                             hover:bg-slate-50
//                             hover:text-slate-900
//                           "
//                         >
//                           <LuRotateCcw size={14} />
//                           Left
//                         </button>

//                         <button
//                           type="button"
//                           onClick={rotateRight}
//                           className="
//                             flex h-9 flex-1
//                             items-center justify-center
//                             gap-1.5 rounded-lg
//                             border border-slate-200
//                             text-[10px] font-semibold
//                             text-slate-600
//                             transition
//                             hover:bg-slate-50
//                             hover:text-slate-900
//                           "
//                         >
//                           <LuRotateCw size={14} />
//                           Right
//                         </button>
//                       </div>
//                     </div>

//                     {/* ==================================================
//                         FLIP
//                     ================================================== */}

//                     <div className="mt-5">
//                       <label className="mb-2 block text-[11px] font-semibold text-slate-800">
//                         Flip
//                       </label>

//                       <div className="flex gap-2">
//                         {/* Horizontal */}

//                         <button
//                           type="button"
//                           onClick={flipHorizontal}
//                           className={`
//                             flex h-9 flex-1
//                             items-center justify-center
//                             gap-1.5 rounded-lg border
//                             text-[10px] font-semibold
//                             transition
//                             ${
//                               flip.horizontal
//                                 ? "border-sky-200 bg-sky-50 text-sky-600"
//                                 : "border-slate-200 text-slate-600 hover:bg-slate-50"
//                             }
//                           `}
//                         >
//                           <LuFlipHorizontal2 size={14} />
//                           Horizontal
//                         </button>

//                         {/* Vertical */}

//                         <button
//                           type="button"
//                           onClick={flipVertical}
//                           className={`
//                             flex h-9 flex-1
//                             items-center justify-center
//                             gap-1.5 rounded-lg border
//                             text-[10px] font-semibold
//                             cursor-pointer
//                             transition
//                             ${
//                               flip.vertical
//                                 ? "border-sky-200 bg-sky-50 text-sky-600"
//                                 : "border-slate-200 text-slate-600 hover:bg-slate-50"
//                             }
//                           `}
//                         >
//                           <LuFlipVertical2 size={14} />
//                           Vertical
//                         </button>
//                       </div>
//                     </div>

//                     {/* ==================================================
//                         RESET
//                     ================================================== */}

//                     <button
//                       type="button"
//                       onClick={resetEditor}
//                       className="
//                       cursor-pointer
//                         mt-5 inline-flex w-full
//                         items-center justify-center gap-1.5
//                         rounded-lg border border-slate-200
//                         bg-white px-3 py-2
//                         text-[10px] font-semibold
//                         text-slate-500
//                         transition
//                         hover:bg-slate-50
//                         hover:text-slate-800
//                       "
//                     >
//                       <LuUndo2 size={13} />
//                       Reset Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ==================================================
//                 FOOTER
//             ================================================== */}

//             <div
//               className="
//                 flex shrink-0
//                 flex-col-reverse gap-2
//                 border-t border-slate-200
//                 bg-white px-4 py-3
//                 sm:flex-row sm:items-center
//                 sm:justify-between
//                 sm:px-5
//               "
//             >
//               <p className="text-center text-[10px] text-slate-400 sm:text-left">
//                 Recommended cover ratio: 16:9
//               </p>

//               <div className="flex items-center justify-end gap-2">
//                 {/* Cancel */}

//                 <button
//                   type="button"
//                   onClick={closeCropper}
//                   disabled={isProcessing}
//                   className="
//                   cursor-pointer
//                     inline-flex items-center gap-1.5
//                     rounded-lg border border-slate-200
//                     bg-white px-3 py-2
//                     text-[10px] font-semibold
//                     text-slate-600
//                     transition
//                     hover:bg-slate-50
//                     disabled:cursor-not-allowed
//                     disabled:opacity-50
//                   "
//                 >
//                   <LuX size={13} />
//                   Cancel
//                 </button>

//                 {/* Apply */}

//                 <button
//                   type="button"
//                   onClick={handleCropImage}
//                   disabled={isProcessing}
//                   className="
//                     inline-flex items-center gap-1.5
//                     rounded-lg bg-slate-900
//                     px-4 py-2
//                     cursor-pointer
//                     text-[10px] font-semibold
//                     text-white
//                     shadow-sm
//                     transition
//                     hover:bg-slate-500
//                     hover:shadow-md
//                     disabled:cursor-not-allowed
//                     disabled:opacity-50
//                   "
//                 >
//                   {isProcessing ? (
//                     <>
//                       <span
//                         className="
//                           h-3 w-3 animate-spin
//                           rounded-full border-2
//                           border-white/30
//                           border-t-white

//                         "
//                       />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <LuCheck size={13} />
//                       Apply Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoverImageSelector;

import { useRef, useState } from "react";
import Cropper from "react-easy-crop";

import {
  LuTrash2,
  LuUpload,
  LuRefreshCcw,
  LuCrop,
  LuImage,
  LuX,
  LuCheck,
  LuRotateCcw,
  LuRotateCw,
  LuFlipHorizontal2,
  LuFlipVertical2,
  LuMaximize2,
  LuUndo2,
} from "react-icons/lu";

import getCroppedImg from "../../utils/cropImage";

const ASPECT_RATIOS = [
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
];

const CoverImageSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);

  const [flip, setFlip] = useState({
    horizontal: false,
    vertical: false,
  });

  const [aspect, setAspect] = useState(16 / 9);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [cropImage, setCropImage] = useState(null);

  const [openCropper, setOpenCropper] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const [error, setError] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  // --------------------------------------------------
  // File processing
  // --------------------------------------------------

  const processFile = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");

    const url = URL.createObjectURL(file);

    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    setRotation(0);

    setFlip({
      horizontal: false,
      vertical: false,
    });

    setAspect(16 / 9);

    setCroppedAreaPixels(null);

    setCropImage(url);

    setOpenCropper(true);
  };

  const handleImageChange = (event) => {
    processFile(event.target.files?.[0]);

    /*
     * Allows selecting the same file again.
     */
    event.target.value = "";
  };

  // --------------------------------------------------
  // Crop
  // --------------------------------------------------

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  // --------------------------------------------------
  // Live Cropper Transform
  // --------------------------------------------------

  /*
   * IMPORTANT:
   *
   * react-easy-crop does not use the `flip` prop
   * for the visual editor.
   *
   * Instead, we use its `transform` prop.
   *
   * rotateY(180deg) = horizontal flip
   * rotateX(180deg) = vertical flip
   *
   * This makes the flip visible immediately while
   * editing.
   */
  const cropperTransform = [
    `translate(${crop.x}px, ${crop.y}px)`,
    `rotate(${rotation}deg)`,
    `rotateY(${flip.horizontal ? 180 : 0}deg)`,
    `rotateX(${flip.vertical ? 180 : 0}deg)`,
    `scale(${zoom})`,
  ].join(" ");

  // --------------------------------------------------
  // Apply crop / transformations
  // --------------------------------------------------

  const handleCropImage = async () => {
    if (!cropImage || !croppedAreaPixels) return;

    setIsProcessing(true);

    try {
      const croppedImageUrl = await getCroppedImg(
        cropImage,
        croppedAreaPixels,
        rotation,
        flip,
      );

      const response = await fetch(croppedImageUrl);

      const blob = await response.blob();

      const file = new File([blob], "cover-image.jpeg", {
        type: "image/jpeg",
      });

      /*
       * Update actual form image.
       */
      setImage(file);

      /*
       * Update preview.
       */
      setPreview(croppedImageUrl);

      setPreviewUrl(croppedImageUrl);

      closeCropper();
    } catch (error) {
      console.error("Crop error:", error);

      setError("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --------------------------------------------------
  // Rotation
  // --------------------------------------------------

  const rotateLeft = () => {
    setRotation((current) => current - 90);
  };

  const rotateRight = () => {
    setRotation((current) => current + 90);
  };

  // --------------------------------------------------
  // Flip
  // --------------------------------------------------

  const flipHorizontal = () => {
    setFlip((current) => ({
      ...current,
      horizontal: !current.horizontal,
    }));
  };

  const flipVertical = () => {
    setFlip((current) => ({
      ...current,
      vertical: !current.vertical,
    }));
  };

  // --------------------------------------------------
  // Reset editor
  // --------------------------------------------------

  const resetEditor = () => {
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    setRotation(0);

    setFlip({
      horizontal: false,
      vertical: false,
    });

    setAspect(16 / 9);

    setCroppedAreaPixels(null);
  };

  // --------------------------------------------------
  // Drag & Drop
  // --------------------------------------------------

  const handleDragOver = (e) => {
    e.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    processFile(file);
  };

  // --------------------------------------------------
  // Remove
  // --------------------------------------------------

  const handleRemoveImage = () => {
    setImage(null);

    setPreview(null);

    setPreviewUrl(null);

    setCropImage(null);
  };

  // --------------------------------------------------
  // File chooser
  // --------------------------------------------------

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  // --------------------------------------------------
  // Open cropper for existing image
  // --------------------------------------------------

  const openEditor = () => {
    const currentImage = preview || previewUrl;

    if (!currentImage) return;

    setCropImage(currentImage);

    /*
     * Start editing from a clean state.
     */
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    setRotation(0);

    setFlip({
      horizontal: false,
      vertical: false,
    });

    setAspect(16 / 9);

    setCroppedAreaPixels(null);

    setOpenCropper(true);
  };

  // --------------------------------------------------
  // Close cropper
  // --------------------------------------------------

  const closeCropper = () => {
    setOpenCropper(false);

    setCropImage(null);

    setZoom(1);

    setRotation(0);

    setFlip({
      horizontal: false,
      vertical: false,
    });

    setCrop({
      x: 0,
      y: 0,
    });

    setCroppedAreaPixels(null);
  };

  const currentPreview = preview || previewUrl;

  return (
    <div className="w-full">
      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5">
          <p className="text-xs font-medium text-rose-600">{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-rose-400 transition hover:bg-rose-100 hover:text-rose-600"
          >
            <LuX size={14} />
          </button>
        </div>
      )}

      {/* ==================================================
          HIDDEN INPUT
      ================================================== */}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* ==================================================
          EMPTY STATE
      ================================================== */}

      {!image && !currentPreview ? (
        <div
          onClick={onChooseFile}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            group relative flex min-h-[210px] w-full 
            cursor-pointer flex-col items-center justify-center 
            overflow-hidden rounded-sm border border-dashed 
            px-5 py-8 text-center 
            transition-all duration-200 
            ${
              isDragging
                ? "border-sky-400 bg-sky-50"
                : "border-slate-300 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/40"
            } 
          `}
        >
          <div
            className="
              flex h-12 w-12 items-center justify-center 
              rounded-sm bg-white text-slate-500 shadow-sm 
              ring-1 ring-slate-200 
              transition-all duration-200 
              group-hover:bg-sky-50 
              group-hover:text-sky-600 
              group-hover:ring-sky-200 
            "
          >
            {isDragging ? <LuUpload size={20} /> : <LuImage size={20} />}
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            {isDragging ? "Drop your image here" : "Upload cover image"}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Drag & drop or click to browse
          </p>

          <span
            className="
              mt-4 inline-flex items-center gap-2 
              rounded-lg 
              bg-black px-3.5 py-2 
              text-xs font-semibold text-white 
              shadow-sm 
              transition-all duration-200 
              group-hover:white 
              group-hover:shadow-md 
              group-hover:-translate-y-0.5 
            "
          >
            <LuUpload size={13} />
            Choose Image
          </span>

          <p className="mt-3 text-[10px] text-slate-400">
            JPG · PNG · WEBP · Max 5MB
          </p>
        </div>
      ) : (
        /* ==================================================
           IMAGE PREVIEW
        ================================================== */

        <div className="group relative overflow-hidden rounded-sm border border-slate-200 bg-slate-100 shadow-sm">
          <img
            src={currentPreview}
            alt="Cover"
            className="
    block
    h-auto
    max-h-[420px]
    w-full
    object-contain
    transition-transform
    duration-500
    group-hover:scale-[1.015]
  "
          />

          {/* Overlay */}

          <div
            className="
              pointer-events-none absolute inset-0 
              bg-gradient-to-t 
              from-slate-950/70 
              via-slate-950/10 
              to-transparent 
              opacity-0 
              transition-opacity duration-200 
              group-hover:opacity-100 
            "
          />

          {/* Ratio badge */}

          <div
            className="
              absolute left-3 top-3 
              rounded-lg border border-white/20 
              bg-black/45 px-2.5 py-1 
              text-[10px] font-medium text-white 
              backdrop-blur-md 
            "
          >
            Cover Image
          </div>

          {/* Actions */}

          <div
            className="
              absolute bottom-3 left-3 right-3 
              flex flex-wrap items-center justify-between 
              gap-2 
              opacity-0 
              transition-opacity duration-200 
              group-hover:opacity-100 
            "
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={openEditor}
                className="
                  inline-flex cursor-pointer items-center gap-1.5 
                  rounded-sm border border-white/20 
                  bg-white/95 px-2.5 py-1.5 
                  text-[10px] font-semibold text-slate-700 
                  shadow-lg backdrop-blur 
                  transition 
                  hover:bg-sky-50 hover:text-sky-600 
                "
              >
                <LuCrop size={12} />
                Edit
              </button>

              <button
                type="button"
                onClick={onChooseFile}
                className="
                  inline-flex cursor-pointer items-center gap-1.5 
                  rounded-lg border border-white/20 
                  bg-white/95 px-2.5 py-1.5 
                  text-[10px] font-semibold text-slate-700 
                  shadow-lg backdrop-blur 
                  transition 
                  hover:bg-sky-50 hover:text-sky-600 
                "
              >
                <LuRefreshCcw size={12} />
                Replace
              </button>
            </div>

            <button
              type="button"
              onClick={handleRemoveImage}
              className="
                inline-flex cursor-pointer items-center gap-1.5 
                rounded-lg bg-rose-500 px-2.5 py-1.5 
                text-[10px] font-semibold text-white 
                shadow-lg transition 
                hover:bg-rose-600 
              "
            >
              <LuTrash2 size={12} />
              Remove
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          IMAGE EDITOR
      ================================================== */}

      {openCropper && (
        <div
          className="
            fixed inset-0 z-[100] 
            flex items-center justify-center 
            bg-slate-950/75 
            p-2 sm:p-4 
            backdrop-blur-sm 
          "
          onClick={closeCropper}
        >
          <div
            className="
              flex w-full max-w-4xl 
              max-h-[96vh] 
              flex-col 
              overflow-hidden 
              rounded-sm 
              border border-white/10 
              bg-white 
              shadow-2xl 
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* ==================================================
                HEADER
            ================================================== */}

            <div
              className="
                flex shrink-0 items-center justify-between 
                border-b border-slate-200 
                px-4 py-3 sm:px-5 
              "
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div
                    className="
                      flex h-8 w-8 shrink-0 
                      items-center justify-center 
                      rounded-lg bg-sky-50 
                      text-sky-600 
                    "
                  >
                    <LuCrop size={15} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Edit Cover Image
                    </h2>

                    <p className="hidden text-[10px] text-slate-400 sm:block">
                      Crop, resize, rotate and adjust your image
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCropper}
                className="
                  flex h-8 w-8 shrink-0 cursor-pointer 
                  items-center justify-center 
                  rounded-lg text-slate-400 
                  transition 
                  hover:bg-slate-100 
                  hover:text-slate-700 
                "
              >
                <LuX size={17} />
              </button>
            </div>

            {/* ==================================================
                EDITOR AREA
            ================================================== */}

            <div
              className="
                min-h-0 flex-1 
                overflow-y-auto 
                bg-slate-50 
              "
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
                {/* ==================================================
                    CANVAS
                ================================================== */}

                <div className="bg-slate-950 p-3 sm:p-5">
                  <div
                    className="
                      relative 
                      mx-auto 
                      aspect-video 
                      w-full 
                      max-h-[55vh] 
                      overflow-hidden 
                      rounded-xl 
                      bg-black 
                      shadow-xl 
                    "
                  >
                    {cropImage && (
                      <Cropper
                        image={cropImage}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspect}
                        /*
                         * IMPORTANT:
                         *
                         * This is what makes the flip
                         * visible immediately.
                         */
                        transform={cropperTransform}
                        showGrid
                        restrictPosition={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                      />
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                    <LuMaximize2 size={12} />

                    <span>
                      Drag image to reposition · Use controls to adjust
                    </span>
                  </div>
                </div>

                {/* ==================================================
                    CONTROLS
                ================================================== */}

                <div className="border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
                  <div className="p-4 sm:p-5">
                    {/* ==================================================
                        ASPECT RATIO
                    ================================================== */}

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-slate-800">
                          Aspect Ratio
                        </label>

                        <span className="text-[10px] text-slate-400">
                          Output shape
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        {ASPECT_RATIOS.map((item) => {
                          const active = aspect === item.value;

                          return (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => setAspect(item.value)}
                              className={`
                                cursor-pointer
                                rounded-lg border px-2 py-2 
                                text-[10px] font-semibold 
                                transition 
                                ${
                                  active
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                                }
                              `}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ==================================================
                        ZOOM
                    ================================================== */}

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-slate-800">
                          Scale
                        </label>

                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                          {zoom.toFixed(1)}×
                        </span>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="4"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="
                          h-1.5 w-full 
                          cursor-pointer 
                          accent-slate-900 
                        "
                      />

                      <div className="mt-1 flex justify-between text-[9px] text-slate-400">
                        <span>Fit</span>
                        <span>4×</span>
                      </div>
                    </div>

                    {/* ==================================================
                        ROTATION
                    ================================================== */}

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-slate-800">
                          Rotation
                        </label>

                        <span className="text-[10px] text-slate-400">
                          {rotation}°
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={rotateLeft}
                          className="
                            flex h-9 flex-1 cursor-pointer 
                            items-center justify-center 
                            gap-1.5 rounded-lg 
                            border border-slate-200 
                            text-[10px] font-semibold 
                            text-slate-600 
                            transition 
                            hover:bg-slate-50 
                            hover:text-slate-900 
                          "
                        >
                          <LuRotateCcw size={14} />
                          Left
                        </button>

                        <button
                          type="button"
                          onClick={rotateRight}
                          className="
                            flex h-9 flex-1 cursor-pointer 
                            items-center justify-center 
                            gap-1.5 rounded-lg 
                            border border-slate-200 
                            text-[10px] font-semibold 
                            text-slate-600 
                            transition 
                            hover:bg-slate-50 
                            hover:text-slate-900 
                          "
                        >
                          <LuRotateCw size={14} />
                          Right
                        </button>
                      </div>
                    </div>

                    {/* ==================================================
                        FLIP
                    ================================================== */}

                    <div className="mt-5">
                      <label className="mb-2 block text-[11px] font-semibold text-slate-800">
                        Flip
                      </label>

                      <div className="flex gap-2">
                        {/* Horizontal */}

                        <button
                          type="button"
                          onClick={flipHorizontal}
                          className={`
                            flex h-9 flex-1 cursor-pointer 
                            items-center justify-center 
                            gap-1.5 rounded-lg border 
                            text-[10px] font-semibold 
                            transition 
                            ${
                              flip.horizontal
                                ? "border-sky-200 bg-sky-50 text-sky-600"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          <LuFlipHorizontal2 size={14} />
                          Horizontal
                        </button>

                        {/* Vertical */}

                        <button
                          type="button"
                          onClick={flipVertical}
                          className={`
                            flex h-9 flex-1 
                            items-center justify-center 
                            gap-1.5 rounded-lg border 
                            text-[10px] font-semibold 
                            cursor-pointer 
                            transition 
                            ${
                              flip.vertical
                                ? "border-sky-200 bg-sky-50 text-sky-600"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            } 
                          `}
                        >
                          <LuFlipVertical2 size={14} />
                          Vertical
                        </button>
                      </div>
                    </div>

                    {/* ==================================================
                        RESET
                    ================================================== */}

                    <button
                      type="button"
                      onClick={resetEditor}
                      className="
                        cursor-pointer 
                        mt-5 inline-flex w-full 
                        items-center justify-center gap-1.5 
                        rounded-lg border border-slate-200 
                        bg-white px-3 py-2 
                        text-[10px] font-semibold 
                        text-slate-500 
                        transition 
                        hover:bg-slate-50 
                        hover:text-slate-800 
                      "
                    >
                      <LuUndo2 size={13} />
                      Reset Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div
              className="
                flex shrink-0 
                flex-col-reverse gap-2 
                border-t border-slate-200 
                bg-white px-4 py-3 
                sm:flex-row sm:items-center 
                sm:justify-between 
                sm:px-5 
              "
            >
              <p className="text-center text-[10px] text-slate-400 sm:text-left">
                Recommended cover ratio: 16:9
              </p>

              <div className="flex items-center justify-end gap-2">
                {/* Cancel */}

                <button
                  type="button"
                  onClick={closeCropper}
                  disabled={isProcessing}
                  className="
                    cursor-pointer 
                    inline-flex items-center gap-1.5 
                    rounded-lg border border-slate-200 
                    bg-white px-3 py-2 
                    text-[10px] font-semibold 
                    text-slate-600 
                    transition 
                    hover:bg-slate-50 
                    disabled:cursor-not-allowed 
                    disabled:opacity-50 
                  "
                >
                  <LuX size={13} />
                  Cancel
                </button>

                {/* Apply */}

                <button
                  type="button"
                  onClick={handleCropImage}
                  disabled={isProcessing}
                  className="
                    inline-flex items-center gap-1.5 
                    rounded-lg bg-slate-900 
                    px-4 py-2 
                    cursor-pointer 
                    text-[10px] font-semibold 
                    text-white 
                    shadow-sm 
                    transition 
                    hover:bg-slate-500 
                    hover:shadow-md 
                    disabled:cursor-not-allowed 
                    disabled:opacity-50 
                  "
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="
                          h-3 w-3 animate-spin 
                          rounded-full border-2 
                          border-white/30 
                          border-t-white 
                        "
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LuCheck size={13} />
                      Apply Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverImageSelector;
