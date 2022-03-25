const express = require("express");
const config = require("config");
const acceptedContentTypes =
  require("./helpers/Serializer").acceptedContentTypes;

const app = express();

app.use(express.json());

// middleware para checagem de tipo de conteudo pedido
app.use((request, response, next) => {
  let requestedContentType = request.header("Accept");
  
  if(requestedContentType = '*/*'){
    requestedContentType = 'application/json'
  }

  if (acceptedContentTypes.indexOf(requestedContentType) === -1) {
    response.status(406).end();
    return;
  }

  response.setHeader("Content-Type", requestedContentType);
  next();
});

//rotas
const fornecedores = require("./routes/fornecedores/");
app.use("/api/fornecedores", fornecedores);

// middleware para tratamento de errors
app.use((err, request, response, next) => {
  response
    .status(err.status ? err.status : 500)
    .json({ Message: err.message, fields: err.fields });
});

app.listen(config.get("api.porta"), () =>
  console.log(`servidor iniciado na porta ${config.get("api.porta")}!`)
);
