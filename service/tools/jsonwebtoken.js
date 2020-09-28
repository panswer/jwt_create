const jwt = require('jsonwebtoken');

class ToolsJsonWebToken {
    constructor(secret = '') {
        if (!secret) {
            throw new Error('ToolsJsonWebToken require a secret.');
        }
        this.secret = secret;
    }

    getTokenWithSecret(data = {}) {
        let info = {
            data,
            createdAt: new Date()
        };
        let token = jwt.sign(info, this.secret);

        return token;
    }

    getDecodeToken(token = '' || []) {
        let info = token instanceof Array ? token.join('.') : token;

        return jwt.verify(info, this.secret);
    }

    setSecret(secret = '') {
        this.secret = secret;
    }
}

module.exports = ToolsJsonWebToken;