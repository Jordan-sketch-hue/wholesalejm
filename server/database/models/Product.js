import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  barcode: String,
  description: String,
  longDescription: String,
  category: {
    type: String,
    required: true,
    index: true
  },
  subcategory: String,
  price: {
    type: Number,
    required: true
  },
  bulkPricing: [{
    minQuantity: Number,
    price: Number
  }],
  wholesalePrice: Number,
  image: String,
  images: [String],
  video: String,
  stock: {
    type: Number,
    default: 0
  },
  minOrderQuantity: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    enum: ['piece', 'pack', 'box', 'case', 'kg', 'lbs', 'liter'],
    default: 'piece'
  },
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
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

const Product = mongoose.model('Product', productSchema);

export default Product;
