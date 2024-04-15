const fs = require('fs');

const lstExpedientesDB = JSON.parse(fs.readFileSync('./expedientes.json'));
const lstManipulaciones = JSON.parse(fs.readFileSync('./manipulaciones.json'));

console.log(lstExpedientesDB.length)

lstManipulaciones.forEach(exp => {
    let index = lstExpedientesDB.findIndex(e => e.sexpediente == exp.sexpediente);

    if (index >= 0) {
        // console.log('Si está indexado', exp.sexpediente)
    } else {
        console.log('No está indexado', exp.sexpediente, 'toques=', exp.ntoques)
    }
});