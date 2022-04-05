var data;
//Tree is test data
var tree;

function preload() {
    data = loadJSON('./datasets/psych_id783121_new.json');
    // data = loadJSON('./datasets/George_M_Church.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(500,500);
    console.log(data);

}

function draw() {
    //=== Background color -> white/black ===
    // background(0); // black
    background(255);//white

    //=== Center root node starting point at middle of screen ===
    translate(width / 2, height);

    //=== Root setup ->===
    // const begin = createVector(0, 0); // root starting point
    const begin = createVector(0, 0); // root starting point
    const end = createVector(0, -100); // root end point

    //=== Tree Params ===
    const strokeW = 200;
    const circleSize = 10;
    const angle = 1;

    //=== Build the tree from -> sampleData / realData ===
    // buildTree(tree.children, begin, end, strokeW, circleSize, angle); //test
    buildTree(data.children, begin, end, strokeW, circleSize, angle); //real

    //=== Draw root -> color / line / leaf -> sampleData / realData ===
    // stroke(tree.gender_color) // test
    stroke(data.gender_color) // real
    line(begin.x, begin.y, end.x, end.y); // draw root

    //Leaf -> children num
    // drawLeaf(begin, end, tree.gender_color, childrenNum);
    // drawLeaf(begin, end, data.gender_color, childrenNum);

    //Leaf -> hierarchy
    // drawLeaf(begin, end, tree.gender_color, strokeW); // test
    drawLeaf(begin, end, data.gender_color, strokeW * data.weight); //real
    // 
    // noStroke();
    // circle(end.x, end.y, circleSize);
}

function buildTree(children, begin, end, strokeW, circleSize, angle) {

    const branchNum = children?.length;
    if (branchNum === 0 || children == null) {
        // return 1;
        return;
    }

    // totalChilrenNum = 0;

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
            newEnd.rotate((i + 1) * PI / 20);
            // newEnd.rotate((i + 1) * -PI / angle + 0.1);
            newEnd.rotate((i + 1) * PI / angle + 0.2);
        } else if (children[i].gender === 'man') {
            // newEnd.rotate((i + 1) * PI / 30);
            newEnd.rotate((i + 1) * -PI / 60);
            //Weighted
        }

        //Evenly
        // newEnd.rotate(-PI / 2 + (i + 1) * fraction);
        // console.log(newEnd);

        //Same Direction
        // newEnd.rotate(i * -PI / angle + 0.3);
        //Weighted
        // newEnd.rotate((i + 1) * -PI / 43);
        // newEnd.rotate((i + 1) * -PI / 23);
        // newEnd.rotate((i + 1) * -PI / 60);

        //Recurse
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.5, circleSize - 1.3, angle + 20);
        buildTree(children[i].children, begin, newEnd, strokeW, circleSize - 1.3, angle + 20);
        // childrenNum = buildTree(children[i].children, begin, newEnd, strokeW - 0.8, circleSize - 0.6, angle + 0.2);
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.8, circleSize - 0.6, angle + 0.2);

        // strokeWeight(childrenNum * 10);
        // strokeWeight(1);

        //Draw Line
        // console.log(children[i].gender_color)
        stroke(children[i].gender_color);
        line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Draw Leaf
        // drawLeaf(begin, newEnd, children[i].gender_color, childrenNum);
        drawLeaf(begin, newEnd, children[i].gender_color, strokeW * children[i].weight);

        //Draw Circle
        // noStroke();
        // circle(newEnd.x, newEnd.y, circleSize);

        translate(-end.x, -end.y);
        // totalChilrenNum += childrenNum;
    }

    // return totalChilrenNum;

}


function drawLeaf(begin, end, color, strokeW) {
    // function drawLeaf(begin, end, color, childrenNum) {
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
        // const leafWeight = 5;

        //normalization
        // let leafWeight = 0.2 * childrenNum;
        // if (childrenNum > 500) {
        //     leafWeight = 0.1 * childrenNum;
        // } else if (childrenNum > 200) {
        //     leafWeight = 0.2 * childrenNum;
        // } else if (childrenNum > 90) {
        //     leafWeight = 0.5 * childrenNum;
        // } else if (childrenNum > 50) {
        //     leafWeight = 0.7 * childrenNum;
        // } else if (childrenNum > 10) {
        //     leafWegiht = 0.8 * childrenNum;
        // }
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
        // const leafWeight = 5;
        //normalization
        // let leafWeight = 0.2 * childrenNum;

        // if (childrenNum > 500) {
        //     leafWeight = 0.1 * childrenNum;
        // } else if (childrenNum > 200) {
        //     leafWeight = 0.2 * childrenNum;
        // } else if (childrenNum > 90) {
        //     leafWeight = 0.5 * childrenNum;
        // } else if (childrenNum > 50) {
        //     leafWeight = 0.7 * childrenNum;
        // } else if (childrenNum > 10) {
        //     leafWegiht = 0.8 * childrenNum;
        // }
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
        // const leafWeight = 5;
        //normalization
        // let leafWeight = 0.2 * childrenNum;

        // if (childrenNum > 500) {
        //     leafWeight = 0.1 * childrenNum;
        // } else if (childrenNum > 300) {
        //     leafWeight = 0.2 * childrenNum;
        // } else if (childrenNum > 100) {
        //     leafWeight = 0.5 * childrenNum;
        // } else if (childrenNum > 50) {
        //     leafWeight = 0.7 * childrenNum;
        // } else if (childrenNum > 10) {
        //     leafWegiht = 0.8 * childrenNum;
        // }
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


tree = {
    name: "Gege",
    gender: "man",
    gender_color: "blue",
    children: [
        {
            name: "Jiejie",
            gender: "man",
            gender_color: "blue",
            children: [
                {
                    name: "Meimei",
                    gender: "man",
                    gender_color: "blue",
                    weight: 0.09090909090909091
                },
                {
                    name: "Didi",
                    gender: "woman",
                    gender_color: "red",
                    weight: 0.09090909090909091
                }
            ],
            weight: 0.18181818181818182
        },
        {
            name: "Dama",
            gender: "woman",
            gender_color: "red",
            weight: 0.09090909090909091
        },
        {
            name: "Dashu",
            gender: "woman",
            gender_color: "red",
            weight: 0.09090909090909091
        }
    ],
    weight: 0.45454545454545453
}
