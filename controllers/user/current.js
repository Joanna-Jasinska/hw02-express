import * as contactServices from "#services/contacts/index.js";
import * as userServices from "#services/user/index.js";

export const current = async (req, res, next) => {
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
    const contactsCount = await contactServices.countContacts({ userId: id });
    return res.status(200).json({
      status: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
          contacts: contactsCount,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
