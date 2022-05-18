
let slider;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(window.innerWidth, window.innerHeight, SVG);

    slider = createSlider(0, TWO_PI, PI / 4);
    slider.position(10, 10);
    slider.style('width', '130px');

    // frameRate(10);
}

var angle = PI / 4;
function draw() {
    background(200);
    angle = slider.value();
    translate(width / 2, height);
    branch(100);
}

function branch(len) {
    // const v1 = createVector(0,0);
    // const v2 = createVector(0,-len);

    line(0, 0, 0, -len);
    translate(0, -len);
    rotate(angle);
    if (len > 4) {
        branch(len * 0.6);
    }
}