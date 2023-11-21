import * as userServices from "#services/user/index.js";
import * as fileServices from "#services/file/index.js";

export const avatarUpdate = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userServices.getById(id);
    if (!user || !req.file) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }

    const { error, url } = await fileServices.saveFile({ req });
    if (error || !url) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    await fileServices.deleteFile({ avatarURL: user.avatarURL }); //deleting old avatar from server
    await userServices.setAvatar({ user, avatarURL: url });

    return res.status(200).json({
      status: 200,
      data: {
        avatarURL: url,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};