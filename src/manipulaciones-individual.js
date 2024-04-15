const fs = require('fs');
const Excel = require('exceljs');
const wb = new Excel.Workbook();

/**
 * Recuperar el Listado Completo de Tareas
 */
let LST_TAREAS = JSON.parse(fs.readFileSync('./inputs/tareas-01-14-abril.json')).reverse();

/**
 * Filtrar aquellas tareas que sonrealmente útiles
 */

LST_TAREAS = LST_TAREAS.filter(tar => {
    let lmatch = false;
    if (tar.sespecialidad == 'laboral') {
        lmatch = true;
    } else if (tar.sespecialidad == 'familia') {
        lmatch = true;
    } else if (tar.sespecialidad == 'civil') {
        lmatch = true;
    } else if (tar.sespecialidad == 'penal') {
        lmatch = true;
    } else if (tar.sespecialidad == 'constitucional') {
        lmatch = true;
    } else if (tar.sespecialidad == 'tramite-adm') {
        lmatch = true;
    } else if (tar.sespecialidad == 'tramite-not') {
        lmatch = true;
    }
    return lmatch;
})

/**
 * Listado de trabajadores
 */
const LST_COLABS = [
    {
        "name": "Andrea Callupe",
        "id": "andrea-callupe",
    },
    {
        "name": "Anyela Apaza",
        "id": "anyela-apaza",
    },
    {
        "id": "anyela-paniura",
        "name": "Anyela Paniura"
    },
    {
        "id": "christian-arroyo",
        "name": "Christian Arroyo"
    },
    {
        "name": "Dalia Nieto",
        "id": "dalia-nieto",
    },
    {
        "name": "Denis Cutipa",
        "id": "denis-cutipa",
    },
    {
        "id": "elmer-mamani",
        "name": "Elmer Mamani",
    },
    {
        "name": "Estrella Mendoza",
        "id": "estrella-mendoza",
    },
    {
        "id": "gabriella-ojeda",
        "name": "Gabriella Ojeda",
    },
    {
        "name": "José Maldonado",
        "id": "jose-maldonado",
    },
    {
        "id": "karla-llaiqui",
        "name": "Karla Llaiqui",
    },
    {
        "name": "Lizbeth Ochoa",
        "id": "liz-ochoa",
    },
    {
        "id": "lizbet-silva",
        "name": "Lizbet Silva Guillén",
    },
    {
        "id": "maryori-garate",
        "name": "Maryori Garate"
    },
    {
        "id": "naldy-allasi",
        "name": "Naldy Allasi",
    },
    {
        "id": "nicol-colque",
        "name": "Nicol Colque",
    },
    {
        "id": "rafael-arias",
        "name": "Rafael Arias"
    },
    // {
    //     "name": "Rocío Quispe",
    //     "id": "rocio-quispe"
    // },
    // {
    //     "name": "Rodrigo Ale",
    //     "id": "rodrigo-ale"
    // },
    {
        "name": "Silvia Vilcapaza",
        "id": "silvia-vilcapaza",
    },
    {
        "id": "vianka-marin",
        "name": "Vianka Marin",
    },
    {
        "id": "ximena-ponce",
        "name": "Ximena Ponce"
    }
];

/**
 * Crear una hoja de cálculo para cada trabajador
 */
