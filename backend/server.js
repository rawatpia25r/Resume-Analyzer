const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resume", require("./routes/resume"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/analyze", require("./routes/analyze"));
app.use("/api/generate", require("./routes/generate"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
