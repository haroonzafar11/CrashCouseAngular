const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    username: {type: String, required: true, unique: true,immutable: true,index:true},
    password:{type:String, required: true},
    available: {type : Boolean, default: true},
    firstName:{type:String, required: true},
    lastName:{type:String, required: true},
});
usersSchema.plugin(require('mongoose-immutable-plugin'));
module.exports = mongoose.model('Users', usersSchema);