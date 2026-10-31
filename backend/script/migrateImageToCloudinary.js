import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

import cloudinary from "../config/cloudinary.js";
import BlogPost from "../models/BlogPost.js";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "..", "uploads");

const getFilenameFromUrl = (url) => {
  if (!url) return null;

  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname.split("/").pop());
  } catch {
    return url.split("/").pop();
  }
};

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "scriptum/migrated",
    resource_type: "image",
  });

  return result.secure_url;
};

const migrateImages = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB.");

    if (!fs.existsSync(uploadsDir)) {
      throw new Error(`Uploads folder not found: ${uploadsDir}`);
    }

    const files = fs.readdirSync(uploadsDir);

    console.log(`Found ${files.length} files in uploads folder.`);

    // ---------------------------------------------------------
    // Get all blog post images
    // ---------------------------------------------------------

    const posts = await BlogPost.find({
      coverImageUrl: {
        $exists: true,
        $ne: null,
        $ne: "",
      },
    }).select("_id coverImageUrl");

    // ---------------------------------------------------------
    // Get all user profile images
    // ---------------------------------------------------------

    const users = await User.find({
      profileImageUrl: {
        $exists: true,
        $ne: null,
        $ne: "",
      },
    }).select("_id profileImageUrl");

    console.log(`Found ${posts.length} blog posts with images.`);
    console.log(`Found ${users.length} users with profile images.`);

    // ---------------------------------------------------------
    // Build a unique list of old image filenames
    // ---------------------------------------------------------

    const imageMap = new Map();

    for (const post of posts) {
      const filename = getFilenameFromUrl(post.coverImageUrl);

      if (!filename) continue;

      if (!imageMap.has(filename)) {
        imageMap.set(filename, {
          posts: [],
          users: [],
        });
      }

      imageMap.get(filename).posts.push(post._id);
    }

    for (const user of users) {
      const filename = getFilenameFromUrl(user.profileImageUrl);

      if (!filename) continue;

      if (!imageMap.has(filename)) {
        imageMap.set(filename, {
          posts: [],
          users: [],
        });
      }

      imageMap.get(filename).users.push(user._id);
    }

    console.log(`Found ${imageMap.size} unique referenced images.`);

    // ---------------------------------------------------------
    // Migrate each image
    // ---------------------------------------------------------

    let migrated = 0;
    let skipped = 0;
    let missing = 0;
    let failed = 0;

    for (const [filename, references] of imageMap.entries()) {
      console.log("\n----------------------------------------");
      console.log(`Processing: ${filename}`);

      // If the filename isn't in uploads, we can't migrate it.
      if (!files.includes(filename)) {
        console.log("File not found in uploads folder.");
        missing++;
        continue;
      }

      const filePath = path.join(uploadsDir, filename);

      try {
        // -----------------------------------------------------
        // Upload to Cloudinary
        // -----------------------------------------------------

        console.log("Uploading to Cloudinary...");

        const cloudinaryUrl = await uploadToCloudinary(filePath);

        console.log("Cloudinary URL:");
        console.log(cloudinaryUrl);

        // -----------------------------------------------------
        // Update blog posts
        // -----------------------------------------------------

        if (references.posts.length > 0) {
          await BlogPost.updateMany(
            {
              _id: {
                $in: references.posts,
              },
            },
            {
              $set: {
                coverImageUrl: cloudinaryUrl,
              },
            },
          );

          console.log(`Updated ${references.posts.length} blog post(s).`);
        }

        // -----------------------------------------------------
        // Update users
        // -----------------------------------------------------

        if (references.users.length > 0) {
          await User.updateMany(
            {
              _id: {
                $in: references.users,
              },
            },
            {
              $set: {
                profileImageUrl: cloudinaryUrl,
              },
            },
          );

          console.log(`Updated ${references.users.length} user(s).`);
        }

        migrated++;
      } catch (error) {
        failed++;

        console.error(`Failed to migrate ${filename}:`);
        console.error(error.message);
      }
    }

    // ---------------------------------------------------------
    // Summary
    // ---------------------------------------------------------

    console.log("\n========================================");
    console.log("IMAGE MIGRATION COMPLETE");
    console.log("========================================");

    console.log(`Total files in uploads: ${files.length}`);
    console.log(`Referenced images: ${imageMap.size}`);
    console.log(`Successfully migrated: ${migrated}`);
    console.log(`Missing files: ${missing}`);
    console.log(`Failed uploads: ${failed}`);
    console.log(`Skipped: ${skipped}`);

    console.log("\nMongoDB connection closing...");

    await mongoose.disconnect();

    console.log("Done.");
  } catch (error) {
    console.error("\nMigration failed:");
    console.error(error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

migrateImages();
