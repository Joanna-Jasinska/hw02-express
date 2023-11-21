import * as services from "#services/contacts/index.js";

export const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await services.listContacts({ userId });
    return res.json({
      status: 200,
      data: [...contacts],
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
