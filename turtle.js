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
        Parser.parse(code, this);
        console.log(this.commands);
        
    }

    execute(commands) {

    }
}

module.exports = Turtle;