# Fyno React Hooks

[![NPM](https://img.shields.io/npm/v/@fyno/react-hooks.svg)](https://www.npmjs.com/package/@fyno/react-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Fyno: Fire your notifications](https://fynodev.s3.ap-south-1.amazonaws.com/others/Fyno_Banner.jpeg)

## Overview

The **@fyno/react-hooks** SDK let's you manage in-app notifications in your React app using custom UI. The core of this SDK is the `useInappManager` hook, which helps you retrieve notification data and manage actions like marking messages as read or deleting them.

### Installation

Make sure you're using **Node.js v8 or higher** and **npm v5 or higher**.

Note: if you are using `@fyno/reach-hooks` package in ReactNative or Expo you need to install `react-native-device-info` plugin as well

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
