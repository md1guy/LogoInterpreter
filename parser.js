let Command = require("./command.js")

class Parser {

    parse(code) {
        if (typeof(code) !== "string") {
            // wrong parameter type exception
        }

        let newlineRegex = /\r?\n|\r/g;
        let severalWhitespacesRegex = /\s{2,}/g

        code = code.replace(newlineRegex, ' ');
        code = code.replace(severalWhitespacesRegex, ' ');

        return code;
    }
}

module.exports = Parser;