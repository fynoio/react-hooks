<!-- # @fyno/react-hooks

[![NPM](https://img.shields.io/npm/v/@fyno/react-hooks.svg)](https://www.npmjs.com/package/@fyno/react-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Fyno: Fire your notifications](https://fynodev.s3.ap-south-1.amazonaws.com/others/Fyno_Banner.jpeg)

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

> **_NOTE:_** Ensure to provide valid and secure values for the distinctId, workspaceId, integrationId, and signature props. For signature generation you can refer [this](https://docs.fyno.io/recipes/hmac-generation-for-in-app). -->

# @fyno/react-hooks

[![NPM](https://img.shields.io/npm/v/@fyno/react-hooks.svg)](https://www.npmjs.com/package/@fyno/react-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Fyno: Fire your notifications](https://fynodev.s3.ap-south-1.amazonaws.com/others/Fyno_Banner.jpeg)

## Overview

The **@fyno/react-hooks** SDK provides tools to handle in-app notifications in your React app using custom UI. The core of this SDK is the `useInappManager` hook, which helps you retrieve notification data and manage actions like marking messages as read or deleting them.

### Installation

Make sure you're using **Node.js v8 or higher** and **npm v5 or higher**.

```bash
npm install @fyno/react-hooks
```

## Getting Started with `useInappManager`

The `useInappManager` hook provides all the data and handlers needed to work with in-app notifications.

### Prop Descriptions

1. **distinctId** (string) - Unique identifier for the user.
2. **workspaceId** (string) - ID for your workspace in Fyno.
3. **integrationId** (string) - ID for your integration.
4. **signature** (string) - Secure HMAC signature used to authenticate requests.

### Available Data

The `data` object provides you with everything you need to display and manage notifications:

- **unreadCount** (number): The number of unread notifications.
- **list** (Array): The full list of notifications.
- **unreadList** (Array): List of only the unread notifications.
- **count** (number): Total number of notifications.
- **errMsg** (string): Error message, if there’s an issue fetching data.

### Available Handlers

The `handlers` object includes a set of functions to help you manage notifications effectively:

- **handleIncomingMessage**: Processes an incoming message.
- **handleMarkAsRead**: Marks a specific notification as read.
- **handleDelete**: Deletes a specific notification.
- **loadMoreNotifications**: Loads more notifications (e.g., page-by-page).
- **deleteAllMessages**: Deletes all notifications.
- **handleMarkAllAsRead**: Marks all notifications as read.

> **Note**: Ensure you provide secure and valid values for `distinctId`, `workspaceId`, `integrationId`, and `signature`. For help generating a signature, check [this guide](https://docs.fyno.io/recipes/hmac-generation-for-in-app).

## Example Project

For a complete example of how to implement the `useInappManager` hook with a custom UI, refer to the example project included in this repository.
