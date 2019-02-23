const chalk = require('chalk')

module.exports = class {
  // ASCII font Modular
  static logo() {
    return chalk.green(` 
     __   __  _______  _______  _______  _______ 
    |  | |  ||   _   ||       ||       ||       |
    |  |_|  ||  |_|  ||  _____||    ___||    ___|
    |       ||       || |_____ |   | __ |   |___ 
    |_     _||       ||_____  ||   ||  ||    ___|
      |   |  |   _   | _____| ||   |_| ||   |___ 
      |___|  |__| |__||_______||_______||_______|
`)
  }

  static title(title) {
    return `     === ${chalk.yellow(title)} ===`
  }

  static bye() {
    return chalk.green("Bye!")
  }
}
