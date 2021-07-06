const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  console.log(req.files);

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};

exports.getProductBySlug = (req, res) =>{
  const { slug } = req.params;
  Category.findOne({ slug: slug })
  .select('_id')
  .exec((error, category) =>{
    if(error){
      return res.status(400).json({error})
    }
    if(category){
      Product.find( { category: category._id })
      .exec((error, products) =>{
        if(error){
          return res.status(400).json({error})
        }
        if(products.length > 0){
          res.status(200).json({
            products,
            productByPrice:{
              under5k: products.filter(product => product.price <=5000),
              under10k: products.filter(product => product.price >5000 && product.price <=10000),
              under15k: products.filter(product => product.price >10000 && product.price <=15000),
              under20k: products.filter(product => product.price >15000 && product.price <=20000),
              under30k: products.filter(product => product.price >20000 && product.price <=30000),
            }
          })
        }
      })
    }
  })
}

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};