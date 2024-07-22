class ValidatorResult {
  constructor(isValid, result = null) {
    this.isValid = isValid;
    this.result = result
  }

  static NotValid(result) {
    return new ValidatorResult(false, result);
  }

  static Valid() {
    return new ValidatorResult(true);
  }
}

export default ValidatorResult;