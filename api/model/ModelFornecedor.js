const repository = require("../repository/FornecedorRepository");
class Fornecedor {
  constructor({
    id,
    empresa,
    email,
    categoria,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async criar() {
    const resultado = await repository.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async carregar() {
    const fornecedorEncontrado = await repository.buscarPorId(this.id);
    this.empresa = fornecedorEncontrado.empresa;
    this.email = fornecedorEncontrado.email;
    this.categoria = fornecedorEncontrado.categoria;
    this.dataCriacao = fornecedorEncontrado.dataCriacao;
    this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao;
    this.versao = fornecedorEncontrado.versao;
  }

  async atualiza() {
    await repository.buscarPorId(this.id);
    const campos = ["empresa", "email", "categoria"];
    const dadosParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === "string" && valor.length > 0) {
        dadosParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error("nao foram fornecidos dados para atualizar");
    }

    await repository.atualizar(this.id, dadosParaAtualizar);
    await this.carregar();
  }

  async deletar() {
    await this.carregar();
    return await repository.deletar(this.id);
  }
}

module.exports = Fornecedor;
