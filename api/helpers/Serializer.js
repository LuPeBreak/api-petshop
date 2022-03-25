const UnsuportedValue = require("../errors/UnsupportedValue");

class Serializer {
  constructor(contentType) {
    this.contentType = contentType;
  }
  json(data) {
    // return JSON.stringify(this.filter(data));
    return this.filter(data);
  }
  serialize(data) {
    if (this.contentType === "application/json") {
      return this.json(data);
    }

    throw new UnsuportedValue(this.contentType);
  }

  filterPublicData(data) {
    const newObject = {};

    this.publicFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        newObject[field] = data[field];
      }
    });

    return newObject;
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map((singleObject) => this.filterPublicData(singleObject));
    } else {
      data = this.filterPublicData(data);
    }
    return data;
  }
}

class SerializerFornecedor extends Serializer {
  constructor(contentType, extraFields) {
    super(contentType);
    this.publicFields = ["id", "empresa", "categoria"].concat(
      extraFields || []
    );
  }
}

class SerializeError extends Serializer {
  constructor(contentType, extraFields) {
    super(contentType);
    this.publicFields = ["idError", "message", "fields"].concat(extraFields || []);
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerFornecedor: SerializerFornecedor,
  SerializeError: SerializeError,
  acceptedContentTypes: ["application/json"],
};