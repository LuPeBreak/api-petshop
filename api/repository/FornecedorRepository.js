const Migration = require("../database/migrations/MigrationFornecedor");

module.exports = {
  listar() {
    return Migration.findAll();
  },
  inserir(fornecedor) {
    return Migration.create(fornecedor);
  },
  async buscarPorId(id) {
    const encontrado = await Migration.findOne({ where: { id: id } });
    if (!encontrado) {
      throw new Error("fornecedor nao encontrado");
    }
    return encontrado;
  },
};