var boxes = [];
function setup() {
    frameRate(2);
    createCanvas(window.innerWidth, innerHeight);
    var box = new Box(0, 0);
    var box1 = new Box(-20, 0);
    var box2 = new Box(-40, 0);
    boxes.push(box);
    boxes.push(box1);
    // boxes.push(box2);
}

function draw() {
    background(255);
    translate(500, 500);
    scale(8);
    boxes.forEach((box) => {
        box.draw();
        // translate(-box.pos.x, -box.pos.y, -box.pos.z);
        // translate(-box.pos.x, -box.pos.y);
        box.rotate();
    })
}

class Box {
    constructor(x, y, z) {
        // this.pos = createVector(x, y, z);
        this.pos = createVector(x, y);
        this.size = 100;
        this.angle = 0;
    }

    // draw() {
    //     // noStroke();
    //     fill('rgba(100,100,100,0.5)');
    //     translate(this.pos.x, this.pos.y, this.pos.z);
    //     sphere(10);
    // }

    draw() {
        // noStroke();
        fill('rgba(100,100,100,0.5)');
        // translate(this.pos.x, this.pos.y);
        circle(this.pos.x, this.pos.y, 10);
    }
    rotate() {
        this.angle += 1-dist(this.pos.x, this.pos.y, 0, 0)/1000;
        rotate(this.angle);
        console.log(this.angle);
    }
}