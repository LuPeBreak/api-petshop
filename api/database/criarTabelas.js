const TabelaFornecedores = require("./migrations/MigrationFornecedor");

TabelaFornecedores.sync()
  .then(() => {
    console.log("tabela criada com sucesso");
  })
  .catch(console.log);
