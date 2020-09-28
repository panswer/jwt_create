// Dependencias
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Clases de trabajo
const ToolsGenerateSecret = require('./tools/generasecret');
const ToolsJsonWebToken = require('./tools/jsonwebtoken');
const ToolsConnectDB = require('./tools/connectdb');

// Funciones de ayuda
const Help = require('./help/help');

// Modelos
const File = require('./models/files');

// const CreateARegister = require('./controllers/createRegisters');

// Funcion principal
const init = async() => {
    /* 
        Estructura basica en inicio despes de clonar con git (folders de trabajo)
    */
    let { CreateFolderBase } = require('./help/generateBase');
    CreateFolderBase();

    /* 
        Obtencion de variables de entorno
    */
    // ruta de variables de entonrno
    let pathENV = path.resolve(__dirname, '../.env');
    if (fs.existsSync(pathENV)) {
        // Se cargan variables de entorno
        dotenv.config({
            path: pathENV
        });
    }

    /* 
        Rutas basicas de archivos a convertir en JSON Web Token (JWT)
    */
    let config = {
        // Ruta de entrada
        pathInput: path.resolve(__dirname, '../input/'),
        // Ruta de salida
        pathOutput: path.resolve(__dirname, '../output/')
    }

    for (let key in config) {
        // Validacion de si son validas las rutas
        if (!fs.existsSync(config[key])) {
            throw new Error(`Error in path: ${config[key]}`);
        }
    }

    let fileExec = path.parse(__filename);
    let argv = process.argv.filter(item => ![
        process.execPath,
        path.join(__dirname, `/${fileExec.base}`),
        path.join(__dirname, `/${fileExec.name}`)
    ].includes(item));
    let action = argv[0];
    let params = argv.slice(1);

    /* 
        Configuracion de base de datos al cual se va a conectar
    */
    let database = new ToolsConnectDB(process.env.DATA_BASE_URL);

    try {
        // Coneccion a base de datos
        await database.connect();
    } catch (err) {
        console.log(err);
    }

    // Secretos para token
    let mySecret = new ToolsGenerateSecret();

    let JWT = new ToolsJsonWebToken(mySecret.getSecret().base32);

    if (process.env.SECRET) {
        JWT.setSecret(process.env.SECRET);
    }

    let nameFiles = [];

    switch (action) {
        case 'encrypt':
            params.map(item => {
                let options = item.split('=');

                switch (options[0]) {
                    case 'file':
                        nameFiles = options.pop().split(',');
                        break;
                    case 'secret':
                        JWT.setSecret(options.pop());
                        break;
                }
            }).filter(item => item != undefined);

            if (params.length === 0) {
                nameFiles = nameFiles.concat(fs.readdirSync(config.pathInput));
            }

            await CreateARegister(config, nameFiles, JWT);
            break;
        default:
            console.log(`#`.repeat(50));
            console.log(`Accion no reconocida: `);
            Help.getHelpGeneric();
    }

    // Desconeccion a base de datos
    await database.disconnect();
}

init();