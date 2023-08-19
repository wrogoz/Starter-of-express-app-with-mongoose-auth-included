const express = require("express");
require("dotenv").config();
const app = express();
require("./db/db");
const helmet = require("helmet");
const user = require("./routes/userRoute");
const cors = require("cors");
const corsOption = {
  origin: ["localhost:3000", "https://example-fe-origin-address.com"],
  credentials: true,
  preflightContinue: true,
};

app.use(cors(corsOption));

app.use(helmet());
app.use(express.json());
app.use("/user", user);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
