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
    //curve stroke
    strokeWeight(10);
    stroke('blue');
    point(50, 50);
    //right
    point(70, 120);

    point(70, 200);
    point(45, 125);


    noFill();
    stroke('black');
    strokeWeight(1);
    // bezier(50, 50, 100, 100, 200, 50, 100,0,);

    beginShape();
    //start
    curveVertex(50, 50);
    curveVertex(50, 50);
    //right
    curveVertex(70, 120);
    //bottom
    curveVertex(70, 200);
    //left
    curveVertex(45, 125);
    endShape(CLOSE);

    const a = createVector(50, 50);
    const b = createVector(70, 200);
    // drawLeaf(a, b, 'blue');
    //Move start point to middle of screen
    translate(width / 2, height);

    //Draw Root
    stroke(tree.gender_color);
    // stroke(data.gender_color);
    const begin = createVector(0, 0);
    const end = createVector(0, -110);

    //Tree params
    const strokeW = 1;
    const circleSize = 10;
    const angle = 1;

    //Draw line and circle root
    line(begin.x, begin.y, end.x, end.y);
    strokeWeight(strokeW);
    // noStroke();
    // circle(end.x, end.y, circleSize);

    //children
    // buildTree(tree.children, begin, end, strokeW, circleSize, angle);
    buildTree(data.children, begin, end, strokeW, circleSize, angle);
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
        //Weighted, M->L, W->R
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
        // newEnd.rotate(i * -PI / angle);

        //Draw Line
        // line(begin.x, begin.y, newEnd.x, newEnd.y);
        //Draw curve
        // bezier(begin.x, begin.y, begin.x - 30, begin.y, newEnd.x - 30, newEnd.y, newEnd.x, newEnd.y);


        //Recurse
        // buildTree(children[i].children, begin, newEnd, strokeW - 0.5, circleSize - 1.3, angle + 20);
        childrenNum = buildTree(children[i].children, begin, newEnd, strokeW, circleSize - 0.6, angle);
        // strokeWeight(childrenNum * 10);
        strokeWeight(1);

        //Draw Line
        // console.log(children[i].gender_color)
        stroke(children[i].gender_color);
        line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Try leaf
        drawLeaf(begin, newEnd, children[i].gender_color);
        // const newLeaf = new Leaf(begin, newEnd, 'red', -PI / 2 + (i + 1) * fraction);
        // newLeaf.draw();

        //Draw shape
        // drawLeaf(begin, newEnd, children[i].gender_color);
        // console.log(newEnd.x)

        //Draw Circle
        // noStroke();
        // circle(newEnd.x, newEnd.y, circleSize);

        translate(-end.x, -end.y);
        totalChilrenNum += childrenNum;
    }

    return totalChilrenNum;

}

// class Leaf {
//     constructor(begin, end, color, angle) {
//         this.begin = begin;
//         this.end = end;
//         this.color = color;
//         this.angle = angle;
//     }

//     draw() {
//         ellipseMode(CENTER);
//         const midP = createVector((this.begin.x + this.end.x) / 2, (this.begin.y + this.end.y) / 2);
//         // translate();
//         rotate();
//         ellipse(midP.x, midP.y, 20, 60);
//         rotate();
//         // translate(-midP.x,-midP.y);
//     }
// }

function drawLeaf(begin, end, color) {
    // console.log(end.x.toFixed(2));
    let slope = 0;
    if (begin.x.toFixed(2) ===end.x.toFixed(2)) {
        slope = 0;
    } else {
        slope = (end.y - begin.y) / (end.x - begin.x);
        // console.log(slope);
    }
    const newSlope = -slope;
    const midPoint = createVector((begin.x + end.x) / 2, (begin.y + end.y) / 2);
    const intercept = midPoint.y - newSlope * midPoint.x;
    const leafWeight = 5;
    //right
    const x1 = midPoint.x + leafWeight;
    const y1 = newSlope * x1 + intercept;
    //left
    const x2 = midPoint.x - leafWeight;
    const y2 = newSlope * x2 + intercept;
    noStroke();
    // console.log(color)
    fill(color);
    strokeWeight(1);
    // bezier(50, 50, 100, 100, 200, 50, 100,0,);
    beginShape();
    //start
    curveVertex(begin.x, begin.y);
    curveVertex(begin.x, begin.y);
    //right
    curveVertex(x1, y1);
    //bottom
    curveVertex(end.x, end.y);
    //left
    curveVertex(x2, y2);
    endShape(CLOSE);
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

//Branch
// function buildBranch(begin, end, color, index, branchNum) {
//     const newEnd = createVector(end.x, end.y);
//     const fraction = PI / (branchNum + 1);
//     stroke(color);
//     newEnd.rotate(-PI / 2 + index * fraction);
//     line(begin.x, begin.y, newEnd.x, newEnd.y);
// }