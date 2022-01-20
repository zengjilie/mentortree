const cav = document.getElementById('canvas');
const ctx = cav.getContext('2d');

// //fillRect()
// ctx.fillStyle = 'red';
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillStyle = 'blue';
// ctx.fillRect(200, 20, 150, 100);

// // strockRect()
// ctx.lineWidth = 5;
// ctx.fillStyle = 'green';
// ctx.strokeRect(100, 200, 150, 100)

// // clearRect()
// ctx.clearRect(25, 25, 140, 90);

// // fileText()
// ctx.font = '30px Arial';
// ctx.fillStyle = 'purple';
// ctx.fillText('hello world', 400, 50);


// // strokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText('hello world', 400,100);

//Paths
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(150,50);
ctx.lineTo(100,200);
ctx.closePath();
ctx.stroke();
