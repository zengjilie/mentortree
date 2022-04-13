// const data = {
//     name: 'Gege',
//     gender: 'man',
//     gender_color: 'blue',
//     children: [
//         {
//             name: 'Jiejie',
//             gender: 'man',
//             gender_color: 'blue',
//             children: [
//                 {
//                     name: 'Meimei',
//                     gender: 'man',
//                     gender_color: 'blue',
//                 },
//                 {
//                     name: 'Didi',
//                     gender: 'woman',
//                     gender_color: 'red',
//                 },
//             ]
//         },
//         {
//             name: 'Dama',
//             gender: 'woman',
//             gender_color: 'red',
//         },
//         {
//             name: 'Dashu',
//             gender: 'woman',
//             gender_color: 'red',
//         },
//     ]
// }

const data = require("./psych_id783121.json");
// const data = require("./Francis_Galton_1.json");
// const data = require("./George_M_Church.json");
// const data = require("./HENRY_GARRETT_Sshape.json");
// const data = require("./WILLIAM _JAMES_Tshape.json");

const root = data;
/**
 * 1. store all the researcher's name and their children number inside map
 * 2. map children number to precentage
 * 3. add precentage property to the data
 * 4. export new JSON file
 */

//render color generator

// the map variable stores keyvalue pairs -> (research's name, childrenNum)
let map = new Map();
let areaSet = new Set();// store research areas

// the recurse function will find the reseracher's name and their chidrenNum;
function recurse(root) {
    //base case

    //sometimes research area is not an arary, instead it's a string
    if (typeof root.researcharea === 'string') {
        areaSet.add(root.researcharea);
        root.researcharea = [root.researcharea];
    } else {
        for (let area of root.researcharea) {
            areaSet.add(area);
        }
    }

    if (root?.children == null) {
        map.set(root.name, 1);
        return 1;
    } else {
        let num = 0;
        for (let i = 0; i < root.children.length; i++) {
            const childNum = recurse(root?.children[i]);
            num += childNum;
        }
        map.set(root.name, num);
        return num + 1;
    }
}

recurse(root);
// console.log(areaSet);

// === add all research area to root node ===
root.allResearchAreas = [...areaSet];

// === get precentage ===
// normalize the mentee distribution
/**
 * 1.divided by sum
 * 2.divided by max value
 * 3. |mean - x|/|x_max - x_min| ( x is childNum)
 **/

let sum = 0;
let max = 0;
let min = 0;
let mean = 0;
for (let [key, value] of map) {
    sum += value;
    max = value > max ? value : max;
    min = value < min ? value : min;
}

mean = sum / map.size;

console.log(sum);
console.log(map.size);
console.log(mean);
console.log(map);

//1. divided by sum
// for (let [key, value] of map) {
//     const prec = value / sum;
//     map.set(key, prec);
// }

//2. divided by max
// for (let [key, value] of map) {
//     const prec = value / max ;
//     map.set(key, prec);
// }

// 3. |mean - x|/|x_max - x_min| ( x is childNum)
for (let [key, value] of map) {
    /**
     * 1. threshold tunning
     * 2. mean + {x} - value, x increase -> branch thicker
     */
    let distFromMean = Math.abs(mean + 10 - value);//Francis/hery
    // let distFromMean = Math.abs(mean + 100 - value);//william;
    // let distFromMean = Math.abs(mean - value);//geroge church

    //normalize root 
    // distFromMean = distFromMean > 1000 ? distFromMean / 4 : distFromMean;// Francis / william
    distFromMean = distFromMean > 50 ? distFromMean / 4 : distFromMean; // geroge church/hery

    let max_min = Math.abs(max - min);
    const prec = distFromMean / max_min;
    map.set(key, prec);
}

//=== add weight to data ===

function traverse(root) {
    //change gender color
    if (root.gender_color == 'blue') {
        // root.gender_color = 'rgba(101,132,248,0.5)';
        // root.gender_color = 'rgba(82,206,206,0.5)'; // comb1
        root.gender_color = 'rgba(115,255,218,0.5)'; // comb2

    } else {
        // root.gender_color = 'rgba(255,115,189,0.5)'; // comb1
        root.gender_color = 'rgba(255,95,145,0.5)'; // comb2
    }


    if (root?.children == null) {
        root.weight = map.get(root.name);
        return;
    } else {
        root.weight = map.get(root.name);
        for (let i = 0; i < root.children.length; i++) {
            traverse(root?.children[i]);
        }
        return;
    }
}

traverse(root);
// console.log(JSON.stringify(root));
// === export new data ===

let weightedData = JSON.stringify(root);

fs = require('fs');
fs.writeFile("psych_id783121_new.json", weightedData, function (err) {;
// fs.writeFile("Francis_Galton_1_new.json", weightedData, function (err) {
// fs.writeFile("George_M_Church_new.json", weightedData, function (err) {
// fs.writeFile("./WILLIAM_JAMES_Tshape_new.json", weightedData, function (err) {
// fs.writeFile("./HENRY_GARRETT_Sshape_new.json", weightedData, function (err) {
    if (err) console.log('error', err);
});

// console.log(root);