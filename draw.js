var svg, circle;
var rad = 1;
var data;
var nodes = [];
//LOADING FILE
function preload() {
    data = loadJSON('./PreprocessedData.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    data = data.data;
    console.log(data);
    for (i = 0; i < data.length; i++) {
        nodes.push(new Node(data[i].x, data[i].y, 50, data[i].color));
    }
    console.log(nodes);
}

function draw() {
    background(255);
    scale(6);
    nodes.forEach((n) => {
        n.draw()
        translate(-n.pos.x, -n.pos.y, -n.pos.z);
    })
}

var angle = 1;

class Node {
    //3D
    constructor(x, y, z, color) {
        this.pos = createVector(x, y, z);
        this.color = color;
    }

    draw() {
        fill(this.color);
        noStroke();
        rotateX(angle += 0.01);
        rotateY(angle += 0.01);
        rotateZ(angle += 0.01);
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(0.3);
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

//MAIN FUNCTION
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

