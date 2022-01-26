const csv = require('csvtojson');
const fs = require('fs');

//OPEN TXT FILE
//Read csv file
csv()
    .fromFile(__dirname + '/dataset/data-large.csv')
    .then((data) => {
        var stream = fs.createWriteStream('processedCircles.txt', { flags: 'w' });
        //CSV -> JSON
        data.forEach((entry) => {

            //REMOVE PROPERTY Y
            delete entry.y;

            //RENAME COMP1/COMP
            entry.x = parseInt(entry.comp1);
            entry.y = parseInt(entry.comp2);
            delete entry.comp1;
            delete entry.comp2;

            //TURN ALL NUMBERS TO POSITIVE 
            entry.x += 50;
            entry.y += 50;

            // CHANGE LABEL to COLOR
            switch (entry.label) {
                case '0:ICASSP(Signal Processing)':
                    entry.color = 'red';
                    break;
                case '2:EMBC(Medicine and Biology)':
                    entry.color = 'red';
                    break;
                case '4:ICME(Multimedia)':
                    entry.color = 'red';
                    break;
                case '5:NIPS(Neural Information)':
                    entry.color = 'red';
                    break;
                case '6:INTERACT(Human-Computer Interaction)':
                    entry.color = 'red';
                    break;
                case '8:ICC(Communications)':
                    entry.color = 'red';
                    break;
                case '9:GLOBECOM(Global Communications)':
                    entry.color = 'red';
                    break;
                case '10:ICPR(Pattern Recognition)':
                    entry.color = 'red';
                    break;
                case '11:GECCO(Genetic Evolutionary Computation)':
                    entry.color = 'red';
                    break;
                case '12:IJCNN(Neural Network)':
                    entry.color = 'red';
                    break;
                case '13:IROS(Intelligent Robots)':
                    entry.color = 'red';
                    break;
                case '14:INFOCOM(Computer Communications)':
                    entry.color = 'red';
                    break;
                case '15:WSC(Winter Simulation)':
                    entry.color = 'red';
                    break;
                case '17:HiPC(High Performance Computing)':
                    entry.color = 'red';
                    break;
                case '18:PIMRC(Communications)':
                    entry.color = 'red';
                    break;
                case '19:CVPR(Computer Vision)':
                    entry.color = 'red';
                    break;
                case '22:ICIP(Information Photonics)':
                    entry.color = 'red';
                    break;
                case '24:CHI(Computing Systems)':
                    entry.color = 'red';
                    break;
                case '26:SIGGRAPH(Computer Graphics)':
                    entry.color = 'red';
                    break;
                case '27:HICSS(System Sciences)':
                    entry.color = 'red';
                    break;
                case '28:SMC(Cybernetics)':
                    entry.color = 'red';
                    break;
                case '30:ICSE(Internet Computing)':
                    entry.color = 'red';
                    break;
                case '31:MILCOM(Military Communications)':
                    entry.color = 'red';
                    break;
                case '32:VTC(Vehicular)':
                    entry.color = 'red';
                    break;
                case '33:ICSP(Signal Processing)':
                    entry.color = 'red';
                    break;
                case '34:INTERSPEECH(Speech Communication)':
                    entry.color = 'red';
                    break;
                case '36:ISSCC(Computing Communication)':
                    entry.color = 'red';
                    break;
                case '37:AAAI(Artificial Intelligence)':
                    entry.color = 'red';
                    break;
                case '38:ACC(American Control)':
                    entry.color = 'red';
                    break;
                case '39:DAC(Design Automation)':
                    entry.color = 'red';
                    break;
                case '40:ACL(Computational Linguistics)':
                    entry.color = 'red';
                    break;
                case '41:ACC(Computing Communications)':
                    entry.color = 'red';
                    break;
                case '42:IPDPS(Parallel Distributed Processing)':
                    entry.color = 'red';
                    break;
                case '43:ISCAS(Circuits)':
                    entry.color = 'red';
                    break;
                case '44:IGARSS(Geoscience)':
                    entry.color = 'red';
                    break;
                case '45:CDC(Decision and Control)':
                    entry.color = 'red';
                    break;
                case '46:CEC(Evolutionary Computation)':
                    entry.color = 'red';
                    break;
                case '48:ASILOMAR(Signals, Systems)':
                    entry.color = 'red';
                    break;
                case '49:IJCAI(Artificial Intelligence)':
                    entry.color = 'red';
                    break;
            }

            delete entry.label;

            //JSON -> SVG
            stream.write(
                `<circle 
                    cx="${entry.x}" 
                    cy="${entry.y}" 
                    r="1" 
                    fill="${entry.color}"  
                    filter="url(#watercolor-3)"
                    fill-opacity="0.8"
                />\n`);

        })
    })
