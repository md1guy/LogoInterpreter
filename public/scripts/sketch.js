let editor;
let turtle;
let button;

function setup() {

    createCanvas(500, 500);
    background(0);
    angleMode(DEGREES);

    turtle = new Turtle();

    editor = select('#editor');
    editor.input(execute);

    execute();
}


function execute() {

    push();
    
    translate(width / 2, height / 2);
    turtle.start(editor.value());
    
    pop();
}

function draw() {


}