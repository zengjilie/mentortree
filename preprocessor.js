var data;
// < Data import >

// data = require("./tree-candidate/Brad A Myers.json");
// data = require("./tree-candidate/Charles Sanders Peirce.json");
// data = require("./tree-candidate/CHRISTIAN GOTTFRIED DANIEL NEES VON ESENBECK (most curly).json");
// data = require("./tree-candidate/DONALD REIFF (most female-tilted).json");
// data = require("./tree-candidate/Donna Haraway.json");
// data = require("./tree-candidate/FRANCIS GALTON (Widest and Tallest).json");
// data = require("./tree-candidate/Hiroshi Ishii.json");
// data = require("./tree-candidate/Jane Goodall.json");
// data = require("./tree-candidate/Jennifer A Doudna.json");
// data = require("./tree-candidate/JOHANN MULLER (most male-tilted).json");
// data = require("./tree-candidate/Ludwig Boltzmann.json");
// data = require("./tree-candidate/Niels Bohr.json");
// data = require("./tree-candidate/Richard P Feynman.json");
// data = require("./tree-candidate/ROBERT HARE.json");
// data = require("./tree-candidate/Stephen Hawking.json");
// data = require("./tree-candidate/William James.json");
data = require("./tree-candidate/WILLIAM SPENCER HUTCHINSON.json");
const root = data;

var path;

// path = "./tree-candidate-new/Brad A Myers.json";
// path = "./tree-candidate-new/Charles Sanders Peirce.json";
// path = "./tree-candidate-new/CHRISTIAN GOTTFRIED DANIEL NEES VON ESENBECK (most curly).json";
// path = "./tree-candidate-new/DONALD REIFF (most female-tilted).json";
// path = "./tree-candidate-new/Donna Haraway.json";
// path = "./tree-candidate-new/FRANCIS GALTON (Widest and Tallest).json";
// path = "./tree-candidate-new/Hiroshi Ishii.json";
// path = "./tree-candidate-new/Jane Goodall.json";
// path = "./tree-candidate-new/Jennifer A Doudna.json";
// path = "./tree-candidate-new/JOHANN MULLER (most male-tilted).json";
// path = "./tree-candidate-new/Ludwig Boltzmann.json";
// path = "./tree-candidate-new/Niels Bohr.json";
// path = "./tree-candidate-new/Richard P Feynman.json";
// path = "./tree-candidate-new/ROBERT HARE.json";
// path = "./tree-candidate-new/Stephen Hawking.json";
// path = "./tree-candidate-new/William James.json";
path = "./tree-candidate-new/WILLIAM SPENCER HUTCHINSON.json";

//< Procedure >
/**
 * 1. store all the researcher's name and their children number inside a map
 * 2. map childrenNum to weighted precentage
 * 3. add "precentage" property to each researcher
 * 4. export new JSON file
 */

// < Map  (researcher, childrenNum) > 
let map = new Map();
// < Set researchAreas >
let areaSet = new Set();

/** 
 * recurse void (root:{
 * name:stirng,
 * gender:man,
 * gender_color:stirng,
 * researcharea:string[],
 * children:researcher[] 
 *  })
 * recurse function will find the reseracher's name and their chidrenNum
 * */

/**
 * 
 * @param {*} root 
 * @returns 
 */
function recurse(root) {
    //< Warning: the "researcharea" property may not a string array, but a string >
    if (typeof root.researcharea === 'string') {
        areaSet.add(root.researcharea);
        root.researcharea = [root.researcharea];
    } else {
        for (let area of root.researcharea) {
            areaSet.add(area);
        }
    }

    // Base case
    if (root?.children == null) {
        map.set(root.name, 1);
        return 1;
    } else {
        let num = 1;
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

// < Add a new property "allResearchAreas" to >
root.allResearchAreas = [...areaSet];

// < Calculate the "precentage"
// undersampling researchers who has too many mentees >

/**
 * 1.divided by sum
 * 2.divided by max value
 * 3. |mean - x|/|x_max - x_min| ( x is childNum)
 **/

let sum = 0;
let max = 0;
let min = 1;
let mean;
let max_min;
for (let [key, value] of map) {
    sum += value;
    max = value > max ? value : max;
    min = value < min ? value : min;
}

max_min = Math.abs(max - min);

// mean = sum / map.size;
mean = (max - min) / 2;

console.log('sum: ' + sum);
console.log('map size:' + map.size);
console.log('mean:' + mean);
console.log('max:' + max);
console.log('min:' + min);
// console.log(map);

//  |mean - x|/|x_max - x_min| ( x is childNum)
for (let [key, value] of map) {

    /**
     * 1. oversampling/undersampling
     * 2. "transformRate" bigger --> thicker leaf and thinner trunk 
     */

    let newValue;
    let transformRate = 0.1;

    //If value bigger then the mean --> undersampling
    //If value less then the mean --> oversampling
    if (value > mean) {
        const distFromMean = value - mean;
        newValue = value - distFromMean * transformRate;
    } else if (value < mean) {
        const distFromMean = mean - value;
        newValue = value + distFromMean * transformRate;
    } else {
        newValue = value;
    }


    const prec = newValue / sum;
    map.set(key, prec);
}

//=== add weight to data ===

/**
 * 
 * @param {*} root 
 * @returns 
 */
function traverse(root) {
    //< Gender color palette >
    if (root.gender_color == 'blue') {
        // root.gender_color = 'rgba(101,132,248,0.5)';
        // root.gender_color = 'rgba(82,206,206,0.5)'; // color palette 1
        root.gender_color = 'rgba(115,255,218,0.5)'; // color palette 2

    } else {
        // root.gender_color = 'rgba(255,115,189,0.5)'; // color palette 1
        root.gender_color = 'rgba(255,95,145,0.5)'; // color paletta 2
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

// < Export new data >

let weightedData = JSON.stringify(root);

fs = require('fs');


// Write File
fs.writeFile(path, weightedData, function (err) {
    if (err) console.log('error', err);
});

// console.log(root);

// < Data for testing >
// data = {
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
