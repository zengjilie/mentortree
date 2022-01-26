var svg, circle;
var rad = 1;
//LOADING FILE
function preload() {
    svg = loadSVG('../circle.svg');
}

//MAIN FUNCTION
function setup() {
    createCanvas(window.innerWidth,window.innerHeight, SVG);
    frameRate(24);

    image(svg, 10, 10, 900, 900);
    circles = querySVG('circle');
    console.log(circles);
}

//INFINITE LOOP
function draw() {
    translate(10 ,10);
    scale(1, -1);
    // circles.forEach((c, index) => {
    //     // c.attribute('r', frameCount % 30);
    //     // c.attribute('r', rad+=1 );
    // })
}