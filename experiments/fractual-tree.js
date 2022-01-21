//PARSE INITIAL JSON TO OBJECT
var tree = {
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

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(51);
    stroke(255);
    translate(200, height);
    branch(100);
}

function branch(len){
    line(0,0,0, -len);
}