LST_COLABS.forEach(worker => {
    const ws = wb.addWorksheet(worker.name);

    // Ajustes de hoja
    ws.pageSetup = {
        margins: {
            left: 0.36, right: 0.36,
            top: 0.50, bottom: 0.50,
        },
        orientation: 'landscape'
    };

    // Ancho de columnas
    ws.getColumn('A').width = 26;
    ws.getColumn('B').width = 3;
    ws.getColumn('C').width = 3;
    ws.getColumn('D').width = 3;
    ws.getColumn('E').width = 3;
    ws.getColumn('F').width = 3;
    ws.getColumn('G').width = 3;
    ws.getColumn('H').width = 28;
    ws.getColumn('I').width = 28;
    ws.getColumn('J').width = 9;
    ws.getColumn('K').width = 3;
    ws.getColumn('L').width = 3;
    ws.getColumn('M').width = 11;
    ws.getColumn('N').width = 50;

    // Alto de la primera row
    ws.getRow(1).height = 50;

    // Cabeceras de las futuras celdas
    let lstHeaders = [
        { cell: 'A1', text: 'Expediente', rotation: 0 },
        { cell: 'B1', text: 'Laboral', rotation: 90 },
        { cell: 'C1', text: 'Familia', rotation: 90 },
        { cell: 'D1', text: 'Civil', rotation: 90 },
        { cell: 'E1', text: 'Penal', rotation: 90 },
        { cell: 'F1', text: 'Constit.', rotation: 90 },
        { cell: 'G1', text: 'Adm Not', rotation: 90 },
        { cell: 'H1', text: 'Demandante', rotation: 0 },
        { cell: 'I1', text: 'Demandado', rotation: 0 },
        { cell: 'J1', text: 'Tiempo', rotation: 0 },
        { cell: 'K1', text: 'Simple', rotation: 90 },
        { cell: 'L1', text: 'Complejo', rotation: 90 },
        { cell: 'M1', text: 'Fecha', rotation: 0 },
        { cell: 'N1', text: 'Tarea', rotation: 0 },
    ];

    lstHeaders.forEach(head => {
        let cell = ws.getCell(head.cell);

        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '07705F' },
        };

        cell.value = {
            richText: [
                {
                    text: head.text,
                    font: {
                        color: {
                            argb: 'ffffff',
                            theme: 1,
                        },
                    },
                },
            ],
        };

        cell.alignment = {
            textRotation: head.rotation,
            vertical: 'middle',
            horizontal: 'center'
        }

        // Tamaño y tipo de letra
        if (!cell.font?.size) {
            cell.font = Object.assign(cell.font || {}, { size: 9 });
        }
        if (!cell.font?.name) {
            cell.font = Object.assign(cell.font || {}, { name: 'Arial' });
        }
    });

    // Analisis
    let lstExpManipulados = [];
    let nLaboral = 0;
    let nFamilia = 0;
    let nCivil = 0;
    let nPenal = 0;
    let nConst = 0;
    let nMinutos = 0;
    let nAdmNot = 0;
    let nSimples = 0;
    let nComplejos = 0;

    LST_TAREAS
        .filter(tar => tar.idcolaborador == worker.id)
        .forEach(tar => {
            let index = lstExpManipulados.findIndex(e => e.sexpediente == tar.sexpediente);
            let lcomplejo = (tar.ncodeje >= 30 && tar.ncodeje <= 54);

            if (index >= 0) {
                // si existe
                lstExpManipulados[index].nminutos += Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion);
                lstExpManipulados[index].lsttareas.push({
                    sfecha: tar.sfecha,
                    starea: tar.sdeseje,
                    lcomplejo: lcomplejo
                });
            } else {
                // no existe
                lstExpManipulados.push({
                    sexpediente: tar.sexpediente,
                    sdemandante: tar.sdemandante,
                    sdemandado: tar.sdemandado,
                    nminutos: Number(tar.shorasatencion) * 60 + Number(tar.sminutosatencion),
                    sespecialidad: tar.sespecialidad,
                    lsttareas: [{
                        sfecha: tar.sfecha,
                        starea: tar.sdeseje,
                        lcomplejo: lcomplejo
                    }]
                })
            }
        });

    const listadoFinal = lstExpManipulados.sort((a, b) => {
        if (a.nminutos < b.nminutos) {
            return 1;
        } else {
            return -1;
        }

    });


    // Iterar cada tarea pata colocarlo en el excel final
    let nrow = 2;
    listadoFinal.forEach((exp, index) => {

        // initialize values
        let laboral = exp.sespecialidad == 'laboral' ? 1 : 0;
        let familia = exp.sespecialidad == 'familia' ? 1 : 0;
        let civil = exp.sespecialidad == 'civil' ? 1 : 0;
        let penal = exp.sespecialidad == 'penal' ? 1 : 0;
        let constit = exp.sespecialidad == 'constitucional' ? 1 : 0;
        let admnot = (exp.sespecialidad == 'tramite-adm' || exp.sespecialidad == 'tramite-not') ? 1 : 0;

        // set values
        exp.lsttareas.forEach(tar => {
            let row = ws.getRow(nrow);

            row.values = [
                exp.sexpediente,
                laboral,
                familia,
                civil,
                penal,
                constit,
                admnot,
                exp.sdemandante,
                exp.sdemandado,
                exp.nminutos,
                tar.lcomplejo ? 0 : 1,
                tar.lcomplejo ? 1: 0,
                tar.sfecha,
                tar.starea
            ];

            // format cells
            for (let i = 1; i <= 14; i++) {
                let cell = row.getCell(i);

                // Borde
                cell.border = {
                    top: {
                        style: 'thin', color: { argb: '07705F' }
                    },
                    right: {
                        style: 'thin', color: { argb: '07705F' }
                    },
                    bottom: {
                        style: 'thin', color: { argb: '07705F' }
                    },
                    left: {
                        style: 'thin', color: { argb: '07705F' }
                    },
                };

                // Alineacion
                if ([1, 8, 9, 14].includes(i)) {
                    cell.alignment = { vertical: 'middle', horizontal: 'left' };
                } else {
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                }

                // WrapText
                if ([8, 9].includes(i)) {
                    cell.alignment = { wrapText: true, vertical: 'middle' };
                }

                // Tamaño y tipo de letra
                if (!cell.font?.size) {
                    cell.font = Object.assign(cell.font || {}, { size: 9 });
                }
                if (!cell.font?.name) {
                    cell.font = Object.assign(cell.font || {}, { name: 'Arial' });
                }

                if (i == 10) {
                    cell.value = {
                        formula: exp.nminutos / 1440
                    }
                    cell.numFmt = '[HH]:MM:SS'
                }
            }


            nrow = nrow + 1;
        });

        // merge cells
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach(scol => {
            let start = nrow - 1;
            let end = nrow - exp.lsttareas.length;
            console.log('haciendo merge de', scol + start, scol + end);
            ws.mergeCells(scol + start, scol + end);
        });

        // increase values for final row
        nLaboral += laboral;
        nFamilia += familia;
        nCivil += civil;
        nPenal += penal;
        nConst += constit;
        nAdmNot += admnot;
        nMinutos += exp.nminutos;
        exp.lsttareas.forEach(tar => {
            nSimples += tar.lcomplejo ? 0 : 1;
            nComplejos += tar.lcomplejo ? 1 : 0;
        })
        
    });

    // Agegar la row de sumas totales
    let finalRow = ws.getRow(nrow);
    finalRow.values = [
        '',
        nLaboral,
        nFamilia,
        nCivil,
        nPenal,
        nConst,
        nAdmNot,
        '',
        '',
        {
            formula: nMinutos / 1440
        },
        nSimples,
        nComplejos,
        '',
        '',
    ];

    // format cells
    for (let i = 1; i <= 14; i++) {
        let cell = finalRow.getCell(i);

        // Borde
        cell.border = {
            top: {
                style: 'thin', color: { argb: '07705F' }
            },
            right: {
                style: 'thin', color: { argb: '07705F' }
            },
            bottom: {
                style: 'thin', color: { argb: '07705F' }
            },
            left: {
                style: 'thin', color: { argb: '07705F' }
            },
        };

        // Alineacion
        if ([1, 8, 9].includes(i)) {
            cell.alignment = { vertical: 'middle', horizontal: 'left' };
        } else {
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }

        // Tamaño y tipo de letra
        cell.font = {
            bold: true,
            size: 9,
            name: 'Arial'
        }

        if (i == 10) {
            cell.numFmt = '[HH]:MM:SS'
        }

        // Color de fondo
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D2D2D2' },
        };

    }

});

/**
 * Creación del Archivo
 */
wb.xlsx
    .writeFile('./outputs/reporte-individual.xlsx')
    .then(function () {
        console.log('file created');
    })
    .catch(function (err) {
        console.log(err.message);
    });
