# Notification System Documentation

## Overview

The Cargo Stream application now includes a comprehensive real-time notification system that keeps users informed about booking status changes, dispatcher assignments, and other important events.

## Features

### 🔔 Real-time Notifications
- **WebSocket Integration**: Instant notifications using Socket.IO
- **Browser Notifications**: Native browser notifications for immediate alerts
- **Toast Notifications**: In-app toast messages for user feedback
- **Notification Bell**: Visual indicator with unread count

### 📱 Notification Types

1. **Booking Created** (`booking_created`)
   - **Recipients**: Admin users
   - **Trigger**: When a customer creates a new booking
   - **Priority**: High
   - **Message**: "A new booking has been created by [customer]. Booking ID: [ID]"

2. **Booking Confirmed** (`booking_confirmed`)
   - **Recipients**: Customer
   - **Trigger**: When a booking is successfully created
   - **Priority**: Medium
   - **Message**: "Your booking has been successfully created. Booking ID: [ID]"

3. **Dispatcher Assigned** (`dispatcher_assigned`)
   - **Recipients**: Dispatcher and Customer
   - **Trigger**: When admin assigns a dispatcher to a booking
   - **Priority**: High (Dispatcher), Medium (Customer)
   - **Message**: 
     - Dispatcher: "You have been assigned to delivery booking [ID]. Pickup: [address]"
     - Customer: "A dispatcher has been assigned to your delivery. Booking ID: [ID]"

4. **Status Updated** (`status_updated`)
   - **Recipients**: Customer
   - **Trigger**: When booking status changes (Pending → Scheduled → In Transit → Delivered)
   - **Priority**: Medium
   - **Message**: "Your delivery status has been updated from [old] to [new]. Booking ID: [ID]"

5. **Delivery Completed** (`delivery_completed`)
   - **Recipients**: Admin users
   - **Trigger**: When booking status is set to "Delivered"
   - **Priority**: Medium
   - **Message**: "Delivery completed for booking [ID]"

## Technical Implementation

### Backend (Node.js/Express)

#### Dependencies
```json
{
  "socket.io": "^4.7.2"
}
```

#### Key Files
- `delivery-backend/models/Notification.js` - Notification data model
- `delivery-backend/controllers/notificationController.js` - Notification logic
- `delivery-backend/app.js` - WebSocket server setup
- `delivery-backend/routes/notificationRoutes.js` - API endpoints

#### API Endpoints
```
GET    /api/notifications           - Get user notifications
GET    /api/notifications/unread-count - Get unread count
PATCH  /api/notifications/:id/read  - Mark notification as read
PATCH  /api/notifications/mark-all-read - Mark all as read
DELETE /api/notifications/:id       - Delete notification
```

#### WebSocket Events
- `authenticate` - Client authenticates with user ID
- `newNotification` - Server sends new notification to client

### Frontend (React/TypeScript)

#### Dependencies
```json
{
  "socket.io-client": "^4.7.2"
}
```

#### Key Components
- `src/contexts/NotificationContext.tsx` - Notification state management
- `src/components/NotificationBell.tsx` - Notification dropdown
- `src/components/NotificationCenter.tsx` - Full notification page
- `src/components/NotificationPermission.tsx` - Permission request

#### Features
- **Real-time Updates**: Automatic notification updates via WebSocket
- **Permission Management**: Browser notification permission handling
- **Visual Indicators**: Unread count badges and priority colors
- **Responsive Design**: Works on desktop and mobile

## Usage

### For Users

1. **Enable Notifications**: Click "Enable" when prompted for browser notifications
2. **View Notifications**: Click the bell icon in the header
3. **Mark as Read**: Click individual notifications or "Mark all as read"
4. **Real-time Updates**: Notifications appear instantly when events occur

### For Developers

#### Creating Notifications
```javascript
// In any controller
const notificationController = require('../controllers/notificationController');

// Create a notification
await notificationController.createNotification(
  userId,
  'Notification Title',
  'Notification message',
  'notification_type',
  bookingId,
  'high'
);
```

#### Testing
```bash
# Install dependencies
npm install

# Start backend
cd delivery-backend && npm run dev

# Start frontend
npm run dev

# Run test script
node test-notifications.js
```

## Notification Flow

### 1. Booking Creation
```
Customer creates booking
    ↓
Backend saves booking
    ↓
notifyBookingCreated() called
    ↓
Notifications sent to:
- Admin: "New Booking Available"
- Customer: "Booking Confirmed"
    ↓
Real-time updates via WebSocket
    ↓
Frontend displays notifications
```

### 2. Dispatcher Assignment
```
Admin assigns dispatcher
    ↓
Backend updates booking
    ↓
notifyDispatcherAssigned() called
    ↓
Notifications sent to:
- Dispatcher: "New Delivery Assignment"
- Customer: "Dispatcher Assigned"
    ↓
Real-time updates via WebSocket
    ↓
Frontend displays notifications
```

### 3. Status Updates
```
Dispatcher updates status
    ↓
Backend updates booking
    ↓
notifyStatusUpdate() called
    ↓
Notifications sent to:
- Customer: "Status Updated"
- Admin: "Delivery Completed" (if delivered)
    ↓
Real-time updates via WebSocket
    ↓
Frontend displays notifications
```

## Configuration

### Environment Variables
```env
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cargo-stream

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### Notification Settings
- **Polling Interval**: 10 seconds (fallback)
- **WebSocket Reconnection**: Automatic
- **Browser Notifications**: Optional (user permission required)
- **Toast Duration**: 5 seconds
- **Max Notifications**: 20 per page

## Troubleshooting

### Common Issues

1. **Notifications not appearing**
   - Check WebSocket connection in browser console
   - Verify user authentication
   - Check notification permissions

2. **Real-time not working**
   - Ensure backend is running with WebSocket support
   - Check CORS settings
   - Verify socket.io client connection

3. **Browser notifications blocked**
   - User must manually enable in browser settings
   - Check site permissions in browser

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'socket.io-client:*');
```

## Future Enhancements

- [ ] Email notifications
- [ ] Push notifications for mobile
- [ ] Notification preferences per user
- [ ] Notification templates
- [ ] Bulk notification actions
- [ ] Notification analytics
- [ ] Custom notification sounds
- [ ] Notification scheduling
