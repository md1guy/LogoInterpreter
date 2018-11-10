let Parser = require('./parser')

class Turtle {
    constructor(x = 0, y = 0, dir = 0) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.penDown = true;
    }

    go(code) {
        return Parser.parse(code);
    }
}

module.exports = Turtle;