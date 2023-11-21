import path from "path";
import dotenv from "dotenv";
import FS from "fs";
import { randomUUID } from "crypto";
dotenv.config();
const fs = FS.promises;

const publicDir = path.join(process.cwd(), "public");
const avatarsDir = path.join(publicDir, "avatars");

export const saveFile = async ({ req }) => {
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
