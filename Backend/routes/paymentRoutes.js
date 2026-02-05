const express=require("express");
const Router=express.Router();
const {createPaymentIntent,paymentConfirm}=require("../controller/payment_controller")

Router.post("/create-payment-intent",createPaymentIntent);
Router.post("/create-payment-confirm",paymentConfirm);
module.exports=Router;