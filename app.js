// const express = require("express");
import express from "express";
// const logger = require("morgan");
import logger from "morgan";
// const cors = require("cors");
import cors from "cors";
// const contactsRouter = require("./routes/api/routes");
import contactsRouter from "./routes/api/routes.js";
import dotenv from "dotenv";
// require("dotenv").config();

const app = express();
dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({
    message: `Address not found. Go to http://localhost/:${PORT}/api/contacts/`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
