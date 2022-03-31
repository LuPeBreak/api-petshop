const app = require("express").Router();
const repository = require("../../../repositories/ProdutoRepository");
const Produto = require("../../../model/Produtos");

app.get("/", async (req, res) => {
  const idFornecedor = req.fornecedor.id;
  const produtos = await repository.listar(idFornecedor);
  res.send(JSON.stringify(produtos));
});

app.post("/", async (req, res, next) => {
  try {
    const idFornecedor = req.fornecedor.id;
    const dados = req.body;
    const produtoParaCadastrar = Object.assign({}, dados, {
      fornecedor: idFornecedor,
    });
    const produto = new Produto(produtoParaCadastrar);
    await produto.criar();
    res.status(201).send(JSON.stringify(produto));
  } catch (err) {
    next(err);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const idFornecedor = req.fornecedor.id;
  const produto = new Produto({ id, fornecedor: idFornecedor });
  await produto.apagar();
  res.status(204).end();
});

module.exports = app;
