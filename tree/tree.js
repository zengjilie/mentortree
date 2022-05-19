// Global variables
var data;
let slider;

// < Loading Data > 
function preload() {
    //First batch
    // data = loadJSON('./datasets/psych_id783121_new.json');

    //Second batch
    // data = loadJSON('./datasets/George_M_Church_new.json');
    // data = loadJSON('./datasets/Francis_Galton_1_new.json');
    // data = loadJSON('./datasets/WILLIAM_JAMES_Tshape_new.json');
    // data = loadJSON('./datasets/HENRY_GARRETT_Sshape_new.json');

    //Thrid batch
    // data = loadJSON("./tree-candidate-new/CharlesSandersPeirce.json");
    // data = loadJSON("./tree-candidate-new/DonnaHaraway.json");
    // data = loadJSON("./tree-candidate-new/JenniferADoudna.json");
    // data = loadJSON("./tree-candidate-new/JaneGoodall.json"); // wierd
    // data =loadJSON("./tree-candidate-new/LudwigBoltzmann.json");
    // data =loadJSON("./tree-candidate-new/NielsBohr.json");
    // data =loadJSON("./tree-candidate-new/RichardPFeynman.json");
    // data =loadJSON("./tree-candidate-new/StephenHawking.json");
    // data = loadJSON("./tree-candidate-new/WilliamJames.json");

    //Special Trees
    // data = loadJSON("./special-new/curly-tree.json");
    // data = loadJSON("./special-new/female-titled-tree.json");
    data = loadJSON("./special-new/male-titled-tree.json");
    // data = loadJSON("./special-new/tallest-tree.json");
    // data = loadJSON("./special-new/widest-tree.json");
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
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(window.innerWidth, window.innerHeight, SVG);

    // Assign color to individual research area
    assignColor();

    console.log(colorMap);
    console.log(data.allResearchAreas.length);

    // slider = createSlider(0,255, 100);
    // slider.position(10, 10);
    // slider.style('width', '80px');

    slider = createSlider(0, 5, 0.02);
    slider.position(10, 10);
    slider.style('width', '130px');

    // frameRate(10);
}



var degree;

function draw() {
    //slider value
    degree = (slider.value() * 0.1).toFixed(1);
    // degree = slider.value();

    // console.log(degree);

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

    // save("tree.svg"); // give file name
    // print("saved svg");
    // noLoop(); // we just want to export once
}

function buildTree(children, begin, end, strokeW, circleSize, angle) {

    const branchNum = children?.length;

    if (branchNum === 0 || children == null) {
        // return 1;
        return;
    }

    //Recurse on all the nodes
    for (let i = 0; i < branchNum; i++) {
        //Move current end point as the start point
        translate(end.x, end.y);
        // Build branch
        const newEnd = createVector(end.x, end.y);
        const fraction = PI / (branchNum + 1);


        // === Rotating Angles ===

        // Weighted, W->L, M->R
        if (children[i].gender === 'woman') {
            // newEnd.rotate((i + 1) * PI / 20);

            // newEnd.rotate((i + 1) * PI / 30 );
            // console.log(degree);
            newEnd.rotate((i + 1) * PI / 30 + degree/2);
            // newEnd.rotate((i + 1) * -PI / angle + 0.1);
            // newEnd.rotate((i + 1) * PI / angle + 0.2);
            // newEnd.rotate((i + 1) * PI / angle + 0.5);
        } else if (children[i].gender === 'man') {
            // newEnd.rotate((i + 1) * PI / 30);
            // newEnd.rotate((i + 1) * -PI / 60);
            // newEnd.rotate((i + 1) * -PI / 80);
            // newEnd.rotate((i + 1) * -PI / 30);
            // console.log(degree);
            newEnd.rotate((i + 1) * -PI / 30 - degree);
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

function drawRec(begin, end, color, strokeW) {

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
            // children: [
            //     {
            //         name: "Meimei",
            //         gender: "man",
            //         gender_color: "blue",
            //         weight: 0.09090909090909091,
            //         "researcharea": [
            //             "3"
            //         ],
            //     },
            //     {
            //         name: "Didi",
            //         gender: "woman",
            //         gender_color: "red",
            //         weight: 0.09090909090909091,
            //         "researcharea": [
            //             "3"
            //         ],
            //     }
            // ],
            weight: 0.18181818181818182
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
    weight: 0.45454545454545453,
    allResearchAreas: [
        "1",
        "2",
        "3"
    ]
}
