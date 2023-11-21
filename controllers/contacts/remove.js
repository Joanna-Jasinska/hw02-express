import * as services from "#services/contacts/index.js";

export const remove = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;
    const deleted = await services.removeContact({ contactId, userId });

    if (deleted) {
      return res.json({
        status: 200,
        message: "Contact deleted",
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${contactId}] Not found. Could not delete`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
