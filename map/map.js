var svg, circle;
var rad = 1;
var data;
var nodes = [];
var button;
var angle = 0;

//Load Data
function preload() {
    data = loadJSON('./PreprocessedData.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    data = data.data;
    console.log(data);
    for (i = 0; i < data.length; i++) {
        nodes.push(new Node(data[i].x, data[i].y, 10, data[i].color));
    }
    console.log(nodes);
    // frameRate(3);
}

function draw() {
    background(255);
    scale(8);
    nodes.forEach((n) => {
        n.draw()
        translate(-n.pos.x, -n.pos.y, -n.pos.z);
        n.rotate();
    })
}

class Node {
    //3D
    constructor(x, y, z, color) {
        this.pos = createVector(x, y, z);
        this.color = color;
        this.angle = 0;
    }

    draw() {
        fill(this.color);
        noStroke();
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(0.2);
    }

    rotate() {
        this.angle += 0.000001;
        rotateX(this.angle);
        rotateY(this.angle);
    }


    //2D plot
    // constructor(x, y, z, color) {
    //     this.pos = createVector(x, y, z);
    //     this.color = color;
    // }

    // draw() {
    //     fill(this.color);
    //     // rotateX(angle += 0.0001);
    //     // rotateY(angle += 0.0001);
    //     circle(this.pos.x, this.pos.y, 10);
    // }
}

//SVG deprecated
// function setup() {
//     createCanvas(window.innerWidth, window.innerHeight, SVG);
//     // frameRate(24);
//     image(svg, 10, 10, 900, 900);
//     circles = querySVG('circle');
//     console.log(circles);
// }

//INFINITE LOOP
// function draw() {
    // translate(10, 10);
    // scale(1, -1);
    // circles.forEach((c, index) => {
    //     // c.attribute('r', frameCount % 30);
    //     // c.attribute('r', rad+=1 );
    // })
// }

