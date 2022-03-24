const app = require("express").Router();
const repository = require("../../repository/FornecedorRepository");
const Fornecedor = require("../../model/ModelFornecedor");

app.get("/", async (req, res) => {
  const fornecedores = await repository.listar();
  res.json(fornecedores);
});

app.post("/", async (request, response) => {
  const dadosDoFornecedor = request.body;
  const fornecedor = new Fornecedor(dadosDoFornecedor);
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
    response.status(400).json({ Message: err.message });
  }
});

app.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const dadosDoFornecedorAtualizados = request.body;

    const fornecedor = new Fornecedor({ id, ...dadosDoFornecedorAtualizados });
    await fornecedor.atualiza({ ...dadosDoFornecedorAtualizados });

    response.json(fornecedor);
  } catch (err) {
    response.status(400).json({ Message: err.message });
  }
});

app.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const fornecedor = new Fornecedor({ id });
    await fornecedor.deletar();

    response.json({
      message: "fornecedor deletado",
      fornecedor: fornecedor,
    });
  } catch (err) {
    response.status(400).json({ Message: err.message });
  }
});

module.exports = app;
