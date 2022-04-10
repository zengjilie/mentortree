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

const data = require("./Francis_Galton_1.json");
// const data = require("./psych_id783121.json");
// const data = require("./George_M_Church.json");

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

// calculate sum
let sum = 0;
for (let [key, value] of map) {
    sum += value;
}

for (let [key, value] of map) {
    const prec = value / sum;
    map.set(key, prec);
}

//=== add weight to data ===

function traverse(root) {
    //change gender color
    if (root.gender_color == 'blue') {
        root.gender_color = 'rgba(101,132,248,0.5)';
    } else {
        root.gender_color = 'rgba(255,0,0,0.5)';
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

// let weightedData = JSON.stringify(root);

var fs = require('fs');
fs.writeFile("Francis_Galton_1_new.json", weightedData, function (err) {
// fs.writeFile("psych_id783121_new.json", weightedData, function (err) {;
// fs.writeFile("George_M_Church_new.json", weightedData, function (err) {
    if (err) console.log('error', err);
});

// console.log(root);