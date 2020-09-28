const path = require('path');
const fs = require('fs');

const CreateFolderBase = () => {
    ['input', 'output', 'tokens'].map(folder => {
        let pathFolderSeed = path.join(__dirname, `../../${folder}`);
        if (!fs.existsSync(pathFolderSeed)) {
            fs.mkdirSync(pathFolderSeed);
        }
    });
}

module.exports = {
    CreateFolderBase
}