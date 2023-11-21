import path from "path";
import FS from "fs";
import dotenv from "dotenv";
import * as fileServices from "#services/file/index.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const fs = FS.promises;

export const showPublicAvatar = async (req, res) => {
  const { imagePath } = req.params;
  const partialPath = `/avatars/${imagePath}`;
  const fullPath = path.join(path.resolve("./public"), partialPath);

  try {
    await fs.readFile(fullPath);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      message: `Avatar [${imagePath}] not found. Go to http://localhost:${PORT}/api/avatars/example.png`,
    });
  }
  return res.send(fileServices.avatarImg({ imagePath: partialPath }));
};
