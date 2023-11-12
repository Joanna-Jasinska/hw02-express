import services from "../services/contactServices.js";

const getAll = async (req, res, next) => {
  try {
    const contacts = await services.listContacts();
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
    const { id } = req.params;
    const contact = await services.getById(id);

    if (contact) {
      return res.json({
        status: 200,
        data: contact,
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${id}] Not found.`,
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

    if (services.validateContact(req.body)) {
      const result = await services.addContact(name, email, phone, favorite);
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
    const { id } = req.params;
    const deleted = await services.removeContact(id);

    if (deleted) {
      return res.json({
        status: 200,
        message: "Contact deleted",
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${id}] Not found. Could not delete`,
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
    const { id } = req.params;

    if (services.validateContact(req.body)) {
      const updated = await services.updateContact(id, {
        name,
        email,
        phone,
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
        message: `[${id}] Not found. Could not update`,
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
    const { id } = req.params;

    if (services.validateFavorite({ favorite })) {
      const updated = await services.updateStatusContact(id, {
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
        message: `[${id}] Not found. Could not update`,
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
