class InvalidFields extends Error {
  constructor(fields, message = "Campo(s) invalido(s)", status = 400) {
    super(message);
    this.fields = fields;
    this.status = status;
    this.idError = 1;
  }
}

module.exports = InvalidFields;
