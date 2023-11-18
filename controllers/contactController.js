import services from "../services/contactServices.js";

const getAll = async (req, res, next) => {
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

const getById = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;
    const contact = await services.getById({ userId, contactId });

    if (contact) {
      return res.json({
        status: 200,
        data: contact,
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${contactId}] Not found.`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};

const add = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const userId = req.user.id;

    if (services.validateContact(req.body)) {
      const result = await services.addContact({
        name,
        email,
        phone,
        favorite,
        userId,
      });
      return res.json({
        status: 200,
        data: result["_id"],
      });
    }
    return res.status(400).json({
      status: 400,
      message: "Missing required field",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};

const remove = async (req, res, next) => {
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

const update = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const contactId = req.params.id;
    const userId = req.user.id;

    if (services.validateContact(req.body)) {
      const newData = {
        name,
        email,
        phone,
        favorite,
      };
      const updated = await services.updateContact({
        userId,
        contactId,
        newData,
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
      message: "missing required fields",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
const updateFavorite = async (req, res, next) => {
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

export default {
  getAll,
  getById,
  remove,
  add,
  update, //to edit
  updateFavorite, //to edit
};
