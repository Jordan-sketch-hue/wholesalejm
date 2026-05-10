// WhatsApp Integration Service
const WHATSAPP_API_URL = 'https://api.whatsapp.com';
const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');

export async function sendWhatsAppMessage(phoneNumber, message) {
  try {
    const response = await fetch(`${API_URL}/api/whatsapp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: phoneNumber,
        message
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }

    return await response.json();
  } catch (error) {
    console.error('WhatsApp error:', error);
    throw error;
  }
}

export function getWhatsAppLink(phoneNumber, message = '') {
  const baseUrl = 'https://wa.me/';
  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}${phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsAppChat(phoneNumber, message = '') {
  const link = getWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
}

export async function sendOrderUpdate(phoneNumber, orderNumber, status) {
  const message = `Your order #${orderNumber} status: ${status}`;
  return sendWhatsAppMessage(phoneNumber, message);
}

export async function sendDeliveryNotification(phoneNumber, driverName, eta) {
  const message = `Your delivery is on the way! Driver: ${driverName}. ETA: ${eta}`;
  return sendWhatsAppMessage(phoneNumber, message);
}

export async function sendPromotion(phoneNumber, promoCode, discount) {
  const message = `Exclusive offer! Use code ${promoCode} for ${discount}% off your next wholesale order at Wholesale Jamaica!`;
  return sendWhatsAppMessage(phoneNumber, message);
}
