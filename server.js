import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const PORT = process.env.PORT || 3000;
const uri = process.env.DB_URI;
const connection = mongoose.connect(uri, {
  dbName: "db-contact",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("-------------------------------------------------");
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("-------------------------------------------------");
    console.log(`Server not running: ${err.message}`);
    process.exit(1);
  });
