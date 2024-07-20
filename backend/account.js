const mongoose = require('mongoose')

var accountSchema=new mongoose.Schema({
    Username:{type:String},
    Password:{type:String},
    FullName:{type:String},
    Contact:{type:Number}
})

const AccountLogin = mongoose.model('AccountLogin',accountSchema)
module.exports=AccountLogin