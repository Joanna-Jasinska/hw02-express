import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";

dotenv.config();

const createToken = (payload) => {
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default {
  createToken,
  auth,
};
