import express from 'express';

const router = express.Router();

// Receive WhatsApp messages
router.post('/webhook', async (req, res) => {
  try {
    const { message, from } = req.body;
    
    // TODO: Process WhatsApp messages
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: 'WhatsApp webhook failed' });
  }
});

// Send WhatsApp message
router.post('/send', async (req, res) => {
  try {
    const { to, message } = req.body;
    
    // TODO: Send WhatsApp message via API
    res.json({ message: 'WhatsApp message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
