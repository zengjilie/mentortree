//PARSE INITIAL JSON TO OBJECT
var tree = {
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

var root;
var data;

function preload() {
    data = loadJSON('./datasets/psych_id783121.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(500,500);

    console.log(data);
    // background(235);
    // translate(width / 2, height-100);
    // //root
    // stroke(data.gender_color);
    // const begin = createVector(0, 0);
    // const end = createVector(0, -70);
    // strokeWeight(100);
    // line(begin.x, begin.y, end.x, end.y);

    // //children
    // buildTree(data.children, begin, end);
}

function draw() {
    background(235);
    translate(width / 2, height);
    //root
    stroke(data.gender_color);
    // stroke(tree.gender_color);
    const begin = createVector(0, 0);
    const end = createVector(0, -140);
    // strokeWeight(3);
    line(begin.x, begin.y, end.x, end.y);
    circle(end.x, end.y, 6);
    //children
    // buildTree(tree.children, begin, end);
    buildTree(data.children, begin, end);
}

function buildTree(children, begin, end) {
    const branchNum = children?.length;
    if (branchNum === 0) {
        return;
    }
    for (let i = 0; i < branchNum; i++) {
        translate(end.x, end.y);
        // Build branch
        const newEnd = createVector(end.x, end.y);
        const fraction = PI / (branchNum + 1);
        stroke(children[i].gender_color);
        if (children[i].gender === 'man') {
            newEnd.rotate((i + 1) * -PI / 60);
        } else if (children[i].gender === 'woman') {
            newEnd.rotate((i + 1) * PI / 30);
        }
        // newEnd.rotate(-PI / 2 + (i + 1) * fraction);
        // newEnd.rotate(i * PI / 60);
        line(begin.x, begin.y, newEnd.x, newEnd.y);
        circle(newEnd.x, newEnd.y, 6);
        buildTree(children[i].children, begin, newEnd);
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