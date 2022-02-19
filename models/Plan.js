const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    first_name : {
        type : String,
    },
    last_name : {
        type : String,
    },
    country: {
        type: String,
    },
    city : {
        type : String,
    },
    zip_code: {
        type: String,
    },
    email: {
        type: String,
    }
}, {
    collection: 'plan'
});

const Plan = mongoose.model('Plan', PlanSchema);

exports.Plan = Plan;