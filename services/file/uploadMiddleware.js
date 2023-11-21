import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const publicDir = path.join(process.cwd(), "public");
const uploadDir = path.join(publicDir, "temp");

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
export const uploadMiddleware = upload.single("picture");