import { User } from "#models/user.js";
import * as userServices from "#services/user/index.js";

export const verify = async (req, res, next) => {
  try {
    const verificationToken = req.params.verificationToken;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    await userServices.verify({ user });
    return res.status(200).json({
      status: 200,
      message: "Verification successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
