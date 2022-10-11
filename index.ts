import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ name: "Francisco" });
});

app.listen(3000);
