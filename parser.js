let Command = require("./command.js")
const util = require('util');

class Parser {

    static parse(code) {

        let formattedCode = this.format(code);

        let commands = [];

        let index = 0;

        let digitRegex = /\d+/;

        let res;

        while (index < formattedCode.length) {

            res = this.getNextTokenAndUpdateIndex(formattedCode, index);

            let commandName = res.token;
            index = res.index;

            let commandArgs = [];

            while (digitRegex.test((res = this.getNextTokenAndUpdateIndex(formattedCode, index)).token)) {

                commandArgs.push(res.token);
                index = res.index;
            }

            if (commandName === 'repeat') {

                res = this.getRepeatBody(formattedCode, ++index);

                let parsedBody = this.parse(res.body);
                
                commandArgs.push(parsedBody);

                index = res.index;
            }

            commands.push(new Command(commandName, commandArgs));
        }

        return commands;
    }

    static getRepeatBody(code, index) {

        let startingIndex = index;
        let openedBracketsCount = 1;

        while (openedBracketsCount > 0) {

            let char = code.charAt(++index);

            if (char === '[') {
                openedBracketsCount++;
            } else if (char === ']') {
                openedBracketsCount--;
            }
        }

        return {
            'body': code.substring(startingIndex + 1, index),
            'index': index + 1
        }
    }

    static getNextTokenAndUpdateIndex(code, index) {

        let token = '';

        while (code.charAt(index) === ' ' && index < code.length) {

            index++;
        }

        while (code.charAt(index) !== ' ' && index < code.length) {

            token += code.charAt(index);
            index++;
        }

        return {
            'token': token,
            'index': index
        }
    }

    static format(code) {

        let newlineRegex = /\r?\n|\r/g;
        let severalWhitespacesRegex = /\s{2,}/g

        code = code
            .replace(newlineRegex, ' ')
            .replace(severalWhitespacesRegex, ' ')
            .trim();

        return code;
    }
}

module.exports = Parser;