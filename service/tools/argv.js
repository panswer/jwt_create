const path = require('path');

class Params {
    static getParams() {
        let fileExec = path.parse(__filename);

        let argv = process.argv.filter(item => ![
            process.execPath,
            path.join(__dirname, `/${fileExec.name}`),
            path.join(__dirname, `/${fileExec.base}`)
        ].includes(item));

        return argv;
    }
}

module.exports = Params;