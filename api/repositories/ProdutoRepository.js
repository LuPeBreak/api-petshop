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
};
