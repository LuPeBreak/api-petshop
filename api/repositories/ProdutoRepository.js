const Migration = require("../database/migrations/MigrationProdutos");
const NotFound = require("../errors/NotFound");

module.exports = {
  listar(idFornecedor) {
    return Migration.findAll({
      where: {
        fornecedor: idFornecedor,
      },
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
};
