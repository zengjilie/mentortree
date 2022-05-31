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
    const root = require(`./public/tree-candidate/${e}`); // open the file
    const path = `./public/tree-candidate-new/${e}`; // where you want to save the file

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
        if (root.gender_color === 'blue') {
            root.gender_color = 'rgba(115,255,218,0.5)';
        } else if (root?.gender_color === 'red') {
            root.gender_color = 'rgba(255,95,145,0.5)';
        } else if (root?.gender_color === 'grey') {
            root.gender_color = 'rgba(220,220,220,0.8)';
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

        if (root?.children_num == 0) {
            map.set(root.name, 1);
            return;
        } else {
            for (let i = 0; i < root?.children.length; i++) {
                getTreeData(root?.children[i]);
            }
            map.set(root.name, root.children_num + 1)
            return;
        }

    }

    /**
     * Add "precentage" attribute to root
     * Recursive function
     * @param {*} root 
     * @returns 
     */
    function addWeight(root) {
        if (root?.children == null) {
            root.weight = map.get(root.name);
            return;
        } else {
            root.weight = map.get(root.name);
            for (let i = 0; i < root.children.length; i++) {
                addWeight(root?.children[i]);
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
        // key is researcher
        // value is children_num
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

        //Do Undersampling when value > range_mean
        //Do Oversampling when value < range_mean
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

    // Add precentage to each person
    addWeight(root);

    fs = require('fs');

    const weightedData = JSON.stringify(root);
    fs.writeFile(path, weightedData, function (err) {
        if (err) console.log('error', err);
    });
})