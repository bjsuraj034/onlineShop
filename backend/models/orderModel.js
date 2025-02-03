import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  address: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'RAZORS'],
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, required: true, default: 1, min: 1 },
      name: String,
      price: Number,
      image: String,
      size: { type: Array },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending', // Default status
  },
  totalAmount: { type: Number, required: true }, // Store delivery charge separately
  paymentStatus: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
});

const orderModel=mongoose.model.orders ||mongoose.model("order",orderSchema)
export default orderModel
