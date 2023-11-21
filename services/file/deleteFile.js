import path from "path";
import dotenv from "dotenv";
import FS from "fs";
import { randomUUID } from "crypto";
dotenv.config();
const fs = FS.promises;

const publicDir = path.join(process.cwd(), "public");
const avatarsDir = path.join(publicDir, "avatars");


export const deleteFile = async ({ avatarURL }) => {
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