const app = require("express").Router();
const repository = require("../../../repositories/ProdutoRepository");
const Produto = require("../../../model/Produtos");
const Serializer = require("../../../helpers/Serializer").SerializerProduto;

app.get("/", async (req, res) => {
  const idFornecedor = req.fornecedor.id;
  const produtos = await repository.listar(idFornecedor);
  const serializer = new Serializer(res.getHeader("Content-Type"));
  res.send(serializer.serialize(produtos));
});

app.get("/:id", async (req, res, next) => {
  try {
    const dados = {
      id: req.params.id,
      fornecedor: req.fornecedor.id,
    };
    const produto = new Produto(dados);
    await produto.carregar();

    const serializer = new Serializer(res.getHeader("Content-Type"), [
      "dataCriacao",
      "dataAtualizacao",
      "fornecedor",
      "versao",
    ]);
    res.send(serializer.serialize(produto));
  } catch (err) {
    next(err);
  }
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
    const serializer = new Serializer(res.getHeader("Content-Type"));
    res.status(201).send(serializer.serialize(produto));
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

app.put("/:id", async (req, res, next) => {
  try {
    const dados = Object.assign({}, req.body, {
      id: req.params.id,
      fornecedor: req.fornecedor.id,
    });

    const produto = new Produto(dados);

    await produto.atualizar();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.post("/:id/diminuir-estoque", async (req, res, next) => {
  try {
    const produto = new Produto({
      id: req.params.id,
      fornecedor: req.fornecedor.id,
    });
    
    const quantidade = req.body.quantidade;
    await produto.diminuirEstoque(quantidade);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = app;
