const UnsuportedValue = require("../errors/UnsupportedValue");

class Serializer {
  constructor(contentType) {
    this.contentType = contentType;
  }
  json(dados) {
    return JSON.stringify(dados);
  }
  serialize(dados) {
    if (this.contentType === "application/json") {
      return this.json(dados);
    }

    throw new UnsuportedValue(this.contentType);
  }
}

class SerializerFornecedor extends Serializer {
  constructor(contentType) {
    super(contentType);
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerFornecedor: SerializerFornecedor,
  acceptedContentTypes: ["application/json"],
};
