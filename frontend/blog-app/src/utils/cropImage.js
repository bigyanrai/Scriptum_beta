// export const createImage = (url) =>
//   new Promise((resolve, reject) => {
//     const image = new Image();

//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));

//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export default async function getCroppedImg(imageSrc, crop) {
//   const image = await createImage(imageSrc);

//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   canvas.width = crop.width;
//   canvas.height = crop.height;

//   ctx.drawImage(
//     image,
//     crop.x,
//     crop.y,
//     crop.width,
//     crop.height,
//     0,
//     0,
//     crop.width,
//     crop.height,
//   );

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       if (!blob) return;

//       blob.name = "cover-image.jpeg";

//       resolve(URL.createObjectURL(blob));
//     }, "image/jpeg");
//   });
// }

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));

    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const rotateSize = (width, height, rotation) => {
  const rotRad = (rotation * Math.PI) / 180;

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),

    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export default async function getCroppedImg(
  imageSrc,
  crop,
  rotation = 0,
  flip = {
    horizontal: false,
    vertical: false,
  },
) {
  const image = await createImage(imageSrc);

  const rotRad = (rotation * Math.PI) / 180;

  /*
   * Calculate the bounding box of the rotated image.
   */
  const { width: rotatedWidth, height: rotatedHeight } = rotateSize(
    image.naturalWidth,
    image.naturalHeight,
    rotation,
  );

  /*
   * Canvas containing the rotated/flipped image.
   */
  const rotatedCanvas = document.createElement("canvas");

  rotatedCanvas.width = Math.round(rotatedWidth);
  rotatedCanvas.height = Math.round(rotatedHeight);

  const rotatedCtx = rotatedCanvas.getContext("2d");

  if (!rotatedCtx) {
    throw new Error("Could not create rotated canvas context.");
  }

  /*
   * Move origin to center of canvas.
   */
  rotatedCtx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);

  /*
   * Rotate.
   */
  rotatedCtx.rotate(rotRad);

  /*
   * Flip.
   *
   * Horizontal flip:
   * scaleX(-1)
   *
   * Vertical flip:
   * scaleY(-1)
   */
  rotatedCtx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

  /*
   * Draw image centered.
   */
  rotatedCtx.drawImage(
    image,
    -image.naturalWidth / 2,
    -image.naturalHeight / 2,
    image.naturalWidth,
    image.naturalHeight,
  );

  /*
   * Create final cropped canvas.
   */
  const canvas = document.createElement("canvas");

  canvas.width = Math.round(crop.width);
  canvas.height = Math.round(crop.height);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create crop canvas context.");
  }

  /*
   * Crop from transformed image.
   */
  ctx.drawImage(
    rotatedCanvas,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  /*
   * Convert canvas to JPEG blob.
   */
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image."));
          return;
        }

        const url = URL.createObjectURL(blob);

        resolve(url);
      },
      "image/jpeg",
      0.92,
    );
  });
}
