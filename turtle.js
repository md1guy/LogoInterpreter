const util = require('util');

let Parser = require('./parser')

class Turtle {
    constructor(x = 0, y = 0, dir = 0) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.penDown = true;
        this.commands = [];
    }

    go(code) {
        this.commands = Parser.parse(code);
        console.log(util.inspect(this.commands, false, null, true));
    }

    execute(commands) {

    }
}

module.exports = Turtle;