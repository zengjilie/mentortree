// Global variables
var data;
var sliderA;
var sliderB;

// Coefficient bigger -> male and female gap smaller
var coefficient = 60;

// < Loading Data > 
function preload() {

    // data = loadJSON("./tree-candidate-new/Brad A Myers.json");//40;
    // data = loadJSON("./tree-candidate-new/Charles Sanders Peirce.json");//80
    // data = loadJSON("./tree-candidate-new/CHRISTIAN GOTTFRIED DANIEL NEES VON ESENBECK (most curly).json");//40
    // data = loadJSON("./tree-candidate-new/DONALD REIFF (most female-tilted).json");//40
    // data = loadJSON("./tree-candidate-new/Donna Haraway.json");//40
    // data = loadJSON("./tree-candidate-new/FRANCIS GALTON (Widest and Tallest).json");//60
    // data = loadJSON("./tree-candidate-new/Hiroshi Ishii.json");//60
    // data = loadJSON("./tree-candidate-new/Jane Goodall.json");//60
    // data = loadJSON("./tree-candidate-new/Jennifer A Doudna.json");//60

    // data = loadJSON("./tree-candidate-new/JOHANN MULLER (most male-tilted).json");//40
    // data = loadJSON("./tree-candidate-new/Ludwig Boltzmann.json");//110
    // data = loadJSON("./tree-candidate-new/Niels Bohr.json");//140
    // data = loadJSON("./tree-candidate-new/Richard P Feynman.json");//80
    // data = loadJSON("./tree-candidate-new/ROBERT HARE.json");//80
    // data = loadJSON("./tree-candidate-new/Stephen Hawking.json");//60
    // data = loadJSON("./tree-candidate-new/William James.json");
    data = loadJSON("./tree-candidate-new/WILLIAM SPENCER HUTCHINSON.json");

}


// Color Mode: Using HSB over RGB makes it easier to assign research areas colors
// Color(Hue) ranges between 0 to 360, 

//research areas --> (area, color)
var colorMap = new Map();

/**
 * assignColor function 
 */
function assignColor() {
    const gap = 360 / data.allResearchAreas.length;
    let j = 0
    for (let i = 1; i <= 360; i += gap) {
        colorMap.set(data.allResearchAreas[j], i);
        j++;
    }
}

function setup() {
    // createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(window.innerWidth, window.innerHeight, SVG);

    // Assign color to individual research area
    assignColor();

    console.log(colorMap);
    console.log(data.allResearchAreas.length);

    sliderA = createSlider(0, 20, 1);
    sliderA.position(10, 10);
    sliderA.style('width', '150px');

    sliderB = createSlider(0, 20, 1);
    sliderB.position(200, 10);
    sliderB.style('width', '150px');
}



var degreeA = 0;
var degreeB = 0;
function draw() {
    //< Slider Value > 
    degreeA = sliderA.value();
    degreeB = sliderB.value();

    //< Background color >
    background(0); // black
    // background(255);//white

    // < Center the root branch at the middle-bottom of the screen >
    translate(width / 2, height);

    // < Root setup >
    const begin = createVector(0, 0); // root trunk starting point
    const end = createVector(0, -100); // root trunk end point

    // < Tree Params >
    const strokeW = 100;
    // const strokeW = 5000;
    const circleSize = 3;
    const angle = 1;

    // < Build the tree >
    buildTree(data.children, begin, end, strokeW, circleSize, angle);

    //  < Draw root -> color / line / leaf >
    // stroke(data.gender_color) // real
    // line(begin.x, begin.y, end.x, end.y); // draw root

    //Leaf -> children num
    // drawLeaf(begin, end, tree.gender_color, childrenNum);
    // drawLeaf(begin, end, data.gender_color, childrenNum);

    //Leaf -> hierarchy
    // drawLeaf(begin, end, tree.gender_color, strokeW); // test
    let color = data.gender_color;
    drawLeaf(begin, end, color, strokeW * data.weight); //real

    // noStroke();
    circle(end.x, end.y, circleSize);

    //legend
    let lgWidth = 200;
    let lgHeight = - 60;
    let counter = 1;
    for (const [key, value] of colorMap) {
        if (counter === 1) {
            lgWidth += 140;
            drawLegend(key, value, lgWidth, lgHeight);
            counter++
        } else if (counter == 2) {
            lgWidth += 140;
            drawLegend(key, value, lgWidth, lgHeight);
            counter++
        } else if (counter == 3) {
            lgWidth += 140;
            drawLegend(key, value, lgWidth, lgHeight);
            counter = 1;
            lgWidth -= 420;
            lgHeight -= 20;
        }

    }
    // Comment below if you don't want to export svg
    // save("tree.svg"); // give file name
    // print("saved svg");
    // noLoop(); // export once
}

/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @param {*} x 
 * @param {*} y 
 */
function drawLegend(key, value, x, y) {
    colorMode(HSB);
    fill(value, 100, 100);
    rect(x, y, 10, 10);
    fill(180, 255, 100);
    textSize(10);
    text(key, x + 20, y + 7);
}

/**
 * 
 * @param {*} children 
 * @param {*} begin 
 * @param {*} end 
 * @param {*} strokeW 
 * @param {*} circleSize 
 * @param {*} angle 
 * @returns 
 */
