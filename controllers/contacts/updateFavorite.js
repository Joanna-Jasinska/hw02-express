import * as services from "#services/contacts/index.js";

export const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const contactId = req.params.id;
    const userId = req.user.id;

    if (services.validateFavorite({ favorite })) {
      const updated = await services.updateStatusContact({
        userId,
        contactId,
        favorite,
      });
      if (updated) {
        return res.json({
          status: 200,
          data: updated,
        });
      }
      return res.status(404).json({
        status: 404,
        message: `[${contactId}] Not found. Could not update`,
      });
    }
    return res.status(400).json({
      status: 400,
      message: "missing required field: favorite",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
