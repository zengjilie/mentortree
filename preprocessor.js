
const files = [
    "Brad A Myers.json",
    "Charles Sanders Peirce.json",
    "CHRISTIAN GOTTFRIED DANIEL NEES VON ESENBECK (most curly).json",
    "DONALD REIFF (most female-tilted).json",
    "Donna Haraway.json",
    "FRANCIS GALTON (Widest and Tallest).json",
    "Hiroshi Ishii.json",
    "Jane Goodall.json",
    "Jennifer A Doudna.json",
    "JOHANN MULLER (most male-tilted).json",
    "Ludwig Boltzmann.json",
    "Niels Bohr.json",
    "Richard P Feynman.json",
    "ROBERT HARE.json",
    "Stephen Hawking.json",
    "William James.json",
    "WILLIAM SPENCER HUTCHINSON.json",
]

files.forEach(e => {
    const root = require(`./tree-candidate/${e}`);
    const path = `./tree-candidate-new/${e}`;

    let map = new Map(); // researcher:string => childrenNum:number
    let areaSet = new Set(); //researchAreas:string

    /**
     * Get map and areaSet value 
     * Recursive function
     * @param {*} root 
     * @returns 
     */
    function getTreeData(root) {

        //Apply color palette
        if (root.gender_color == 'blue') {
            root.gender_color = 'rgba(115,255,218,0.5)';
        } else {
            root.gender_color = 'rgba(255,95,145,0.5)';
        }

        // areaSet
        if (typeof root.researcharea === 'string') {
            areaSet.add(root.researcharea);
            root.researcharea = [root.researcharea];
        } else {
            for (let area of root.researcharea) {
                areaSet.add(area);
            }
        }

        // map
        if (root?.children == null) {
            map.set(root.name, 1);
            return 1;
        } else {
            let num = 1;
            for (let i = 0; i < root.children.length; i++) {
                const childNum = getTreeData(root?.children[i]);
                num += childNum;
            }
            map.set(root.name, num);
            return num + 1;
        }
    }

    /**
     * Add "precentage" attribute to root
     * Recursive function
     * @param {*} root 
     * @returns 
     */
    function addPrecentage(root) {
        if (root?.children == null) {
            root.weight = map.get(root.name);
            return;
        } else {
            root.weight = map.get(root.name);
            for (let i = 0; i < root.children.length; i++) {
                addPrecentage(root?.children[i]);
            }
            return;
        }
    }

    getTreeData(root);

    root.allResearchAreas = [...areaSet];

    // Calculate precentage
    let sum = 0;
    let max = 0;
    let min = 1;
    let range_mean;
    for (let [key, value] of map) {
        sum += value;
        max = value > max ? value : max;
        min = value < min ? value : min;
    }

    range_mean = (max - min) / 2;

    console.log(
        '', `${e}`, '\n',
        `sum: ${sum}`, '\n',
        `map size: ${map.size}`, '\n',
        `max: ${max}`, '\n',
        `min: ${min}`, '\n',
        `range_mean: ${range_mean}`, `\n`
    );

    for (let [key, value] of map) {
        // 1. oversampling/undersampling
        // 2. "transformRate" bigger --> thicker leaf, thinner trunk 

        let newValue;
        const transformRate = 0.1;

        //Do Undersampling when value > mean
        //Do Oversampling when value < mean
        if (value > range_mean) {
            const distFromMean = value - range_mean;
            newValue = value - distFromMean * transformRate;
        } else if (value < range_mean) {
            const distFromMean = range_mean - value;
            newValue = value + distFromMean * transformRate;
        } else {
            newValue = value;
        }

        const precentage = newValue / sum;
        map.set(key, precentage);
    }

    addPrecentage(root);

    let weightedData = JSON.stringify(root);

    fs = require('fs');

    fs.writeFile(path, weightedData, function (err) {
        if (err) console.log('error', err);
    });
})