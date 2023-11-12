import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import dotenv from "dotenv";

// import { userSchema } from "./validators/user.js";

const app = express();
dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({
    message: `Address not found. Go to http://localhost:${PORT}/api/contacts/`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// const validation = userSchema.validate({
//   password: "wrwtwt",
//   email: "abd@efg",
// });
// console.log(validation);

export default app;
