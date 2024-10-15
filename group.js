const mongoose = require('mongoose');
const GroupSchema = mongoose.Schema({
    name: { type: String, required: true }
});
module.exports = mongoose.model('Group', GroupSchema);
