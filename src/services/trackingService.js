// Order Tracking Service
import { fetchWithAuth } from './authService.js';

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');

export async function getOrderTracking(trackingNumber) {
  try {
    const response = await fetch(`${API_URL}/api/tracking/${trackingNumber}`);

    if (!response.ok) {
      throw new Error('Tracking information not found');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetails(orderId) {
  try {
    const response = await fetchWithAuth(`/api/orders/${orderId}`);

    if (!response.ok) {
      throw new Error('Order not found');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getOrderHistory() {
  try {
    const response = await fetchWithAuth('/api/orders');

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export function subscribeToOrderUpdates(trackingNumber, callback) {
  // Real-time tracking via WebSocket/Socket.io
  if (!window.io) {
    console.warn('Socket.io not loaded');
    return;
  }

  const socket = window.io();
  
  socket.on('connect', () => {
    socket.emit('track-order', trackingNumber);
  });

  socket.on(`tracking-update-${trackingNumber}`, (data) => {
    callback(data);
  });

  return socket;
}

export const TrackingStatuses = {
  PROCESSING: 'Processing',
  PACKED: 'Packed',
  DISPATCHED: 'Dispatched',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

export const StatusColors = {
  'Processing': 'bg-gray-500',
  'Packed': 'bg-blue-500',
  'Dispatched': 'bg-blue-600',
  'In Transit': 'bg-cyan-500',
  'Out for Delivery': 'bg-yellow-500',
  'Delivered': 'bg-green-500',
  'Cancelled': 'bg-red-500'
};
