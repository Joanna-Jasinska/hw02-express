import userServices from "../services/userServices.js";

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validation = userServices.validateUser(req.body);
    if (validation.error) {
      return res.status(validation.status).json({
        status: validation.status,
        message: validation.error,
      });
    }
    const newUser = await userServices.register(validation.value);
    return res.json({
      status: 201,
      data: {
        user: {
          subscription: newUser.subscription,
          email: newUser.email,
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

export default {
  signUp,
};
