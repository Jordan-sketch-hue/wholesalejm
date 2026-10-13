/**
 * Seed script for Wholesale Jamaica platform
 * Run: node server/database/seed.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

// ── Models ──────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  phone: String,
  businessName: String,
  businessType: String,
  addresses: [{ street: String, city: String, parish: String, postalCode: String, isDefault: Boolean }],
  loyaltyPoints: { type: Number, default: 0 },
  loyaltyTier: { type: String, default: 'bronze' },
  verificationStatus: { type: String, default: 'pending' },
  role: { type: String, enum: ['buyer', 'supplier', 'admin'], default: 'buyer' }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: String,
  sku: { type: String, unique: true },
  description: String,
  category: String,
  subcategory: String,
  price: Number,
  wholesalePrice: Number,
  bulkPricing: [{ minQuantity: Number, price: Number }],
  stock: { type: Number, default: 0 },
  minOrderQuantity: { type: Number, default: 1 },
  unit: { type: String, default: 'case' },
  weight: Number,
  tags: [String],
  supplierId: mongoose.Schema.Types.ObjectId,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    quantity: Number,
    price: Number,
    bulkDiscount: Number
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  discount: Number,
  total: Number,
  status: { type: String, default: 'pending' },
  paymentMethod: String,
  paymentStatus: { type: String, default: 'pending' },
  deliveryAddress: { street: String, city: String, parish: String, postalCode: String },
  estimatedDelivery: Date,
  trackingNumber: String,
  notes: String
}, { timestamps: true });

const inventoryTxSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  type: { type: String, enum: ['restock', 'sale', 'adjustment', 'return'] },
  quantity: Number,
  previousStock: Number,
  newStock: Number,
  reference: String,
  note: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
const InventoryTransaction = mongoose.models.InventoryTransaction || mongoose.model('InventoryTransaction', inventoryTxSchema);

// ── Seed data ────────────────────────────────────────────────────────────────

const SUPPLIERS = [
  {
    firstName: 'Marcus',
    lastName: 'Campbell',
    email: 'marcus.campbell@gracefoods.jm',
    password: 'Supplier@123',
    phone: '+1-876-555-0101',
    businessName: 'Grace Foods Wholesale',
    businessType: 'wholesale',
    role: 'supplier',
    loyaltyTier: 'gold',
    verificationStatus: 'verified',
    addresses: [{
      street: '64 Spanish Town Road',
      city: 'Kingston',
      parish: 'Kingston',
      postalCode: 'KGN 14',
      isDefault: true
    }]
  },
  {
    firstName: 'Yvonne',
    lastName: 'Brown',
    email: 'yvonne.brown@caribbeansupply.jm',
    password: 'Supplier@456',
    phone: '+1-876-555-0202',
    businessName: 'Caribbean Supply Co.',
    businessType: 'wholesale',
    role: 'supplier',
    loyaltyTier: 'silver',
    verificationStatus: 'verified',
    addresses: [{
      street: '15 Constant Spring Road',
      city: 'Kingston',
      parish: 'St. Andrew',
      postalCode: 'KGN 10',
      isDefault: true
    }]
  },
  {
    firstName: 'Devon',
    lastName: 'Reid',
    email: 'devon.reid@montegobayfoods.jm',
    password: 'Supplier@789',
    phone: '+1-876-555-0303',
    businessName: 'Montego Bay Foods Ltd.',
    businessType: 'wholesale',
    role: 'supplier',
    loyaltyTier: 'bronze',
    verificationStatus: 'verified',
    addresses: [{
      street: '32 Howard Cooke Blvd',
      city: 'Montego Bay',
      parish: 'St. James',
      postalCode: 'MBYY 01',
      isDefault: true
    }]
  }
];

const BUYERS = [
  {
    firstName: 'Sandra',
    lastName: 'Williams',
    email: 'sandra.williams@sandrashop.jm',
    password: 'Buyer@123',
    phone: '+1-876-555-1001',
    businessName: "Sandra's Minimart",
    businessType: 'minimart',
    role: 'buyer',
    loyaltyTier: 'silver',
    loyaltyPoints: 1250,
    verificationStatus: 'verified',
    addresses: [{
      street: '7 Half Way Tree Road',
      city: 'Kingston',
      parish: 'St. Andrew',
      postalCode: 'KGN 10',
      isDefault: true
    }]
  },
  {
    firstName: 'Errol',
    lastName: 'Thompson',
    email: 'errol.thompson@tgifoods.jm',
    password: 'Buyer@456',
    phone: '+1-876-555-1002',
    businessName: 'TGI Foods & Beverages',
    businessType: 'restaurant',
    role: 'buyer',
    loyaltyTier: 'gold',
    loyaltyPoints: 4300,
    verificationStatus: 'verified',
    addresses: [{
      street: '23 New Kingston Drive',
      city: 'Kingston',
      parish: 'Kingston',
      postalCode: 'KGN 5',
      isDefault: true
    }]
  },
  {
    firstName: 'Claudette',
    lastName: 'Morrison',
    email: 'claudette.morrison@cmsupermarket.jm',
    password: 'Buyer@789',
    phone: '+1-876-555-1003',
    businessName: 'CM Supermarket',
    businessType: 'supermarket',
    role: 'buyer',
    loyaltyTier: 'platinum',
    loyaltyPoints: 9800,
    verificationStatus: 'verified',
    addresses: [{
      street: '5 Main Street',
      city: 'Mandeville',
      parish: 'Manchester',
      postalCode: 'MAN 01',
      isDefault: true
    }]
  }
];

// Products seeded with realistic Jamaican wholesale goods
function buildProducts(supplierIds) {
  const [s1, s2, s3] = supplierIds;
  return [
    {
      name: 'Grace Long Grain White Rice (25 kg bag)',
      sku: 'GRC-RICE-25KG',
      description: 'Premium long grain white rice, 25 kg polypropylene sack. Sourced from South America, cleaned and processed in Jamaica.',
      category: 'Staples',
      subcategory: 'Rice',
      price: 4500,
      wholesalePrice: 3800,
      bulkPricing: [
        { minQuantity: 5, price: 3600 },
        { minQuantity: 10, price: 3400 }
      ],
      stock: 500,
      minOrderQuantity: 2,
      unit: 'case',
      weight: 25,
      tags: ['rice', 'staple', 'bulk', 'grace'],
      supplierId: s1,
      isActive: true
    },
    {
      name: 'Robin Hood All-Purpose Flour (50 lbs)',
      sku: 'RBH-FLOUR-50LBS',
      description: 'Enriched bleached all-purpose flour, 50 lbs bag. Ideal for bakeries, restaurants, and wholesale buyers.',
      category: 'Staples',
      subcategory: 'Flour',
      price: 3200,
      wholesalePrice: 2700,
      bulkPricing: [
        { minQuantity: 4, price: 2500 },
        { minQuantity: 8, price: 2300 }
      ],
      stock: 320,
      minOrderQuantity: 2,
      unit: 'case',
      weight: 22.7,
      tags: ['flour', 'baking', 'staple', 'wholesale'],
      supplierId: s2,
      isActive: true
    },
    {
      name: "Lasco Vegetable Cooking Oil (4L × 6)",
      sku: 'LASCO-OIL-4L6PK',
      description: "Case of 6 × 4-litre bottles of Lasco vegetable cooking oil. Refined and cholesterol-free.",
      category: 'Oils & Condiments',
      subcategory: 'Cooking Oil',
      price: 5800,
      wholesalePrice: 5000,
      bulkPricing: [
        { minQuantity: 3, price: 4750 },
        { minQuantity: 6, price: 4500 }
      ],
      stock: 180,
      minOrderQuantity: 1,
      unit: 'case',
      weight: 24,
      tags: ['oil', 'cooking', 'lasco', 'wholesale'],
      supplierId: s1,
      isActive: true
    },
    {
      name: 'Grace Mackerel in Tomato Sauce (155g × 48)',
      sku: 'GRC-MACK-TOM-48',
      description: 'Case of 48 cans of Grace mackerel in tomato sauce, 155 g per can. A Jamaican household staple.',
      category: 'Canned Goods',
      subcategory: 'Canned Fish',
      price: 7200,
      wholesalePrice: 6200,
      bulkPricing: [
        { minQuantity: 2, price: 5900 },
        { minQuantity: 5, price: 5600 }
      ],
      stock: 240,
      minOrderQuantity: 1,
      unit: 'case',
      weight: 8,
      tags: ['canned', 'mackerel', 'grace', 'protein', 'staple'],
      supplierId: s1,
      isActive: true
    },
    {
      name: 'Bigga Cream Soda 2L Bottles (12-pack)',
      sku: 'BIGGA-CREAM-2L-12',
      description: 'Case of 12 × 2-litre Bigga cream soda. A beloved Jamaican soft drink, perfect for retail.',
      category: 'Beverages',
      subcategory: 'Soft Drinks',
      price: 3600,
      wholesalePrice: 3000,
      bulkPricing: [
        { minQuantity: 5, price: 2800 },
        { minQuantity: 10, price: 2650 }
      ],
      stock: 420,
      minOrderQuantity: 2,
      unit: 'case',
      weight: 26,
      tags: ['beverage', 'soda', 'bigga', 'drinks', 'wholesale'],
      supplierId: s3,
      isActive: true
    }
  ];
}

function buildOrders(buyerIds, products) {
  const [b1, b2, b3] = buyerIds;
  const now = new Date();

  const daysAgo = (n) => new Date(now - n * 86400000);
  const daysFromNow = (n) => new Date(now.getTime() + n * 86400000);

  return [
    {
      orderNumber: 'ORD-2026001',
      userId: b1,
      items: [
        { productId: products[0]._id, name: products[0].name, quantity: 4, price: 3800, bulkDiscount: 0 },
        { productId: products[2]._id, name: products[2].name, quantity: 2, price: 5000, bulkDiscount: 0 }
      ],
      subtotal: 25200,
      discount: 2520,
      tax: 3402,
      shippingCost: 0,
      total: 26082,
      status: 'delivered',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'completed',
      trackingNumber: 'TRK-2026001',
      deliveryAddress: { street: '7 Half Way Tree Road', city: 'Kingston', parish: 'St. Andrew', postalCode: 'KGN 10' },
      estimatedDelivery: daysAgo(5),
      createdAt: daysAgo(10)
    },
    {
      orderNumber: 'ORD-2026002',
      userId: b2,
      items: [
        { productId: products[3]._id, name: products[3].name, quantity: 3, price: 6200, bulkDiscount: 0 },
        { productId: products[4]._id, name: products[4].name, quantity: 5, price: 2800, bulkDiscount: 200 }
      ],
      subtotal: 32600,
      discount: 3260,
      tax: 4401,
      shippingCost: 0,
      total: 33741,
      status: 'in-transit',
      paymentMethod: 'lynk',
      paymentStatus: 'completed',
      trackingNumber: 'TRK-2026002',
      deliveryAddress: { street: '23 New Kingston Drive', city: 'Kingston', parish: 'Kingston', postalCode: 'KGN 5' },
      estimatedDelivery: daysFromNow(1),
      createdAt: daysAgo(3)
    },
    {
      orderNumber: 'ORD-2026003',
      userId: b3,
      items: [
        { productId: products[0]._id, name: products[0].name, quantity: 10, price: 3400, bulkDiscount: 400 },
        { productId: products[1]._id, name: products[1].name, quantity: 8, price: 2300, bulkDiscount: 400 },
        { productId: products[2]._id, name: products[2].name, quantity: 6, price: 4500, bulkDiscount: 500 }
      ],
      subtotal: 79400,
      discount: 7940,
      tax: 10719,
      shippingCost: 0,
      total: 82179,
      status: 'processing',
      paymentMethod: 'ncb',
      paymentStatus: 'completed',
      trackingNumber: 'TRK-2026003',
      deliveryAddress: { street: '5 Main Street', city: 'Mandeville', parish: 'Manchester', postalCode: 'MAN 01' },
      estimatedDelivery: daysFromNow(3),
      createdAt: daysAgo(1)
    },
    {
      orderNumber: 'ORD-2026004',
      userId: b1,
      items: [
        { productId: products[1]._id, name: products[1].name, quantity: 2, price: 2700, bulkDiscount: 0 }
      ],
      subtotal: 5400,
      discount: 0,
      tax: 810,
      shippingCost: 500,
      total: 6710,
      status: 'pending',
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pending',
      trackingNumber: null,
      deliveryAddress: { street: '7 Half Way Tree Road', city: 'Kingston', parish: 'St. Andrew', postalCode: 'KGN 10' },
      estimatedDelivery: daysFromNow(2),
      createdAt: now
    },
    {
      orderNumber: 'ORD-2026005',
      userId: b2,
      items: [
        { productId: products[4]._id, name: products[4].name, quantity: 10, price: 2650, bulkDiscount: 350 }
      ],
      subtotal: 26500,
      discount: 2650,
      tax: 3577.5,
      shippingCost: 0,
      total: 27427.5,
      status: 'cancelled',
      paymentMethod: 'stripe',
      paymentStatus: 'refunded',
      trackingNumber: null,
      deliveryAddress: { street: '23 New Kingston Drive', city: 'Kingston', parish: 'Kingston', postalCode: 'KGN 5' },
      estimatedDelivery: daysAgo(2),
      notes: 'Customer requested cancellation — out of stock at location',
      createdAt: daysAgo(7)
    }
  ];
}

function buildInventoryTransactions(products, orders) {
  const now = new Date();
  const daysAgo = (n) => new Date(now - n * 86400000);

  return [
    // Restock events
    { productId: products[0]._id, type: 'restock', quantity: 200, previousStock: 300, newStock: 500, reference: 'PO-GRC-001', note: 'Grace Foods restock — main warehouse' },
    { productId: products[1]._id, type: 'restock', quantity: 120, previousStock: 200, newStock: 320, reference: 'PO-RBH-002', note: 'Robin Hood flour delivery' },
    { productId: products[2]._id, type: 'restock', quantity: 80, previousStock: 100, newStock: 180, reference: 'PO-LASCO-003', note: 'Lasco oil restock' },
    { productId: products[3]._id, type: 'restock', quantity: 100, previousStock: 140, newStock: 240, reference: 'PO-GRC-004', note: 'Grace mackerel restock' },
    { productId: products[4]._id, type: 'restock', quantity: 200, previousStock: 220, newStock: 420, reference: 'PO-BIGGA-005', note: 'Bigga cream soda delivery' },
    // Sale deductions from seeded orders
    { productId: products[0]._id, type: 'sale', quantity: -4, previousStock: 504, newStock: 500, reference: orders[0].orderNumber, note: 'Sale — ORD-2026001' },
    { productId: products[2]._id, type: 'sale', quantity: -2, previousStock: 182, newStock: 180, reference: orders[0].orderNumber, note: 'Sale — ORD-2026001' },
    { productId: products[3]._id, type: 'sale', quantity: -3, previousStock: 243, newStock: 240, reference: orders[1].orderNumber, note: 'Sale — ORD-2026002' },
    { productId: products[4]._id, type: 'sale', quantity: -5, previousStock: 425, newStock: 420, reference: orders[1].orderNumber, note: 'Sale — ORD-2026002' },
    // Manual adjustment
    { productId: products[1]._id, type: 'adjustment', quantity: -2, previousStock: 322, newStock: 320, reference: 'ADJ-001', note: 'Damaged stock removed after quality check' }
  ];
}

// ── Runner ───────────────────────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Copy .env.example to .env and fill in your connection string.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected.');

  // Clear existing data
  console.log('Clearing existing seed collections...');
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    InventoryTransaction.deleteMany({})
  ]);

  // Create suppliers
  console.log('Creating suppliers...');
  const supplierDocs = [];
  for (const s of SUPPLIERS) {
    const hashed = await bcrypt.hash(s.password, 10);
    const doc = await User.create({ ...s, password: hashed });
    supplierDocs.push(doc);
  }
  console.log(`  ${supplierDocs.length} suppliers created`);

  // Create buyers
  console.log('Creating buyers...');
  const buyerDocs = [];
  for (const b of BUYERS) {
    const hashed = await bcrypt.hash(b.password, 10);
    const doc = await User.create({ ...b, password: hashed });
    buyerDocs.push(doc);
  }
  console.log(`  ${buyerDocs.length} buyers created`);

  // Create products
  console.log('Creating products...');
  const productData = buildProducts(supplierDocs.map(s => s._id));
  const productDocs = await Product.insertMany(productData);
  console.log(`  ${productDocs.length} products created`);

  // Create orders
  console.log('Creating purchase orders...');
  const orderData = buildOrders(buyerDocs.map(b => b._id), productDocs);
  const orderDocs = await Order.insertMany(orderData);
  console.log(`  ${orderDocs.length} orders created`);

  // Create inventory transactions
  console.log('Creating inventory transactions...');
  const txData = buildInventoryTransactions(productDocs, orderDocs);
  const txDocs = await InventoryTransaction.insertMany(txData);
  console.log(`  ${txDocs.length} inventory transactions created`);

  console.log('\nSeed complete. Summary:');
  console.log(`  Users (suppliers): ${supplierDocs.length}`);
  console.log(`  Users (buyers):    ${buyerDocs.length}`);
  console.log(`  Products:          ${productDocs.length}`);
  console.log(`  Orders:            ${orderDocs.length}`);
  console.log(`  Inv. transactions: ${txDocs.length}`);
  console.log('\nSample credentials (password same for all demo accounts):');
  console.log('  Supplier: marcus.campbell@gracefoods.jm / Supplier@123');
  console.log('  Buyer:    sandra.williams@sandrashop.jm / Buyer@123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
