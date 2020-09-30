const express = require("express");
const app = express();
const connectDB = require("./config/db");

//Connect to Mongo Database
connectDB();

//Initializa Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => res.send("API running"));
app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`));
