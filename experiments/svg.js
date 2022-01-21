var svg, circle;
var rad = 1;
//LOADING FILE
function preload() {
    svg = loadSVG('../circle.svg');
}

//MAIN FUNCTION
function setup() {
    createCanvas(600, 200, SVG);
    frameRate(24);

    image(svg, 0, 0, 500, 200);
    circles = querySVG('circle');
    console.log(circles);
}

//INFINITE LOOP
function draw() {
    circles.forEach((c, index) => {
        c.attribute('r', frameCount % 30);
        // c.attribute('r', rad+=1 );
    })
}
{
    x:12,
    y:12,
}