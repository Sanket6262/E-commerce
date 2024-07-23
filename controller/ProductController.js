const Products = require("../models/productModel.js");

async function addProduct (req, res) {
 console. log("req.body getProduct**", req.body);

try {
const newProduct = new Products(req.body);

const result = await newProduct.save();
res.status(200).send({ message:"product added successfully",task: result });
} catch (error) {
  res.status(500).send(error);
}
}

async function getAllProducts(req,res) {
console.log("*------*")
try {
result = await Products.find({},{__v:0});
console.log(result);
res.status (200). send(result);

}catch(error){
    res.status(500).send(error);
}
}

async function Getwithquery(req,res){
    console.log(req.query);

    Category = req.query.CATEGORY,
    Price = req.query.price

    try{
        result = await Products.find({category:Category,price:Price})

        res.status(200).send(result);
    }catch (error){
        res.status(500).send(error);
    }
}
// function for delete
async function deleteProducts(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
   
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(400).send({message:"Product Not Found"});
        }
        res.send({task:product,message:"Product Delete"})
    } catch (error) {
        res.status(500).send(error);
    }
}
//function for update
async function updateProducts(req, res) {
    console.log("updateProduct req.param.id",req.params.id);
    console.log("updateProduct req.body",req.body);


    try{
        const product = await Products.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        });
        if (!product){
            res.status(400).send({message:"product no found"});
        }
        res.status(200).send({message: "product updated", task: product});
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports ={
    getAllProducts,
    addProduct,
    Getwithquery,
    deleteProducts,
    updateProducts
};