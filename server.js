import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import FS from "fs";
const fs = FS.promises;

dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.DB_URI;
const db = process.env.DB_NAME;
const connection = mongoose.connect(uri, {
  dbName: db,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const publicDir = path.join(process.cwd(), "public");
const uploadDir = path.join(publicDir, "temp");
const avatarsDir = path.join(publicDir, "avatars");
const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};
const createFolderIfNonExistent = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

connection
  .then(() => {
    app.listen(PORT, () => {
      createFolderIfNonExistent(publicDir);
      createFolderIfNonExistent(uploadDir);
      createFolderIfNonExistent(avatarsDir);
      console.log("-------------------------------------------------");
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("-------------------------------------------------");
    console.log(`Server not running: ${err.message}`);
    process.exit(1);
  });
