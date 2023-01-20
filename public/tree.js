
// Global variables
var data;

var sliderA;
var sliderB;
var degreeA;
var degreeB;
var DEGREE_MAX = 340
var DEGREEA_MAX = DEGREE_MAX;
var DEGREEB_MAX = DEGREE_MAX;

var sliderAnimeRangeMax;
var sliderAnimeRangeMin;
var sliderAnimeSpeed;
var ANIMATIONRANGE_MAX = 100;// End curl
var ANIMATIONRANGE_MIN = 20;// Start curl
var ANIMATIONSPEED = 1; // the bigger the quicker
var degreeAnimation = ANIMATIONRANGE_MIN;
let bounce = true;

var btnAnimation;
var isAnimation = false; // make this false if you want to use slider

// Color(Hue) ranges between 0 to 360, 
var colorMap = new Map();// researchArea:string => color:number

// coefficient increase => male and female curl smaller
// COEFFICIENT must bigger than DEGREEB_MAX and DEGREEA_MAX
var COEFFICIENT = 360;

var LEAFWIDTH = 100;//the bigger the thcker
var CIRCLESIZE = 4;// the bigger the bigger dots

function preload() {
    // data = loadJSON("./tree-candidate-new/Brad A Myers.json");//40(coefficient);
    // data = loadJSON("./tree-candidate-new/Charles Sanders Peirce.json");//80
    // data = loadJSON("./tree-candidate-new/CHRISTIAN GOTTFRIED DANIEL NEES VON ESENBECK (most curly).json");//40;
    // data = loadJSON("./tree-candidate-new/DONALD REIFF (most female-tilted).json");//40
    // data = loadJSON("./tree-candidate-new/Donna Haraway.json");//40
    // data = loadJSON("./tree-candidate-new/FRANCIS GALTON (Widest and Tallest).json");//60
    // data = loadJSON("./tree-candidate-new/Hiroshi Ishii.json");//60
    // data = loadJSON("./tree-candidate-new/Jane Goodall.json");//60
    data = loadJSON("./tree-candidate-new/Jennifer A Doudna.json");//60
    // data = loadJSON("./tree-candidate-new/JOHANN MULLER (most male-tilted).json");//40
    // data = loadJSON("./tree-candidate-new/Ludwig Boltzmann.json");//110
    // data = loadJSON("./tree-candidate-new/Niels Bohr.json");//140
    // data = loadJSON("./tree-candidate-new/Richard P Feynman.json");//80
    // data = loadJSON("./tree-candidate-new/ROBERT HARE.json");//80
    // data = loadJSON("./tree-candidate-new/Stephen Hawking.json");//60
    // data = loadJSON("./tree-candidate-new/William James.json");//60
    // data = loadJSON("./tree-candidate-new/WILLIAM SPENCER HUTCHINSON.json");//60
}


function setup() {

    createCanvas(window.innerWidth, window.innerHeight, SVG);

    assignColor();

    sliderA = createSlider(0, DEGREEA_MAX, 1);
    sliderA.position(20, 20);
    sliderA.style('width', '150px');

    sliderB = createSlider(0, DEGREEB_MAX, 1);
    sliderB.position(20, 70);
    sliderB.style('width', '150px');

    sliderAnimeRangeMax = createSlider(100, 300, 1);
    sliderAnimeRangeMax.position(20, 120);
    sliderAnimeRangeMax.style('width', '150px');

    sliderAnimeRangeMin = createSlider(20, 50, 1);
    sliderAnimeRangeMin.position(20, 170);
    sliderAnimeRangeMin.style('width', '150px');

    sliderAnimeSpeed = createSlider(1, 10, 1);
    sliderAnimeSpeed.position(20, 220);
    sliderAnimeSpeed.style('width', '150px');

    btnAnimation = createButton("Click")
    btnAnimation.position(25, 270);
    btnAnimation.mousePressed(useAnimation);
}

