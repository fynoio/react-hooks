import React from "react";
import useInappManager from "@fyno/react-hooks";
import "./styles.css";

const fynoProps = {
  distinctId: "user-distinct-id",
  workspaceId: "workspace-id",
  integrationId: "integration-id",
  signature: "your-signature",
};

const NotificationsComponent = () => {
  const { data, handlers } = useInappManager(fynoProps);

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <h2>Notifications</h2>
        <button
          onClick={handlers.handleMarkAllAsRead}
          className="mark-all-read-btn"
        >
          Mark All as Read
        </button>
        <span className="unread-count">{data.unreadCount} Unread</span>
      </header>

      <div className="notifications-list">
        {data.list.length > 0 ? (
          data.list.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
            >
              <p className="notification-message-title">
                {notification.notification_content.title}
              </p>
              <p className="notification-message">
                {notification.notification_content.body}
              </p>
              <div className="notification-actions">
                <button
                  onClick={() => handlers.handleMarkAsRead(notification)}
                  className="action-btn mark-read-btn"
                >
                  {notification.isRead ? "Read" : "Mark as Read"}
                </button>
                <button
                  onClick={() => handlers.handleDelete(notification)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications available</p>
        )}
      </div>

      {data.list.length > 0 && (
        <footer className="notifications-footer">
          <button
            onClick={handlers.loadMoreNotifications}
            className="load-more-btn"
          >
            Load More
          </button>
          <button
            onClick={handlers.deleteAllMessages}
            className="delete-all-btn"
          >
            Delete All
          </button>
        </footer>
      )}
    </div>
  );
};

export default NotificationsComponent;
