const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.newOrder = catchAsyncErrors(async(req,res,next)=> {
  const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,
  });
  res.status(201).json({
    success:true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=> {
  const order = await Order.findById(req.params.id).populate("user","name email");//extracting name and email from user field//in order.model in user -->it is refrenced//see on chatgpt populate() in mongodb using js// populate() method is used to replace a specified path in the document with documents from other collections. This is especially useful for referencing documents in different collections, thus avoiding manual JOIN operations
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id",404));
  }
  res.status(200).json({
    success:true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async(req,res,next)=> {
  const orders = await Order.find({user:req.user._id});
  res.status(200).json({
    success:true,
    orders,
  });
});

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=> {
  const orders = await Order.find();
  let totalAmount=0;
  orders.forEach((order)=> {
    totalAmount+=order.totalPrice;
  });
  res.status(200).json({
    success:true,
    totalAmount,
    orders,
  });
});

exports.updateOrder = catchAsyncErrors(async(req,res,next)=> {
  const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
    
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
    
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
});


async function updateStock(id,quantity) {
  const product = await Product.findById(id);
  product.stock-=quantity;
  await product.save({validateBeforeSave:false});
}



exports.deleteOrder = catchAsyncErrors(async(req,res,next)=> {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id",404));
  }
  await Order.deleteOne({_id:req.params.id});
  res.status(200).json({
    success:true,
  });
});