function draw() {

    background(0);

    degreeA = sliderA.value();
    degreeB = sliderB.value();

    ANIMATIONRANGE_MAX = sliderAnimeRangeMax.value();// End curl
    ANIMATIONRANGE_MIN = sliderAnimeRangeMin.value();// Start curl
    ANIMATIONSPEED = sliderAnimeSpeed.value(); // the bggier the quicker
    fill(180, 0, 100);
    textSize(15);
    text("Male Weight (0 ~ 340)", 200, 36)
    text("Female Weight (0 ~ 340)", 200, 86)
    text("Animation Range Start (100 ~ 300)", 200, 136)
    text("Animation Range End (20 ~ 50)", 200, 186)
    text("Animation Speed (1 ~ 10)", 200, 236)
    text("Use Animation", 100, 286)

    //animation
    if (bounce) {
        degreeAnimation = degreeAnimation + ANIMATIONSPEED;
    } else {
        degreeAnimation = degreeAnimation - ANIMATIONSPEED;
    }

    if (degreeAnimation >= ANIMATIONRANGE_MAX) {
        bounce = false;
    } else if (degreeAnimation < ANIMATIONRANGE_MIN) {
        bounce = true;
    }

    // Starting point
    translate(width / 2, height);

    // Root trunk
    const begin = createVector(0, 0);
    const end = createVector(0, -100);

    buildTree(data.children, begin, end);

    let color = data.gender_color;
    drawLeaf(begin, end, color, LEAFWIDTH * data.weight);
    circle(end.x, end.y, CIRCLESIZE);

    //legend
    let legendX = 200;
    let legendY = -60;
    let lgCounter = 1;
    for (const [key, value] of colorMap) {
        if (lgCounter === 1) {
            legendX += 140;
            drawLegend(key, value, legendX, legendY);
            lgCounter++
        } else if (lgCounter === 2) {
            legendX += 140;
            drawLegend(key, value, legendX, legendY);
            lgCounter++
        } else if (lgCounter === 3) {
            legendX += 140;
            drawLegend(key, value, legendX, legendY);
            lgCounter = 1;
            legendX -= 420;
            legendY -= 20;
        }
    }

    // Uncomment below code if you want export svg
    // save("tree.svg"); // give file name
    // print("saved svg");
    // noLoop(); // export oncDonna Harawaye
}
function useAnimation() {
    isAnimation = !isAnimation;
}
/**
 * Assign color to researchAreas
 * researchArea:string => color:number
 * @returns 
 */
function assignColor() {
    const gap = 340 / data.allResearchAreas.length;
    let j = 0
    for (let i = 1; i <= 340; i += gap) {
        colorMap.set(data.allResearchAreas[j], i);
        j++;
    }

    return;
}

/**
 * Draw legend
 * @param {*} researchArea:set
 * @param {*} color:number
 * @param {*} x:number
 * @param {*} y:number
 */
function drawLegend(researchArea, color, legendX, legendY) {
    colorMode(HSB);
    fill(color, 100, 100);
    rect(legendX, legendY, 10, 10);
    fill(180, 0, 100);
    textSize(10);
    text(researchArea, legendX + 20, legendY + 7);
}

/**
 * Build Tree
 * recursive function
 * @param {*} children:array 
 * @param {*} begin:vector
 * @param {*} end:vector
 * @returns 
 */
