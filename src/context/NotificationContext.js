import React, { createContext, useState, useContext } from "react";
import Notification from "../Provider/Notification";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={message} />
    </NotificationContext.Provider>
  );
};
