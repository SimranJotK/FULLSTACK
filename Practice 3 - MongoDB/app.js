const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});


app.post('/products', async (req, res) => {
    const { name, price, category, variants } = req.body;
    const product = new Product({ name, price, category, variants: JSON.parse(variants) });
    await product.save();
    res.redirect('/');
});


app.get('/products/category/:category', async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});


app.get('/products/:id/variants', async (req, res) => {
    const product = await Product.findById(req.params.id, { variants: 1, _id: 0 });
    res.json(product);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
