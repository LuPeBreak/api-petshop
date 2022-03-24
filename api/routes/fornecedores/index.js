const app = require("express").Router();
const repository = require("../../repository/FornecedorRepository");
const Fornecedor = require("../../model/ModelFornecedor");

app.get("/", async (req, res) => {
  const fornecedores = await repository.listar();
  res.json(fornecedores);
});

app.post("/", async (request, response) => {
  const dados = request.body;
  const fornecedor = new Fornecedor(dados);
  await fornecedor.criar();
  response.json(fornecedor);
});

app.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    response.json(fornecedor);
  } catch (err) {
    response.status(400).json(err.message)
  }
});

module.exports = app;
