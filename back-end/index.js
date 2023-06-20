const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/Users");
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "e-comm";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if(err){
      res,send({result:"Something Went Wrong,Please Try After Some time"});
    }
    res.send({result,auth:token});
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {

      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if(err){
          res,send({result:"Something Went Wrong,Please Try After Some time"});
        }
        res.send({user,auth:token});
      });
      
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

//my side from line 49-
// app.get("/profile/:id", async (req, res) => {
//   const result = await User.findOne({ _id: req.params.id });
//   res.send(result);

// });

app.post("/add-product", verifyToken,async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken,async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id", verifyToken,async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken,async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});


function verifyToken (req,res,next){
  let token=req.headers['authorization'];

  if(token){
    token=token.split(' ')[1];
    console.warn("middleware Called",token);

    jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"Please Provide Valid Token"})

      }else{
          next();
      };

    });
  }
  else{
      res.status(403).send({result:"Please Add Token With Header"})
  }
 
}

app.listen(5000);
