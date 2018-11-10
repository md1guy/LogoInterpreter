let Command = require("./command.js")

class Parser {

    static parse(code) {

        if (typeof(code) !== "string") {
            // TODO: wrong parameter type exception
        }
        
        code = Parser.format(code);

        let tokens = code.split(' ');

        let index = 0;

        let commands = [];

        let digitRegex = /\d+/;

        while(index < tokens.length) {

            let name = tokens[index];
            let args = [];

            while (digitRegex.test(tokens[++index])) {
                args.push(tokens[index]);
            }

            commands.push(new Command(name, args));
        }

        return commands;
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