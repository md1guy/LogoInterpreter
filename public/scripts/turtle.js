const commands = {

    'fd': (turtle, args) => {

        if (Parser.testCommand('fd', args, 1, ["number"])) {

            turtle.move(args[0]);
        }
    },
    'bk': (turtle, args) => {

        if (Parser.testCommand('bk', args, 1, ["number"])) {

            turtle.move(-args[0]);
        }
    },
    'rt': (turtle, args) => {

        if (Parser.testCommand('rt', args, 1, ["number"])) {

            turtle.turnRight(args[0]);
        }
    },
    'lt': (turtle, args) => {

        if (Parser.testCommand('lt', args, 1, ["number"])) {

            turtle.turnRight(-args[0]);
        }
    },
    'cs': (turtle, args) => {

        if (Parser.testCommand('cs', args, 0)) {

            turtle.clearScreen();
        }
    },
    'pu': (turtle, args) => {

        if (Parser.testCommand('pu', args, 0)) {

            turtle.holdPen();
        }
    },
    'pd': (turtle, args) => {

        if (Parser.testCommand('pd', args, 0)) {

            turtle.releasePen();
        }
    },
    'home': (turtle, args) => {

        if (Parser.testCommand('home', args, 0)) {

            turtle.setPosition(turtle.homeX, turtle.homeY);
        }
    },
    'setxy': (turtle, args) => {

        if (Parser.testCommand('setxy', args, 2, ["number", "number"])) {

            turtle.setPosition(args[0], args[1]);
        }
    },
    'repeat': (turtle, args) => {

        if (Parser.testCommand('repeat', args, 2, ["number", "[object Array]"])) {

            turtle.repeat(args[0], args[1]);
        }
    },
}

class Turtle {

    constructor(x = 0, y = 0, direction = 0) {

        this.x = x;
        this.y = y;
        this.homeX = x;
        this.homeY = y;

        this.direction = direction;
        this.startDirection = direction;

        this.penDown = true;

        this.commands = commands;
    }

    start(code) {

        this.reset();
        let commandList = Parser.parse(code);
        this.execute(commandList);
    }

    execute(commandList) {

        commandList.forEach(command => {

            let name = command.name;
            let args = command.args;
            if (name in this.commands) {

                this.commands[name](this, args);
            } else {

                console.error(`Command ${name} not found.`);
            }
        });
    }

    repeat(iterations, commandList) {

        for (let i = 0; i < iterations; i++) {
            
            this.execute(commandList);
        }
    }

    reset() {

        this.clearScreen();
        this.setPosition(this.homeX, this.homeY);
        this.direction = this.startDirection;
        this.releasePen();
    }

    move(distance) {

        push();

        translate(this.x, this.y);
        rotate(this.direction);

        stroke(255);
        line(0, 0, distance, 0);

        pop();

        this.x += Math.cos(this.direction * Math.PI / 180) * distance;
        this.y += Math.sin(this.direction * Math.PI / 180) * distance;
    }

    turnRight(angle) {

        this.direction += angle;
    }

    clearScreen() {

        background(0);
    }

    holdPen() {

        this.penDown = false;
    }

    releasePen() {

        this.penDown = true;
    }

    setPosition(x, y) {

        this.x = x;
        this.y = y;
    }
}