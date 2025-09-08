const express = require("express");
const serverless = require("serverless-http");
const { PrismaClient } = require("@prisma/client");
const app = express();
const cors = require("cors");
const Pusher = require("pusher");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});
app.post("/insert", async (req, res) => {


  try {
    const {
        fullName,
        storexNumber,
        // mobileNumber,
        emailAddress,
        brand_Newsletter,
        ulp_Newsletter,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        storexNumber,
        fullName,
        mobileNumber,
        emailAddress,
        brand_Newsletter,
        ulp_Newsletter,
      }
    });

    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
exports.handler = serverless(app);
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
