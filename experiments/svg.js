var svg, circle;

//LOADING FILE
function preload() {
    svg = loadSVG('../circle.svg');
    frameRate(24);
}

//
function setup() {
    createCanvas(600, 200, SVG);
    image(svg, 0, 0, 500, 200);
    circle = querySVG('circle');
    console.log(circle);
}

function draw() {
    circle.forEach((c, index) => {
        c.attribute('r', frameCount % 30);
    })
}
