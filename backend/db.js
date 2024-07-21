const { default: mongoose } = require('mongoose')
const uri = "mongodb+srv://dbname: password@cluster0.9qjid0n.mongodb.net/collection_name?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions)
