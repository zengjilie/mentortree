// < Data for testing >
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

// < Data import >
// const data = require("./psych_id783121.json");
// const data = require("./Francis_Galton_1.json");
// const data = require("./George_M_Church.json");
// const data = require("./HENRY_GARRETT_Sshape.json");
// const data = require("./WILLIAM _JAMES_Tshape.json");

// const data = require("./tree-candidate/CharlesSandersPeirce.json");

// const data = require("./tree-candidate/DonnaHaraway.json");
// const data = require("./tree-candidate/JenniferADoudna.json");

// const data = require("./tree-candidate/JaneGoodall.json");
// const data = require("./tree-candidate/LudwigBoltzmann.json");
// const data = require("./tree-candidate/NielsBohr.json");
// const data = require("./tree-candidate/RichardPFeynman.json");
// const data = require("./tree-candidate/StephenHawking.json");
// const data = require("./tree-candidate/WilliamJames.json");

//Special
// const data = require("./special/curly-tree.json");
// const data = require("./special/female-titled-tree.json");
// const data = require("./special/male-tilted-tree.json");
// const data = require("./special/tallest-tree.json");
const data = require("./special/widest-tree.json");
const root = data;

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

// < Add all researchareas to root node >
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
let min = 0;
let mean = 0;
for (let [key, value] of map) {
    sum += value;
    max = value > max ? value : max;
    min = value < min ? value : min;
}

mean = sum / map.size;

console.log('sum: ' + sum);
console.log('map size:' + map.size);
console.log('mean:' + mean);
console.log(map);

//1. divided by sum
// for (let [key, value] of map) {
//     const prec = value / sum; //     map.set(key, prec);
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
    // let distFromMean = Math.abs(mean + 10 - value);//Francis/hery
    // let distFromMean = Math.abs(mean + 100 - value);//william;
    let distFromMean = Math.abs(mean - value);//geroge church/donna/jennifer

    //normalize root 
    distFromMean = distFromMean > 1000 ? distFromMean / 4 : distFromMean;// Francis / william / tall
    // distFromMean = distFromMean > 50 ? distFromMean / 4 : distFromMean; // geroge church/hery
    // distFromMean = distFromMean > 15 ? distFromMean / 4 : distFromMean; // donnaHarway/jennifer
    // distFromMean = distFromMean > 10 ? distFromMean / 4 : distFromMean; // female tilted tree
    // distFromMean = distFromMean > 4 ? distFromMean / 4 : distFromMean; // male tilted tree


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

//Apr 13
// const data ="./tree-candidate-new/psych_id783121.json";
// const data ="./tree-candidate-new/Francis_Galton_1.json";
// const data ="./tree-candidate-new/George_M_Church.json";
// const data ="./tree-candidate-new/HENRY_GARRETT_Sshape.json";
// const data ="./tree-candidate-new/WILLIAM _JAMES_Tshape.json";
// const path ="./tree-candidate-new/tree-candidate-new/Francis_Galton_1.json";

//Apr 20
// const path = "./tree-candidate-new/CharlesSandersPeirce.json";

// const path = "./tree-candidate-new/DonnaHaraway.json";
// const path = "./tree-candidate-new/JenniferADoudna.json";

// const path = "./tree-candidate-new/JaneGoodall.json";
// const path ="./tree-candidate-new/LudwigBoltzmann.json";
// const path ="./tree-candidate-new/NielsBohr.json";
// const path ="./tree-candidate-new/RichardPFeynman.json";
// const path ="./tree-candidate-new/StephenHawking.json";
// const path = "./tree-candidate-new/WilliamJames.json";

//Special path
// const path = "./special-new/curly-tree.json";
// const path = "./special-new/female-titled-tree.json";
// const path = "./special-new/male-titled-tree.json";
// const path = "./special-new/tallest-tree.json";
const path = "./special-new/widest-tree.json";

// Write File
fs.writeFile(path, weightedData, function (err) {
    if (err) console.log('error', err);
});

// console.log(root);