function buildTree(children, begin, end, strokeW, circleSize, angle) {

    const branchNum = children?.length;

    if (branchNum === 0 || children == null) {
        // return 1;
        return;
    }

    //Recurse on all the nodes

    let maleNum = 0;
    let womanNum = 0;
    for (let i = 0; i < branchNum; i++) {
        //Move current end point as the start point
        translate(end.x, end.y);
        // Build branch
        const newEnd = createVector(end.x, end.y);
        const fraction = PI / (branchNum + 1);


        // < Tree Tilting Schema>
        //W->R, M->L
        if (children[i].gender === 'woman') {
            newEnd.rotate((womanNum + 1) * PI / (coefficient - degreeA - degreeB));
            womanNum++;

        } else if (children[i].gender === 'man') {
            newEnd.rotate((maleNum + 1) * -PI / (coefficient - degreeA));
            maleNum++;
        }

        //Evenly
        // newEnd.rotate(-PI / 2 + (i + 1) * fraction);
        // console.log(newEnd);

        //Same Direction
        // newEnd.rotate(i * -PI / angle + 0.3);
        // Weighted
        // newEnd.rotate((i + 1) * -PI / 43);
        // newEnd.rotate((i + 1) * -PI / 23);
        // newEnd.rotate((i + 1) * -PI / 60);

        //Recurse
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.5, circleSize - 1.3, angle + 20);
        buildTree(children[i].children, begin, newEnd, strokeW, circleSize, angle + 20);
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.8, circleSize - 0.6, angle + 0.2);

        // strokeWeight(childrenNum * 10);
        // strokeWeight(1);

        //Draw Line
        // console.log(children[i].gender_color)
        const color = children[i].gender_color;
        // stroke(color);
        // line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Draw Leaf
        drawLeaf(begin, newEnd, color, strokeW * children[i].weight);

        //Draw Circle
        // noStroke();
        for (let area of children[i].researcharea) {
            // console.log(colorMap.get(area))
            // let c = color(children[i].researcharea_color);
            // console.log(children[i].researcharea_color);
            // fill();
            colorMode(HSB);
            fill(colorMap.get(area), 100, 100);
            circle(newEnd.x, newEnd.y, circleSize);
        }
        // let c = color(children[i].researcharea_color);
        // console.log(children[i].researcharea_color);
        // fill(children[i].researcharea_color);
        // console.log(children[i]);
        // circle(newEnd.x, newEnd.y, circleSize);

        translate(-end.x, -end.y);
        // totalChilrenNum += childrenNum;
    }

    // return totalChilrenNum;

}


/**
 * 
 * @param {*} begin 
 * @param {*} end 
 * @param {*} color 
 * @param {*} strokeW 
 */
function drawLeaf(begin, end, color, strokeW) {
    // console.log(end);
    let slope = 0;

    if (Math.abs(begin.x.toFixed(2)) === Math.abs(end.x.toFixed(2)) || Math.abs(((end.x - begin.x) / (end.y - begin.y)).toFixed(2)) === 0) {// parallel to Y axis
        /**
         *   b
         * 1   2
         *   e
         */
        slope = 0;
        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        const leafWeight = strokeW;
        const x1 = midPoint.x + leafWeight;
        const y1 = midPoint.y;
        //2
        const x2 = midPoint.x - leafWeight;
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

    } else if (Math.abs(((end.y - begin.y) / (end.x - begin.x)).toFixed(2)) === 0) {//parallel to X  axis
        // console.log("Y");
        /**
         *    1 
         * b     e
         *    2 
         */
        //1
        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        const leafWeight = strokeW;

        const x1 = midPoint.x;
        const y1 = midPoint.y + leafWeight;
        //2
        const x2 = midPoint.x;
        const y2 = midPoint.y - leafWeight;
        noStroke();
        fill(color);

        beginShape();
        curveVertex(begin.x, begin.y);//begin
        curveVertex(begin.x, begin.y);//begin
        curveVertex(x1, y1);//1
        curveVertex(end.x, end.y);//end
        curveVertex(x2, y2);//2
        endShape(CLOSE);

    } else { //normal case
        slope = ((end.y - begin.y) / (end.x - begin.x)).toFixed(2);
        const newSlope = -1 / slope;
        const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);

        const leafWeight = strokeW;
        /**
         * a
         * 1  2
         *    b
         */

        //1
        const x1 = midPoint.x + leafWeight * Math.sqrt(1 / (1 + newSlope * newSlope));
        const y1 = midPoint.y + newSlope * leafWeight * Math.sqrt(1 / (1 + newSlope * newSlope));
        //2
        const x2 = midPoint.x - leafWeight * Math.sqrt(1 / (1 + newSlope * newSlope));
        const y2 = midPoint.y - newSlope * leafWeight * Math.sqrt(1 / (1 + newSlope * newSlope));
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

data = {
    name: "Gege",
    gender: "man",
    gender_color: "blue",
    "researcharea": [
        "1"
    ],
    children: [
        {
            name: "Jiejie",
            gender: "man",
            gender_color: "blue",
            "researcharea": [
                "2"
            ],
            children: [
                {
                    name: "Dama2",
                    gender: "man",
                    gender_color: "blue",
                    weight: 0.09090909090909091,
                    "researcharea": [
                        "2"
                    ],
                },
                {
                    name: "Dama2",
                    gender: "woman",
                    gender_color: "red",
                    weight: 0.09090909090909091,
                    "researcharea": [
                        "2"
                    ],
                },
            ],
            weight: 0.09090909090909091
        },
        {
            name: "Dama2",
            gender: "man",
            gender_color: "blue",
            weight: 0.09090909090909091,
            "researcharea": [
                "2"
            ],
        },
        {
            name: "Dama",
            gender: "woman",
            gender_color: "red",
            weight: 0.09090909090909091,
            "researcharea": [
                "2"
            ],
        },
        {
            name: "Dashu",
            gender: "woman",
            gender_color: "red",
            weight: 0.09090909090909091,
            "researcharea": [
                "2"
            ],
        }
    ],
    weight: 0.09090909090909091,
    allResearchAreas: [
        "1",
        "2",
        "3"
    ]
}