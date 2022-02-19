const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    domain : {
        type : String,
    },
    region : {
        type : String,
    },
    language: {
        type: String,
    },
}, {
    collection: 'workspace'
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

exports.Workspace = Workspace;