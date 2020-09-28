const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
    head: {
        type: String,
        required: [true, 'Head is required']
    },
    body: {
        type: String,
        required: [true, 'body is required']
    },
    footer: {
        type: String,
        required: [true, 'footer is required']
    }
}, {
    timestamps: true
});

module.exports = model('file', FileSchema);