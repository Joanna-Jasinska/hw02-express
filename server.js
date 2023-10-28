const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const { default: mongoose } = require("mongoose");
require("dotenv").config();
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
