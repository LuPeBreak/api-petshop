const express = require("express");
const config = require("config");

const app = express();

app.use(express.json());

const fornecedores = require("./routes/fornecedores/");
app.use("/api/fornecedores", fornecedores);

app.use((err,request,response,next) => {
  response
    .status(err.status ? err.status : 500)
    .json({ Message: err.message, error: err.error });
});

app.listen(config.get("api.porta"), () =>
  console.log(`servidor iniciado na porta ${config.get("api.porta")}!`)
);
