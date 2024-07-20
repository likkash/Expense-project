require("./db")
const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const account = require('./account')
const expense = require('./expense')




const exp = express()
exp.use(cors())
exp.use(parser.urlencoded({extended:true}))
exp.use(parser.json())



exp.post('/signup', async (req, res) => {
    try {
      const newAccount = new account(req.body);
      await newAccount.save();
      res.json({
        message: `${newAccount.Username} has opened an account`,
        user: newAccount // Send the created user data in the response
      });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'An error occurred while signing up. Please try again.' });
    }
  });


exp.post('/login', async (request, response) => {
    const user = request.body.Username;
    const pass = request.body.Password;
    const t = await account.findOne({'$and': [{"Username": {'$eq':user}}, {"Password": {'$eq':pass}}]});
    if (t) {
        const m = await expense.find({"ExpenseByUserName": {"$eq": t.Username}});
        const res = {
            "user": t,
            "expense": m
        };
        response.json(res);
    } else {
        response.json({message: "Invalid Username or Password"});
    }
});

    
exp.post('/exp/new',async(request,response)=>{
    const ben = new expense(request.body)
    await ben.save()
    response.json(ben)
})


exp.put('/exp/update/:id', async (request, response) => {
    const expenseId = request.params.id;
    const updatedExpense = request.body;

    try {
        const result = await expense.findByIdAndUpdate(expenseId, updatedExpense, { new: true });
        if (result) {
            response.json(result);
        } else {
            response.status(404).json({ message: "Expense not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Error updating expense", error: error.message });
    }
});

exp.delete('/exp/delete/:id/:Username', async (request, response) => {
    const { id, Username } = request.params;

    try {
        const result = await expense.findOneAndDelete({ _id: id, ExpenseByUserName: Username });
        if (result) {
            response.json({ message: "Expense deleted successfully" });
        } else {
            response.status(404).json({ message: "Expense not found or not authorized to delete" });
        }
    } catch (error) {
        response.status(500).json({ message: "Error deleting expense", error: error.message });
    }
});



exp.get('/',async(request,response)=>{
    const tracks = await account.find()
    response.json(tracks)  
})

exp.get('/date/:given',async(request,response)=>{
    const found = await expense.find({"ExpenseDate":{'$eq':request.params.given}})
    response.json(found)
})

exp.put('/upd', async (request, response) => {
    const { _id, ...updatedExpense } = request.body; // Destructure to extract _id and remaining fields
    try {
        const data = await expense.findByIdAndUpdate(_id, updatedExpense, { new: true }); // Use new: true to return the updated document
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Expense not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Error updating expense", error: error.message });
    }
});

exp.get('/:id',async(request,response)=>{
    const consignment = await expense.findById(id=request.params.id)
    response.json(consignment)
})
exp.get('/exp/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const date = req.query.date; // Get the date query parameter
      const user = await account.findById(userId);
      if (user) {
        const query = { ExpenseByUserName: user.Username };
        if (date) {
          query.ExpenseDate = date; // Add date filter if provided
        }
        const expenses = await expense.find(query);
        res.json(expenses);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
exp.delete('/erase/:id',async(request,response)=>{
    const data = await expense.findOneAndDelete({_id:{'$eq':request.params.id}})
    response.json(data)
})


exp.listen(1234,()=>{
    console.log("Backend connected!!!")
})