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
    background(0);

    //White background
    // background(255);

    //curve stroke
    // stroke('white');
    // noFill();
    // bezier(50, 50, 100, 100, 100, 100, 200, 50);

    //Move start point to middle of screen
    translate(width / 2, height);

    //Draw Root
    // stroke(tree.gender_color);
    stroke(data.gender_color);
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
    circle(end.x, end.y, circleSize);

    //children
    buildTree(tree.children, begin, end, strokeW, circleSize, angle);
    // buildTree(data.children, begin, end, strokeW, circleSize, angle);
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
        const newEnd = createVector(end.x, end.y + 8);
        const fraction = PI / (branchNum + 1);
        stroke(children[i].gender_color);

        // strokeWeight(strokeW);
        //Weighted, M->L, W->R
        if (children[i].gender === 'man') {
            newEnd.rotate((i + 1) * -PI / 60);
        } else if (children[i].gender === 'woman') {
            newEnd.rotate((i + 1) * PI / 30);
            //Weighted
            // newEnd.rotate((i + 1) * PI / angle + 0.4);
        }

        //Evenly
        // newEnd.rotate(-PI / 2 + (i + 1) * fraction);

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
        strokeWeight(childrenNum * 0.3);
        // strokeWeight(10);
        //Draw Line
        line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Draw Circle
        // noStroke();
        circle(newEnd.x, newEnd.y, circleSize);

        translate(-end.x, -end.y);
        totalChilrenNum += childrenNum;
    }

    return totalChilrenNum;

}

//Branch
// function buildBranch(begin, end, color, index, branchNum) {
//     const newEnd = createVector(end.x, end.y);
//     const fraction = PI / (branchNum + 1);
//     stroke(color);
//     newEnd.rotate(-PI / 2 + index * fraction);
//     line(begin.x, begin.y, newEnd.x, newEnd.y);
// }

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
                    children: [
                    ]
                },
                {
                    gender: 'woman',
                    gender_color: 'red',
                    children: [
                    ]
                },
            ]
        },
        {
            gender: 'woman',
            gender_color: 'red',
            children: [
            ]
        },
        {
            gender: 'woman',
            gender_color: 'red',
            children: [
            ]
        },
    ]
}