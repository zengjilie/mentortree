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

    var len = 100;
    line(200, height, 200, height-len);
}
