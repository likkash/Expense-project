const { default: mongoose } = require('mongoose')
const uri = "mongodb+srv://Likkash:AishwaryaLikkash@cluster0.9qjid0n.mongodb.net/ExpensesTracker?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions)
