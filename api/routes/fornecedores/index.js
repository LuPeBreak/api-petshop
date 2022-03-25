const app = require("express").Router();
const repository = require("../../repositories/FornecedorRepository");
const Fornecedor = require("../../model/Fornecedores");
const SerializerFornecedor =
  require("../../helpers/Serializer").SerializerFornecedor;

app.get("/", async (_, response) => {
  const fornecedores = await repository.listar();
  const serializer = new SerializerFornecedor(
    response.getHeader("Content-Type")
  );
  response.send(serializer.serialize(fornecedores));
});

app.post("/", async (request, response, next) => {
  try {
    const dadosDoFornecedor = request.body;
    const fornecedor = new Fornecedor(dadosDoFornecedor);
    await fornecedor.criar();
    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type")
    );
    response.status(201).send(serializer.serialize(fornecedor));
  } catch (err) {
    next(err);
  }
});

app.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type"),
      ["email", "dataCriacao", "dataAtualizacao", "versao"]
    );
    response.send(serializer.serialize(fornecedor));
  } catch (err) {
    next(err);
  }
});

app.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const dadosDoFornecedorAtualizados = request.body;

    const fornecedor = new Fornecedor({ id, ...dadosDoFornecedorAtualizados });
    await fornecedor.atualiza({ ...dadosDoFornecedorAtualizados });

    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type")
    );

    response.send(serializer.serialize(fornecedor));
  } catch (err) {
    next(err);
  }
});

app.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const fornecedor = new Fornecedor({ id });
    await fornecedor.deletar();

    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type"),
      ["message", "fornecedor"]
    );

    response.send(
      serializer.serialize({
        message: "fornecedor deletado",
        fornecedor: fornecedor,
      })
    );
  } catch (err) {
    next(err);
  }
});

module.exports = app;
