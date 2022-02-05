var data;
//Tree is test data
var tree;

function preload() {
    data = loadJSON('./datasets/psych_id783121.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(500,500);
    console.log(data);

}

function draw() {
    //Black background
    // background(0);

    //White background
    background(255);

    //Move start point to middle of screen
    translate(width / 2, height);

    //Draw Root
    // stroke(tree.gender_color);
    stroke(data.gender_color);
    const begin = createVector(0, 0);
    const end = createVector(0, -100);

    //Tree params
    const strokeW = 10;
    const circleSize = 10;
    const angle = 1;

    //children
    // buildTree(tree.children, begin, end, strokeW, circleSize, angle);
    // const childrenNum = buildTree(tree.children, begin, end, strokeW, circleSize, angle);
    const childrenNum = buildTree(data.children, begin, end, strokeW, circleSize, angle);
    // buildTree(data.children, begin, end, strokeW, circleSize, angle);
    // console.log(childrenNum);

    //Draw line and circle root
    // stroke(tree.gender_color)
    stroke(data.gender_color)
    // line(begin.x, begin.y, end.x, end.y);

    //Draw Leaf
    // drawLeaf(begin, end, tree.gender_color, childrenNum);
    drawLeaf(begin, end, data.gender_color, childrenNum);
    // drawLeaf(begin, end, data.gender_color, strokeW);

    // noStroke();
    // circle(end.x, end.y, circleSize);
}

function buildTree(children, begin, end, strokeW, circleSize, angle) {

    const branchNum = children?.length;
    if (branchNum === 0 || children == null) {
        return 1;
        // return;
    }

    totalChilrenNum = 0;
    //Recurse on all the nodes
    for (let i = 0; i < branchNum; i++) {
        //Move current end point as the start point
        translate(end.x, end.y);
        // Build branch
        const newEnd = createVector(end.x, end.y);
        const fraction = PI / (branchNum + 1);


        // strokeWeight(strokeW);
        // Weighted, M->L, W->R
        // if (children[i].gender === 'man') {
        //     newEnd.rotate((i + 1) * -PI / 60);
        // } else if (children[i].gender === 'woman') {
        //     newEnd.rotate((i + 1) * PI / 30);
        //     //Weighted
        //     // newEnd.rotate((i + 1) * PI / angle + 0.4);
        // }

        //Evenly
        newEnd.rotate(-PI / 2 + (i + 1) * fraction);
        // console.log(newEnd);

        //Same Direction
        // newEnd.rotate(i * -PI / angle + 0.3);
        //Weighted
        // newEnd.rotate((i + 1) * -PI / 43);
        // newEnd.rotate((i + 1) * -PI / 23);
        newEnd.rotate((i + 1) * -PI / 60);

        //Recurse
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.5, circleSize - 1.3, angle + 20);
        childrenNum = buildTree(children[i].children, begin, newEnd, strokeW - 0.8, circleSize - 0.6, angle + 0.2);
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.8, circleSize - 0.6, angle + 0.2);

        // strokeWeight(childrenNum * 10);
        // strokeWeight(1);

        //Draw Line
        // console.log(children[i].gender_color)
        stroke(children[i].gender_color);
        line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Draw Leaf
        drawLeaf(begin, newEnd, children[i].gender_color, childrenNum);
        // drawLeaf(begin, newEnd, children[i].gender_color, strokeW);

        //Draw Circle
        // noStroke();
        // circle(newEnd.x, newEnd.y, circleSize);

        translate(-end.x, -end.y);
        totalChilrenNum += childrenNum;
    }

    return totalChilrenNum;

}


// function drawLeaf(begin, end, color, strokeW) {
function drawLeaf(begin, end, color, childrenNum) {
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
        let leafWeight = 1 * childrenNum;
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
        // const leafWeight = strokeW;
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
        let leafWeight = 1 * childrenNum;

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
        // const leafWeight = strokeW;

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
        let leafWeight = 1 * childrenNum;

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
        // const leafWeight = strokeW;
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
    gender: 'man',
    gender_color: 'blue',
    children: [
        {
            gender: 'man',
            gender_color: 'blue',
            children: [
                {
                    gender: 'man',
                    gender_color: 'blue',
                },
                {
                    gender: 'woman',
                    gender_color: 'red',
                },
            ]
        },
        {
            gender: 'woman',
            gender_color: 'red',
        },
        {
            gender: 'woman',
            gender_color: 'red',
        },
    ]
}
