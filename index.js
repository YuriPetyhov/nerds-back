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

app.post('', (req, res) => {
    const card = new Product({...req.body});
    card.save()
        .then(item => {
            console.log({item});
            res.send(item)
        })
        .catch(err => console.log({err}))

});
app.get('/', (req, res) => {
    Product.find({}, (err, items) => {
        res.send(items)
    })
});
// will find all items
app.get('/catalog', (req, res) => {

    Product.find({}, (err, items) => {
        res.send(items)
    })
});

app.get("catalog/:type", (req, res) => {
     Product.find({...req.params}, (err, item) => {
        if (err) {
            res.send("Smth went wrong");
            return
        };
        if(!item) {
            res.send("Sorry product is empty ")
            return
        }
         res.send(item)
     } )
});
app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb+srv://nerds:132445@cluster0-enzzy.mongodb.net/test?retryWrites=true&w=majority',)
    .then(client => console.log('DATABASE CONNECTED'))

    .catch(err => console.log(err));
