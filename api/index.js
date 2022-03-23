const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!!");
});

app.listen(3000, () => console.log(`servidor iniciado na porta ${port}!`));
