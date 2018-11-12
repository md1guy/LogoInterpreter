const util = require('util');
let Parser = require('./parser')

class Turtle {
    constructor(x = 0, y = 0, dir = 0) {
        
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.penDown = true;

        this.commands = {

            'fd': commandArgs => {

                this.move(commandArgs[0]);
            },

            'bk': commandArgs => {

                this.move(-commandArgs[0]);
            },

            'rt': commandArgs => {

                this.dir += +(commandArgs[0]);
            },

            'lt': commandArgs => {

                this.dir -= +(commandArgs[0]);
            },

            'cs': _ => {

                console.error('cs: not yet implemented');
            },

            'pu': _ => {

                this.penDown = false;
            },

            'pd': _ => {

                this.penDown = true;
            },

            'ht': _ => {

                console.error('ht: not yet implemented');
            },

            'st': _ => {

                console.error('st: not yet implemented');
            },

            'home': _ => {
                
                this.commands.setxy([0, 0]);
            },

            'label': _ => {

                console.error('label: not yet implemented');
            },

            'setxy': commandArgs => {

                this.x = +(commandArgs[0]);
                this.y = +(commandArgs[1]);
            },
            
            'repeat': commandArgs => {

                for (let i = 0; i < +(commandArgs[0]); i++) {
                    this.execute(commandArgs[1]);
                }
            }
        };
    }

    go(code) {

        let commandList = Parser.parse(code);
        this.execute(commandList);

        //console.log(util.inspect(commandList, false, null, true));
    }

    execute(commandList) {

        commandList.forEach(command => {

            if (command.name in this.commands) {

                this.commands[command.name](command.args);
            } else {
                
                console.log(`Command ${command.name} not exist.`);
            }
        });
        
    }

    move(distance) {

        console.error('move(): not yet implemented');
    }
}

module.exports = Turtle;