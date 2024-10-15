const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    groupNumber: { type: String, required: true }
});
module.exports = mongoose.model('Student', StudentSchema);
