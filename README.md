# @fyno/react-hooks

## useInappManager

The useInappManager hook is a powerful React custom hook designed to facilitate the integration and management of in-app notifications within your application. This documentation aims to guide through the installation, usage of this hook.

### Installation

#### This package requires node version >=8 and npm version >= 5

```bash
npm install @fyno/react-hooks
```

### Usage

```javascript
import useInappManager from '@fyno/react-hooks';

// Provide necessary props
const fynoProps = {
  distinctId: 'your-distinct-id',
  workspaceId: 'your-workspace-id',
  integrationId: 'your-integration-id',
  signature: 'your-signature',
};

const { data, handlers } = useInappManager(fynoProps);

// Access data properties
const { unreadCount, list, unreadList, count, errMsg } = data;

// Access handler functions
const {
  handleClick,
  handleIncomingMessage,
  handleMarkAsRead,
  handleDelete,
  loadMoreNotifications,
  deleteAllMessages,
  handleMarkAllAsRead,
} = handlers;
```

#### Props

- distinctId (string): Unique identifier for the user.
- workspaceId (string): Identifier for the workspace.
- integrationId (string): Identifier for the integration.
- signature (string): Signature for authentication.

#### Data Properties

- unreadCount (number): Number of unread notifications.
- list (Array<Notification>): List of all notifications.
- unreadList (Array<Notification>): List of unread notifications.
- count (number): Total number of notifications.
- errMsg (string): Error message, if any.

#### Handler Functions

- handleIncomingMessage(message: Notification): Handle incoming messages.
- handleMarkAsRead(msg: Notification): Mark a message as read.
- handleDelete(msg: Notification): Delete a message.
- loadMoreNotifications page: number, type: <string>("All" or "Unread"): Load more notifications.
- deleteAllMessages(): Delete all messages.
- handleMarkAllAsRead(): Mark all messages as read.

### Example

```javascript
// Your React component
const YourComponent = () => {
  const { data, handlers } = useInappManager(fynoProps);

  // Use data and handlers as needed
  // ...

  return (
    // Your component JSX
  );
};

```

> **_NOTE:_** Ensure to provide valid and secure values for the distinctId, workspaceId, integrationId, and signature props. For signature generation you can refer [this](https://docs.fyno.io/recipes/hmac-generation-for-in-app).