function buildTree(children, begin, end) {

    const branchNum = children?.length;

    if (branchNum === 0 || children == null) {
        return;
    }

    let maleNum = 0;
    let womanNum = 0;
    for (let i = 0; i < branchNum; i++) {

        translate(end.x, end.y);

        const newEnd = createVector(end.x, end.y);

        if (children[i].gender === 'woman') {
            if (isAnimation) {
                // newEnd.rotate((womanNum + 1) * PI / (ANIMATIONRANGE_MAX - degreeAnimation + 10));
                newEnd.rotate((womanNum + 1) * PI / (degreeAnimation));
            } else {
                newEnd.rotate((womanNum + 1) * PI / (COEFFICIENT - degreeB));
            }
            womanNum++;

        } else if (children[i].gender === 'man') {
            if (isAnimation) {
                newEnd.rotate((maleNum + 1) * -PI / (degreeAnimation));
            } else {
                newEnd.rotate((maleNum + 1) * -PI / (COEFFICIENT - degreeA));
            }
            maleNum++;
        } else if (children[i].gender === 'unknown') {
            //do nothing
        }

        buildTree(children[i].children, begin, newEnd);

        const color = children[i].gender_color;

        //Draw Leaf
        drawLeaf(begin, newEnd, color, LEAFWIDTH * children[i].weight);

        //Draw dot
        for (let area of children[i].researcharea) {
            colorMode(HSB);
            fill(colorMap.get(area), 100, 100);
            circle(newEnd.x, newEnd.y, CIRCLESIZE);
        }

        translate(-end.x, -end.y);
    }
}


/**
 * Draw leaf
 * @param {*} begin:vector 
 * @param {*} end:vector 
 * @param {*} color:number 
 * @param {*} leafWidth:float
 */
function drawLeaf(begin, end, color, leafWidth) {
    let slope = 0;

    if (Math.abs(begin.x.toFixed(2)) === Math.abs(end.x.toFixed(2)) || Math.abs(((end.x - begin.x) / (end.y - begin.y)).toFixed(2)) === 0) {
        // parallel to Y axis
        /**
         *   b
         * 1   2
         *   e
         */
        slope = 0;

        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        const x1 = midPoint.x + leafWidth;
        const y1 = midPoint.y;
        //2
        const x2 = midPoint.x - leafWidth;
        const y2 = midPoint.y;
        noStroke();
        fill(color);

        beginShape();
        curveVertex(begin.x, begin.y);//begin
        curveVertex(begin.x, begin.y);//begin
        curveVertex(x1, y1);//1
        curveVertex(end.x, end.y);//end
        curveVertex(x2, y2);//2
        endShape(CLOSE);

    } else if (Math.abs(((end.y - begin.y) / (end.x - begin.x)).toFixed(2)) === 0) {
        //parallel to X  axis
        /**
         *   1 
         * b   e
         *   2 
         */
        //1
        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        const x1 = midPoint.x;
        const y1 = midPoint.y + leafWidth;
        //2
        const x2 = midPoint.x;
        const y2 = midPoint.y - leafWidth;
        noStroke();
        fill(color);

        beginShape();
        curveVertex(begin.x, begin.y);//begin
        curveVertex(begin.x, begin.y);//begin
        curveVertex(x1, y1);//1
        curveVertex(end.x, end.y);//end
        curveVertex(x2, y2);//2
        endShape(CLOSE);

    } else {
        //normal case
        /**
         * a
         * 1  2
         *    b
         */
        slope = ((end.y - begin.y) / (end.x - begin.x)).toFixed(2);

        const newSlope = -1 / slope;
        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        //1
        const x1 = midPoint.x + leafWidth * Math.sqrt(1 / (1 + newSlope * newSlope));
        const y1 = midPoint.y + newSlope * leafWidth * Math.sqrt(1 / (1 + newSlope * newSlope));
        //2
        const x2 = midPoint.x - leafWidth * Math.sqrt(1 / (1 + newSlope * newSlope));
        const y2 = midPoint.y - newSlope * leafWidth * Math.sqrt(1 / (1 + newSlope * newSlope));
        noStroke();
        fill(color);

        beginShape();
        curveVertex(begin.x, begin.y);//begin
        curveVertex(begin.x, begin.y);//begin
        curveVertex(x1, y1);//2
        curveVertex(end.x, end.y);//end
        curveVertex(x2, y2);//1
        endShape(CLOSE);
    }

}
