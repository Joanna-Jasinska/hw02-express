import path from "path";
import FS from "fs";
import dotenv from "dotenv";
import imageServices from "../services/imageServices.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const fs = FS.promises;

const showPublicAvatar = async (req, res) => {
  const { imagePath } = req.params;
  const partialPath = `/avatars/${imagePath}`;
  const fullPath = path.join(path.resolve("./public"), partialPath);

  try {
    await fs.readFile(fullPath);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      message: `Avatar [${imagePath}] not found. Go to http://localhost:${PORT}/api/avatars/example.png`,
      // error: err,
    });
  }
  return res.send(imageServices.avatarImg({ imagePath: partialPath }));
};

export default {
  showPublicAvatar,
};
