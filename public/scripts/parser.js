class Parser {

    static parse(code) {

        let formattedCode = this.format(code);

        let digitRegex = /\d+/;

        let res;
        let commandName;
        let commandArgs;
        let commandList = [];
        let index = 0;

        while (index < formattedCode.length) {

            res = this.getNextTokenAndUpdateIndex(formattedCode, index);

            commandName = res.token;
            index = res.index;

            commandArgs = [];

            while (digitRegex.test((res = this.getNextTokenAndUpdateIndex(formattedCode, index)).token)) {

                commandArgs.push(+res.token);
                index = res.index;
            }

            if (commandName === 'repeat') {

                res = this.getRepeatBody(formattedCode, ++index);

                if (res.body === '') {

                    console.error('Repeat must have a parameter and properly closed brackets.');
                    return `Parsing error on index ${++index}: bracket is not closed`;
                } else {

                    let parsedBody = this.parse(res.body);
                    index = res.index;

                    commandArgs.push(parsedBody);
                }
            }

            commandList.push(new Command(commandName, commandArgs));
        }

        return commandList;
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

            if (index >= code.length) {

                return {
                    body: '',
                    index: index - 1,
                };
            }
        }

        return {
            'body': code.substring(startingIndex + 1, index),
            'index': index + 1,
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
            'index': index,
        }
    }

    static format(code) {

        let newlineRegex = /\r?\n|\r/g;
        let severalWhitespacesRegex = /\s{2,}/g;

        code = code
            .replace(newlineRegex, ' ')
            .replace(severalWhitespacesRegex, ' ')
            .trim();

        return code;
    }

    static testCommand(command, args, expectedArgsLength, expectedTypes = []) {

        if (args.length !== expectedTypes.length) {

            console.error(`${command}: expectedTypes.length expected to be ${args.length}, but was ${expectedTypes.length}`);
            return false;
        }

        if (args.length !== expectedArgsLength) {

            console.error(`${command}: Wrong number of arguments, expected: ${expectedArgsLength}, was: ${args.length}`);
            return false;
        }

        args.forEach((element, index) => {

            if (expectedTypes[index] === "[object Array]") {

                let arrType = Object.prototype.toString.call(element);

                if (expectedTypes[index] !== arrType) {

                    console.error(`${command}: Wrong type of argument ${index}, expected: "expectedTypes[index]", was: ${arrType}`);
                    return false;
                }
            } else if (typeof (element) !== expectedTypes[index]) {

                console.error(`${command}: Wrong type of argument ${index}, expected: ${expectedTypes[index]}, was: ${typeof(element)}`);
                return false;
            }
        });

        return true;
    }
}

module.exports = Parser;