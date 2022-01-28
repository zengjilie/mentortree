// const express = require('express');
// const app = express();
// const draw = require('./draw.js');
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

// app.listen(5000);

//recursion test
var root = {
    num: 0,
    arr: [
        {
            num: 1,
            arr: [
                {
                    num: 2,
                    arr: [
                    ]
                },
            ]
        },
        {
            num: 3,
            arr: [
                {
                    num: 4,
                    arr: [
                    ]
                }
            ]
        },
    ]
}

function recurse(arr) {
    const num =arr.length;
    if (num === 0) {
        return;
    }
    for (let i = 0; i < num; i++) {
        console.log(arr[i]);
        recurse(arr[i].arr);
    }
}

recurse(root.arr);