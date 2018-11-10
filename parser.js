let Command = require("./command.js")

class Parser {

    parse(code) {
        if (typeof(code) !== "string") {
            // wrong parameter type exception
        }
        
        
    }

    static format(text) {
        let newlineRegex = /\r?\n|\r/g;
        let severalWhitespacesRegex = /\s{2,}/g

        text = text.replace(newlineRegex, ' ');
        text = text.replace(severalWhitespacesRegex, ' ');

        return text;
    }
}

module.exports = Parser;