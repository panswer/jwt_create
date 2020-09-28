const path = require('path');
const fs = require('fs');

const File = require('../models/files');

const CreateARegister = async(config = {}, filesNameInput = [], JWT = {}) => {
    try {
        for (let i = 0; i < filesNameInput.length; i++) {
            let nameFile = filesNameInput[i];

            let info = path.parse(nameFile);
            let data;
            let pathFile = path.resolve(`${config.pathInput}/${nameFile}`);

            if (!fs.existsSync(pathFile)) {
                throw new Error(`El archivo ${nameFile} no existe en la carpeta ${config.pathInput}`);
            }

            if (/.json/ig.test(info.ext)) {
                data = require(pathFile);
            } else {
                let file = fs.readFileSync(pathFile, { encoding: 'base64' });
                data = {
                    info,
                    file
                }
            }

            let token = JWT.getTokenWithSecret(data);

            let [head, body, footer] = token.split('.');
            let newRegister = await new File({
                head,
                body,
                footer
            }).save();
            console.log(newRegister);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = CreateARegister;