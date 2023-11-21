import * as userServices from "#services/user/index.js";

export const logOut = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userServices.getById(id);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    await userServices.logout({ user });
    return res.status(204).json({
      status: 204,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
