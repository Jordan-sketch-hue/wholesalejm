import express from 'express';

const router = express.Router();

// Get tracking info
router.get('/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    
    // TODO: Get tracking info from database
    res.json({
      trackingNumber,
      status: 'in-transit',
      lastUpdate: new Date(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tracking info' });
  }
});

export default router;
