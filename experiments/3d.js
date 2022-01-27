function setup() {
    createCanvas(window.innerWidth, innerHeight, WEBGL);
    frameRate(20);
}
var angle = 1;
function draw() {
    background(255);
    var box = new Box(0, 0, 0);
    box.draw();

    var box = new Box(-10, 0, 0);
    box.draw();

    translate(10, 0, 0);

    var box = new Box(-20, 0, 0);
    box.draw();
}

class Box {
    constructor(x, y, z) {
        this.pos = createVector(x, y, z);
        this.size = 100;
    }
    draw() {
        // rotateX(angle += 0.01);
        noStroke();
        fill('rgba(100,100,100,0.5)');
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(10);
    }
}