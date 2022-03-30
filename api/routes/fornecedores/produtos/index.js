const app = require("express").Router({ mergeParams: true });
const repository = require("../../../repositories/ProdutoRepository");

app.get("/", async (req, res) => {
  const idFornecedor = req.params.idFornecedor;
  const produtos = await repository.listar(idFornecedor);
  res.send(JSON.stringify(produtos));
});

module.exports = app;
