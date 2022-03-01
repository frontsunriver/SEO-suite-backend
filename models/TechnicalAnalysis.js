const mongoose = require('mongoose');

const TechnicalAnalysisSchema = new mongoose.Schema({
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
    collection: 'technical'
});

const TechnicalAnalysis = mongoose.model('TechnicalAnalysis', TechnicalAnalysisSchema);

exports.TechnicalAnalysis = TechnicalAnalysis;