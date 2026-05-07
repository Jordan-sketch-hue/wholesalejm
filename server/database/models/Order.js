import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: Number,
    price: Number,
    bulkDiscount: Number
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  discount: Number,
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'packed', 'dispatched', 'in-transit', 'delivered', 'cancelled'],
    default: 'pending',
    index: true
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    parish: String,
    postalCode: String
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  trackingNumber: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
