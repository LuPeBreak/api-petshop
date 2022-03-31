const Migration = require("../database/migrations/MigrationProdutos");
const NotFound = require("../errors/NotFound");

module.exports = {
  listar(idFornecedor) {
    return Migration.findAll({
      where: {
        fornecedor: idFornecedor,
      },
      raw: true,
    });
  },
  inserir(dados) {
    return Migration.create(dados);
  },
  remover(id, idFornecedor) {
    return Migration.destroy({
      where: {
        id: id,
        fornecedor: idFornecedor,
      },
    });
  },
  async buscarPorId(id, fornecedor) {
    const produtoEncontrado = await Migration.findOne({
      where: {
        id: id,
        fornecedor: fornecedor,
      },
      raw: true,
    });
    if (!produtoEncontrado) {
      throw new NotFound("Produto nao encontrado");
    }
    return produtoEncontrado;
  },
  async atualizar(dadosDoProduto, dadosParaAtualizar) {
    console.log(dadosParaAtualizar);
    return Migration.update(dadosParaAtualizar, { where: dadosDoProduto });
  },
};
