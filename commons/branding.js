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
    let padding = 0
    if (title.length < 50) {
      padding = Math.round((50 - (title.length + 8)) / 2)
    }
    const paddingString = ' '.repeat(padding)
    return `${paddingString}=== ${chalk.yellow(title)} ===${paddingString}\n`
  }

  static bye() {
    return chalk.green("Bye!")
  }
}
