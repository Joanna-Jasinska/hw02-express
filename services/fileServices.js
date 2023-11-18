import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import FS from "fs";
import { randomUUID } from "crypto";
dotenv.config();
const fs = FS.promises;

const publicDir = path.join(process.cwd(), "public");
const uploadDir = path.join(publicDir, "temp");
const avatarsDir = path.join(publicDir, "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024 * 1024, //~1MB
  },
});

const upload = multer({
  storage: storage,
});
const uploadMiddleware = upload.single("picture");

const deleteFile = async ({ avatarURL }) => {
  const isExternalLink =
    `${avatarURL}`.substring(0, 10).toLocaleLowerCase() != "localhost:";
  if (isExternalLink) return;
  const baseName = path.basename(avatarURL);
  const fileName = path.join(avatarsDir, baseName);
  try {
    await fs.unlink(fileName);
  } catch (err) {
    // file doesnt exist on server or no permission to delete
    console.log("Could not delete old avatar file.", fileName);
  }
  return;
};

const saveFile = async ({ req }) => {
  const { path: temporaryName } = req.file; //temp path + filename
  const ext = path.extname(temporaryName); //only file extension
  const uuid = randomUUID();
  const newName = `${uuid}${ext}`;
  const fileName = path.join(avatarsDir, newName);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  const PORT = process.env.PORT || 3000;
  const url = `localhost:${PORT}/api/avatars/${newName}`;
  return { error: null, url };
};

export default {
  saveFile,
  deleteFile,
  uploadMiddleware,
};
