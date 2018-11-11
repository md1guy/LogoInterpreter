let Command = require("./command.js")
const util = require('util');

class Parser {
/* 
    static parse(code, turtle) {

        if (typeof(code) !== "string") {
            // TODO: wrong parameter type exception
        }

        code = Parser.format(code).trim();

        let tokens = code.split(' ');

        let index = 0;

        let digitRegex = /\d+/;

        while(index < tokens.length) {

            let name = tokens[index];
            let args = [];

            while (digitRegex.test(tokens[++index])) {
                args.push(tokens[index]);
            }

            if (name === 'repeat') {

 
                let times = args[0];
                let call = `repeat ${times} [`;

                let innerCode = code.slice(code.indexOf(call) + call.length);

                let openedBracketsCount = 1;
                let carriage = -1;

                while (openedBracketsCount > 0) {
                    carriage++;

                    if (innerCode[carriage] === '[') openedBracketsCount++;
                    if (innerCode[carriage] === ']') openedBracketsCount--;
                }

                let leftInnerCode = innerCode.slice(0, carriage);
                let rightInnerCode = innerCode.slice(carriage + 1);

                for (let i = 0; i < times; i++) {

                    Parser.parse(leftInnerCode, turtle);
                }

                if (rightInnerCode.length > 0) Parser.parse(rightInnerCode, turtle);

                return;
            }

            else {
                
                turtle.commands.push(new Command(name, args));
            }
        }
    } */



























    static parse(code) {

        let formattedCode = this.format(code);

        let commands = [];

        let index = 0;

        let digitRegex = /\d+/;

        let res;

        while(index < formattedCode.length) {

            res = this.getNextTokenAndUpdateIndex(formattedCode, index);
            
            let commandName = res.token;
            index = res.index;

            let commandArgs = [];

            while (digitRegex.test(res = this.getNextTokenAndUpdateIndex(formattedCode, index)).token) {
                
                commandArgs.push(res.token);
                index = res.index;
            }

            commands.push(new Command(commandName, commandArgs));
        }

        return commands;
    }

    static getNextTokenAndUpdateIndex(text, index) {

        let token = '';

        while (text.charAt(index) === ' ' && index < text.length) {
            
            index++;
        }

        while (text.charAt(index) !== ' ' && index < text.length) {
            
            token += text.charAt(index);
            index++;
        }

        return {
            'token': token,
            'index': index
        }
    }

    static format(text) {

        let newlineRegex = /\r?\n|\r/g;
        let severalWhitespacesRegex = /\s{2,}/g

        text = text
            .replace(newlineRegex, ' ')
            .replace(severalWhitespacesRegex, ' ')
            .trim();

        return text;
    }
}

module.exports = Parser;