// Payment Processing Service
import { fetchWithAuth } from './authService.js';

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');

export async function processCardPayment(paymentDetails) {
  try {
    const response = await fetchWithAuth('/api/payments/process', {
      method: 'POST',
      body: JSON.stringify({
        type: 'card',
        amount: paymentDetails.amount,
        currency: 'JMD',
        cardToken: paymentDetails.token,
        ...paymentDetails
      })
    });

    if (!response.ok) {
      throw new Error('Payment processing failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function processBankTransfer(paymentDetails) {
  try {
    const response = await fetchWithAuth('/api/payments/bank-transfer', {
      method: 'POST',
      body: JSON.stringify({
        type: 'bank',
        amount: paymentDetails.amount,
        ...paymentDetails
      })
    });

    if (!response.ok) {
      throw new Error('Bank transfer initiation failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function processCashOnDelivery(orderId) {
  try {
    const response = await fetchWithAuth('/api/payments/cash-on-delivery', {
      method: 'POST',
      body: JSON.stringify({ orderId })
    });

    if (!response.ok) {
      throw new Error('COD setup failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function processJamaican Payment(paymentDetails) {
  // Support for Jamaica-specific payment gateways: NCB, Scotia, JN, Lynk, WiPay
  try {
    const response = await fetchWithAuth('/api/payments/jamaican', {
      method: 'POST',
      body: JSON.stringify({
        provider: paymentDetails.provider, // 'ncb' | 'scotia' | 'jn' | 'lynk' | 'wipay'
        amount: paymentDetails.amount,
        ...paymentDetails
      })
    });

    if (!response.ok) {
      throw new Error('Jamaican payment failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function verifyPayment(transactionId) {
  try {
    const response = await fetchWithAuth(`/api/payments/verify/${transactionId}`);

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function initiateRefund(orderId, amount) {
  try {
    const response = await fetchWithAuth('/api/payments/refund', {
      method: 'POST',
      body: JSON.stringify({ orderId, amount })
    });

    if (!response.ok) {
      throw new Error('Refund initiation failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getPaymentMethods() {
  try {
    const response = await fetchWithAuth('/api/payments/methods');

    if (!response.ok) {
      throw new Error('Failed to fetch payment methods');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
