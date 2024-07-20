const mongoose = require('mongoose')

var accountSchema=new mongoose.Schema({

    ExpenseId:{type:Number},
    ExpenseDate:{type:String},
    ExpenseByUserName:{type:String},
    ExpenseFor:{type:String},
    ExpenseAmount:{type:Number}
})
    
const Expense = mongoose.model('Expense',accountSchema)
module.exports=Expense