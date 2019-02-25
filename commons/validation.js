class Validation {
  static domain(domainName, message = false) {
    if (domainName.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g)) {
      return true
    }
    return message
  }

  static notEmpty(value, message = false) {
    if (!Validation.empty(value)) {
      return true
    }
    return message
  }

  static empty(value, message = false) {
    if (_.isString(value)) {
      value = value.trim()
    }
    if (_.isEmpty(value)) {
      return true
    }
    return message
  }

  static machineName(value, message = false) {
    if (value.match(/.[0-9A-Za-z\-]/g)) {
      return true
    }
    return message
  }
}

module.exports = Validation
