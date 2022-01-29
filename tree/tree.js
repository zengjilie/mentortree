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

    //White backgrond
    // background(255);

    //Move start point to middle of screen
    translate(width / 2, height);

    //Draw Root
    // stroke(tree.gender_color);
    stroke(data.gender_color);
    const begin = createVector(0, 0);

    const end = createVector(0, -140);

    //Tree params

    const strokeW = 5;
    const circleSize = 10;
    const angle = 1;

    //Draw line and circle root
    line(begin.x, begin.y, end.x, end.y);
    strokeWeight(strokeW);
    noStroke();
    circle(end.x, end.y, circleSize);

    //children
    // buildTree(tree.children, begin, end, circleSize, angle);
    buildTree(data.children, begin, end, strokeW, circleSize, angle);
}

function buildTree(children, begin, end, strokeW, circleSize, angle) {
    const branchNum = children?.length;
    if (branchNum === 0) {
        return;
    }

    //Recurse on all the nodes
    for (let i = 0; i < branchNum; i++) {
        //Move current end point as the start point
        translate(end.x, end.y);
        // Build branch
        const newEnd = createVector(end.x, end.y + 8);
        const fraction = PI / (branchNum + 1);
        stroke(children[i].gender_color);

        strokeWeight(strokeW);
        //Weighted, M->L, W->R
        // if (children[i].gender === 'man') {
        //     newEnd.rotate((i + 1) * -PI / 60);
        // } else if (children[i].gender === 'woman') {
        //     newEnd.rotate((i + 1) * PI / 30);
        //     //Weighted
        //     // newEnd.rotate((i + 1) * PI / angle + 0.4);
        // }

        //Evenly
        // newEnd.rotate(-PI / 2 + (i + 1) * fraction);

        //Same Direction
        // newEnd.rotate(i * -PI / angle + 0.3);
        //Weighted
        newEnd.rotate(i * -PI / angle);

        //Draw Line
        line(begin.x, begin.y, newEnd.x, newEnd.y);

        //Draw Circle
        noStroke();
        circle(newEnd.x, newEnd.y, circleSize - 1.3);

        //Recurse
        buildTree(children[i].children, begin, newEnd, strokeW - 0.5, circleSize - 1.3, angle + 20);

        translate(-end.x, -end.y);
    }

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