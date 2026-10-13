import express from 'express';
import Order from '../../database/models/Order.js';

const router = express.Router();

// Get tracking info by tracking number or order number
router.get('/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    // Look up order by trackingNumber or orderNumber
    const order = await Order.findOne({
      $or: [
        { trackingNumber },
        { orderNumber: trackingNumber }
      ]
    }).populate('userId', 'firstName lastName email phone');

    if (!order) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    res.json({
      trackingNumber: order.trackingNumber || order.orderNumber,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      lastUpdate: order.updatedAt,
      estimatedDelivery: order.estimatedDelivery,
      actualDelivery: order.actualDelivery,
      deliveryAddress: order.deliveryAddress,
      items: order.items,
      total: order.total
    });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Failed to get tracking info' });
  }
});

export default router;
