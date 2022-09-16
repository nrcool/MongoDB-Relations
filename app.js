const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const UserModel = require("./modal/userSchema.js");
const ProductModel = require("./modal/productSchema.js");
const OrderModel = require("./modal/orderSchema.js");

mongoose.connect("mongodb://127.0.0.1:27017/test-database", () => {
  console.log("connected to DB");
});

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await UserModel.find().populate("orders")
  /* const users = await UserModel.find().populate({
    path: "orders",
    populate: [
      {
        path: "products",
        model: "products",
      },
      { path: "userId", model: "users" },
    ],
  }); */
  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send(user);
});

app.get("/orders", async (req, res) => {
  const orders = await OrderModel.find()
    .populate("userId")
    .populate("products", "-description -_id");
  res.send(orders);
});

app.post("/orders", async (req, res) => {
  const order = new OrderModel(req.body);
  await order.save();
  const user = await UserModel.findById(req.body.userId);
  user.orders.push(order._id);
  await user.save();
  res.send(order);
});

app.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.send(products);
});

app.post("/products", async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.send(product);
});

app.listen(PORT, () => console.log("server is running on port:", PORT));
