require ("dotenv").config();
const express = require ("express");
const mongoose = require ("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB")
.then(()=>console.log("Connected to mongoDB"))
.catch(err=>console.log("Could not connect",err));
const port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send(`server is running on port${port}`);
});


app.post("/api/products",async(req,res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({error:err.message});
    }
});
app.get("/api/products",async(req,res)=>{
    try{
        const products = await Product.find(req.query);
        res.json(products);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});
app.listen(port,()=>{
    console.log(`server is running on port${port}`);
});