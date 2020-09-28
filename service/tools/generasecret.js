const speakeasy = require('speakeasy');
const path = require('path');
const fs = require('fs');

class ToolsGenerateSecret {
    constructor() {
        this.nameFile = 'secret';
        this.pathSecret = path.resolve(__dirname, '../files');
    }

    generateSecret() {
        let secret = speakeasy.generateSecret({ length: 20 });

        fs.writeFileSync(`${this.pathSecret}/${this.nameFile}.json`, JSON.stringify(secret));
    }
    getSecret() {
        let file = path.resolve(this.pathSecret, `${this.nameFile}.json`);
        if (fs.existsSync(file)) {
            return require(file);
        } else {
            throw new Error(`Doesn't existed secret, you required a secret.`)
        }
    }
}

module.exports = ToolsGenerateSecret;