//PARSE INITIAL JSON TO OBJECT
var tree = {
    gender: 'male',
    color: 'blue',
    children: [
        {
            gender: 'male',
            color: 'blue',
            children: [
                {
                    gender: 'male',
                    color: 'blue',
                    children: [

                    ]
                },
                {
                    gender: 'male',
                    color: 'red',
                    children: [

                    ]
                },
            ]
        },
        {
            gender: 'female',
            color: 'red',
            children: [
            ]
        },
        {
            gender: 'female',
            color: 'red',
            children: [
            ]
        },
    ]
}

var root;
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(235);
    translate(width / 2, height);
    //root
    stroke(tree.color);
    const begin = createVector(0, 0);
    const end = createVector(0, -100);
    line(begin.x, begin.y, end.x, end.y);

    //children
    buildTree(tree.children, begin, end);
}


function buildTree(children, begin, end) {
    translate(end.x, end.y);
    const branchNum = children.length;
    for (i = 0; i < branchNum; i++) {
        buildBranch(begin, end, children[i].color, i + 1, branchNum);
        // buildTree(children[i].children, begin, end);
    }
}

//Branch
function buildBranch(begin, end, color, index, branchNum) {
    const newEnd = createVector(end.x, end.y);
    const fraction = PI / (branchNum + 1);
    stroke(color);
    newEnd.rotate(-PI / 2 + index * fraction);
    line(begin.x, begin.y, newEnd.x, newEnd.y);
}