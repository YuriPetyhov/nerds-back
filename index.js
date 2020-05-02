const expess = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const port = process.env.PORT || 3000;

const ProductSchema = new Schema({
    img: String,
    type: String,
    title: String,
    description: String,
    cost: Number
});
const Product = mongoose.model("product", ProductSchema);
const app =  expess();
app.use(cors());
app.use(bodyParser.json());

// will find all items
app.get('/catalog', (req, res) => {
    Product.find({}, (err, items) => {
        res.send(items)
    })
});
app.get('/catalog/:type', (req, res) => {
    Product.findOne({type: req.params.type}, (err, item) => {
        if(err) {
            console.log('smth went wrong');
            return
        }
        res.send(item)
    })
});
app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));
mongoose.connect( 'mongodb+srv://nerds:132445@cluster0-enzzy.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => console.log('DATABASE CONNECTED'))

    .catch(err => console.log(err));
