const csv = require('csvtojson');
const fs = require('fs');

//Read csv file
csv()
    .fromFile(__dirname + '/dataset/data-large.csv')
    .then((data) => {
        var stream = fs.createWriteStream('PreprocessedData.json', { flags: 'w' });
        var arr = [];
        //CSV -> JSON
        data.forEach((entry) => {

            //REMOVE PROPERTY Y
            delete entry.y;

            //RENAME COMP1/COMP
            entry.x = parseFloat(entry.comp1);
            entry.y = parseFloat(entry.comp2);
            delete entry.comp1;
            delete entry.comp2;

            //TURN ALL NUMBERS TO POSITIVE 
            // entry.x += 50;
            // entry.y += 50;

            // CHANGE LABEL to COLOR
            switch (entry.label) {
                case '0:ICASSP(Signal Processing)':
                    entry.color = 'rgba(128,128,128,0.5)';
                    break;
                case '2:EMBC(Medicine and Biology)':
                    entry.color = 'rgba(47,79,79,0.5)';
                    break;
                case '4:ICME(Multimedia)':
                    entry.color = 'rgba(85,107,47,0.5)';
                    break;
                case '5:NIPS(Neural Information)':
                    entry.color = 'rgba(139,69,19,0.5)';
                    break;
                case '6:INTERACT(Human-Computer Interaction)':
                    entry.color = 'rgba(139,0,0,0.5)';
                    break;
                case '8:ICC(Communications)':
                    entry.color = 'rgba(128,128,0,0.5)';
                    break;
                case '9:GLOBECOM(Global Communications)':
                    entry.color = 'rgba(72,61,139,0.5)';
                    break;
                case '10:ICPR(Pattern Recognition)':
                    entry.color = 'rgba(0,128,0,0.5)';
                    break;
                case '11:GECCO(Genetic Evolutionary Computation)':
                    entry.color = 'rgba(58,63,68,0.5)';
                    break;
                case '12:IJCNN(Neural Network)':
                    entry.color = 'rgba(60,179,113,0.5)';
                    break;
                case '13:IROS(Intelligent Robots)':
                    entry.color = 'rgba(189,183,107,0.5)';
                    break;
                case '14:INFOCOM(Computer Communications)':
                    entry.color = 'rgba(0,139,139,0.5)';
                    break;
                case '15:WSC(Winter Simulation)':
                    entry.color = 'rgba(70,130,180,0.5)';
                    break;
                case '17:HiPC(High Performance Computing)':
                    entry.color = 'rgba(154,205,50,0.5)';
                    break;
                case '18:PIMRC(Communications)':
                    entry.color = 'rgba(0,0,139,0.5)';
                    break;
                case '19:CVPR(Computer Vision)':
                    entry.color = 'rgba(218,165,32,0.5)';
                    break;
                case '22:ICIP(Information Photonics)':
                    entry.color = 'rgba(143,188,143,0.5)';
                    break;
                case '24:CHI(Computing Systems)':
                    entry.color = 'rgba(128,0,128,0.5)';
                    break;
                case '26:SIGGRAPH(Computer Graphics)':
                    entry.color = 'rgba(176,48,96,0.5)';
                    break;
                case '27:HICSS(System Sciences)':
                    entry.color = 'rgba(255,69,0,0.5)';
                    break;
                case '28:SMC(Cybernetics)':
                    entry.color = 'rgba(0,206,209,0.5)';
                    break;
                case '30:ICSE(Internet Computing)':
                    entry.color = 'rgba(0,206,209,0.5)';
                    break;
                case '31:MILCOM(Military Communications)':
                    entry.color = 'rgba(255,140,0,0.5)';
                    break;
                case '32:VTC(Vehicular)':
                    entry.color = 'rgba(255,215,0,0.5)';
                    break;
                case '33:ICSP(Signal Processing)':
                    entry.color = 'rgba(0,0,205,0.5)';
                    break;
                case '34:INTERSPEECH(Speech Communication)':
                    entry.color = 'rgba(0,255,0,0.5)';
                    break;
                case '36:ISSCC(Computing Communication)':
                    entry.color = 'rgba(148,0,211,0.5)';
                    break;
                case '37:AAAI(Artificial Intelligence)':
                    entry.color = 'rgba(0,255,127,0.5)';
                    break;
                case '38:ACC(American Control)':
                    entry.color = 'rgba(220,20,60,0.5)';
                    break;
                case '39:DAC(Design Automation)':
                    entry.color = 'rgba(0,191,255,0.5)';
                    break;
                case '40:ACL(Computational Linguistics)':
                    entry.color = 'rgba(244,164,96,0.5)';
                    break;
                case '41:ACC(Computing Communications)':
                    entry.color = 'rgba(147,112,219,0.5)';
                    break;
                case '42:IPDPS(Parallel Distributed Processing)':
                    entry.color = 'rgba(240,128,128,0.5)';
                    break;
                case '43:ISCAS(Circuits)':
                    entry.color = 'rgba(173,255,47,0.5)';
                    break;
                case '44:IGARSS(Geoscience)':
                    entry.color = 'rgba(255,0,255,0.5)';
                    break;
                case '45:CDC(Decision and Control)':
                    entry.color = 'rgba(30,144,255,0.5)';
                    break;
                case '46:CEC(Evolutionary Computation)':
                    entry.color = 'rgba(221,160,221,0.5)';
                    break;
                case '48:ASILOMAR(Signals, Systems)':
                    entry.color = 'rgba(173,216,230,0.5)';
                    break;
                case '49:IJCAI(Artificial Intelligence)':
                    entry.color = 'rgba(238,130,238,0.5)';
                    break;
                default:
                    entry.color = 'rgba(238,130,238,0.5)';
                    break;
            }

            delete entry.label;

            arr.push(entry);
            //JSON -> SVG
            // stream.write(
            //     `<circle 
            //         cx="${entry.x}" 
            //         cy="${entry.y}" 
            //         r="1" 
            //         fill="${entry.color}"  
            //         filter="url(#watercolor-3)"
            //         fill-opacity="0.8"
            //     />\n`);

        })
        const json = { data: arr };
        stream.write(JSON.stringify(json));
    })
