const buildBookingEmailHtml = (booking) => {
    return `
    <h2>Booking Confirmation</h2>
    <p>Thank you for your booking. Here are your booking details:</p>
    <h3>Booking Information</h3>
    <ul>
      <li><strong>ID:</strong> ${booking._id}</li>
      <li><strong>Status:</strong> ${booking.status}</li>
      <li><strong>Transport:</strong> ${booking.modeOfTransport}</li>
      <li><strong>Fare:</strong> ${booking.fare?.toFixed(2) || 'N/A'} pkr</li>
      <li><strong>Distance:</strong> ${booking.distance?.toFixed(2) || 'N/A'} km</li>
      <li><strong>Weight:</strong> ${booking.weight || 'N/A'} kg</li>
      <li><strong>Created:</strong> ${booking.createdAt ? new Date(booking.createdAt).toLocaleString() : ''}</li>
      <li><strong>Scheduled From:</strong> ${booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : 'Not set'}</li>
      <li><strong>Scheduled To:</strong> ${booking.estimatedDelivery ? new Date(booking.estimatedDelivery).toLocaleDateString() : 'Not set'}</li>
    </ul>
    <h3>Addresses</h3>
    <ul>
      <li><strong>Pickup:</strong> ${booking.pickupAddress}</li>
      <li><strong>Delivery:</strong> ${booking.deliveryAddress}</li>
    </ul>
    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${booking.contactName}</li>
      <li><strong>Phone:</strong> ${booking.contactPhone}</li>
      <li><strong>Email:</strong> ${booking.contactEmail}</li>
    </ul>
    <p>If you have any questions, please reply to this email.</p>
  `;
};

module.exports = buildBookingEmailHtml;
