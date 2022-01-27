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
        nodes.push(new Node(data[i].x, data[i].y, data[i].color));
    }
    console.log(nodes);
}

function draw() {
    background(255);
    // blendMode(MULTIPLY);
    translate(10, 10, 10);
    scale(8);
    nodes.forEach((c) => {
        c.draw()
    })
}

class Node {
    constructor(x, y, z, color) {
        this.pos = createVector(x, y, z);
        this.color = color;
        this.size = 0.1;
    }

    draw() {
        noStroke();
        fill(this.color);
        // sphere(this.pos.x, this.pos.y, this.size);
        translate(0, 0, 0);
        box(20);
    }
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

