import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Notification.css'; // Ensure this file exists for styling

const Notification = ({ notifications, removeNotification }) => {
  return (
    <ToastContainer position="top-center" className="p-3">
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          bg={notification.type}
          onClose={() => removeNotification(notification.id)}
          autohide
          delay={10000} // Notifications stay for 15 seconds
        >
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Notification;
